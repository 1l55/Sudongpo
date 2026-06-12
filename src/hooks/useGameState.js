/**
 * 游戏状态管理 Hook — 苏东坡人生 RPG
 * 使用 useReducer 管理完整的游戏状态
 */

import { useReducer, useCallback, useEffect } from 'react';
import storyData from '../data/storyData';
import poems from '../data/poems';
import {
  INITIAL_STATS,
  applyEffects,
  determineEnding,
  saveGame,
  loadGame,
  deleteSave,
  hasSave,
} from '../utils/gameLogic';

/** 游戏阶段 */
export const PHASES = {
  TITLE: 'title',
  GAME: 'game',
  POEM_REVEAL: 'poem_reveal',
  POEM_COLLECTION: 'poem_collection',
  ENDING: 'ending',
};

/** 初始游戏状态 */
const initialState = {
  phase: PHASES.TITLE,
  scene: 'childhood_1',
  stats: { ...INITIAL_STATS },
  collectedPoems: [],
  choiceHistory: [],
  ending: null,
  currentPoem: null,
  pendingPoems: [],
  statDeltas: null,
  narrativeComplete: false,
  transitionKey: 0,
};

/** Action 类型 */
const ACTIONS = {
  START_NEW_GAME: 'START_NEW_GAME',
  CONTINUE_GAME: 'CONTINUE_GAME',
  MAKE_CHOICE: 'MAKE_CHOICE',
  COMPLETE_NARRATIVE: 'COMPLETE_NARRATIVE',
  DISMISS_POEM: 'DISMISS_POEM',
  SHOW_POEM_COLLECTION: 'SHOW_POEM_COLLECTION',
  HIDE_POEM_COLLECTION: 'HIDE_POEM_COLLECTION',
  RETURN_TO_TITLE: 'RETURN_TO_TITLE',
  CLEAR_STAT_DELTAS: 'CLEAR_STAT_DELTAS',
};

/**
 * 游戏状态 Reducer
 */
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START_NEW_GAME: {
      return {
        ...initialState,
        phase: PHASES.GAME,
        transitionKey: state.transitionKey + 1,
      };
    }

    case ACTIONS.CONTINUE_GAME: {
      const savedState = loadGame();
      if (savedState) {
        return {
          ...state,
          ...savedState,
          phase: PHASES.GAME,
          narrativeComplete: false,
          currentPoem: null,
          pendingPoems: [],
          statDeltas: null,
          transitionKey: state.transitionKey + 1,
        };
      }
      return state;
    }

    case ACTIONS.MAKE_CHOICE: {
      const { choiceIndex } = action.payload;
      const currentScene = storyData[state.scene];
      if (!currentScene || !currentScene.choices[choiceIndex]) return state;

      const choice = currentScene.choices[choiceIndex];
      const oldStats = { ...state.stats };
      const newStats = applyEffects(state.stats, choice.effects);
      const deltas = {};
      for (const key of Object.keys(INITIAL_STATS)) {
        deltas[key] = newStats[key] - oldStats[key];
      }

      const newCollectedPoems = [...state.collectedPoems];
      const nextScene = choice.nextScene;

      // 到达结局
      if (nextScene === 'ending') {
        const ending = determineEnding(newStats);
        return {
          ...state,
          stats: newStats,
          ending,
          choiceHistory: [...state.choiceHistory, { scene: state.scene, choice: choiceIndex }],
          statDeltas: deltas,
          phase: PHASES.ENDING,
          transitionKey: state.transitionKey + 1,
        };
      }

      // 检查下一个场景是否有诗词触发
      const nextSceneData = storyData[nextScene];
      let pendingPoems = [];

      if (nextSceneData && nextSceneData.poem) {
        const poemIds = Array.isArray(nextSceneData.poem) ? nextSceneData.poem : [nextSceneData.poem];
        poemIds.forEach(poemId => {
          const poemData = poems.find((p) => p.id === poemId);
          if (poemData && !newCollectedPoems.includes(poemId)) {
            newCollectedPoems.push(poemId);
            pendingPoems.push(poemData);
          }
        });
      }

      return {
        ...state,
        scene: nextScene,
        stats: newStats,
        collectedPoems: newCollectedPoems,
        choiceHistory: [...state.choiceHistory, { scene: state.scene, choice: choiceIndex }],
        currentPoem: null,
        pendingPoems,
        statDeltas: deltas,
        narrativeComplete: false,
        phase: PHASES.GAME,
        transitionKey: state.transitionKey + 1,
      };
    }

    case ACTIONS.COMPLETE_NARRATIVE: {
      // 叙事完成后，检查是否有待显示的诗词
      if (state.pendingPoems.length > 0) {
        const nextPoem = state.pendingPoems[0];
        const remaining = state.pendingPoems.slice(1);
        return {
          ...state,
          narrativeComplete: true,
          currentPoem: nextPoem,
          pendingPoems: remaining,
          phase: PHASES.POEM_REVEAL,
        };
      }
      return {
        ...state,
        narrativeComplete: true,
      };
    }

    case ACTIONS.DISMISS_POEM: {
      // 关闭当前诗词后，检查队列中是否还有待显示的诗词
      if (state.pendingPoems.length > 0) {
        const nextPoem = state.pendingPoems[0];
        const remaining = state.pendingPoems.slice(1);
        return {
          ...state,
          currentPoem: nextPoem,
          pendingPoems: remaining,
          phase: PHASES.POEM_REVEAL,
        };
      }
      return {
        ...state,
        currentPoem: null,
        phase: PHASES.GAME,
        // 诗词关闭后，叙事已完成，可直接显示选项
        narrativeComplete: true,
      };
    }

    case ACTIONS.SHOW_POEM_COLLECTION: {
      return {
        ...state,
        phase: PHASES.POEM_COLLECTION,
      };
    }

    case ACTIONS.HIDE_POEM_COLLECTION: {
      return {
        ...state,
        phase: state.ending ? PHASES.ENDING : PHASES.GAME,
      };
    }

    case ACTIONS.RETURN_TO_TITLE: {
      deleteSave();
      return {
        ...initialState,
        transitionKey: state.transitionKey + 1,
      };
    }

    case ACTIONS.CLEAR_STAT_DELTAS: {
      return {
        ...state,
        statDeltas: null,
      };
    }

    default:
      return state;
  }
}

/**
 * 游戏状态管理 Hook
 */
export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // 自动存档
  useEffect(() => {
    if (state.phase === PHASES.GAME && state.scene !== 'childhood_1') {
      saveGame(state);
    }
  }, [state.scene, state.phase]);

  // 便捷方法
  const startNewGame = useCallback(() => {
    dispatch({ type: ACTIONS.START_NEW_GAME });
  }, []);

  const continueGame = useCallback(() => {
    dispatch({ type: ACTIONS.CONTINUE_GAME });
  }, []);

  const makeChoice = useCallback((choiceIndex) => {
    dispatch({
      type: ACTIONS.MAKE_CHOICE,
      payload: { choiceIndex },
    });
  }, []);

  const completeNarrative = useCallback(() => {
    dispatch({ type: ACTIONS.COMPLETE_NARRATIVE });
  }, []);

  const dismissPoem = useCallback(() => {
    dispatch({ type: ACTIONS.DISMISS_POEM });
  }, []);

  const showPoemCollection = useCallback(() => {
    dispatch({ type: ACTIONS.SHOW_POEM_COLLECTION });
  }, []);

  const hidePoemCollection = useCallback(() => {
    dispatch({ type: ACTIONS.HIDE_POEM_COLLECTION });
  }, []);

  const returnToTitle = useCallback(() => {
    dispatch({ type: ACTIONS.RETURN_TO_TITLE });
  }, []);

  const clearStatDeltas = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_STAT_DELTAS });
  }, []);

  // 获取当前场景数据
  const currentSceneData = state.scene && storyData[state.scene]
    ? storyData[state.scene]
    : null;

  // 是否有存档
  const hasSavedGame = hasSave();

  return {
    // 状态
    ...state,
    currentSceneData,
    hasSavedGame,

    // 方法
    startNewGame,
    continueGame,
    makeChoice,
    completeNarrative,
    dismissPoem,
    showPoemCollection,
    hidePoemCollection,
    returnToTitle,
    clearStatDeltas,
  };
}

export default useGameState;
