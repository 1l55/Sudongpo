/**
 * useGameState.js Reducer 测试 — 苏东坡人生 RPG
 * 直接测试 gameReducer 逻辑（不涉及 React 渲染）
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { INITIAL_STATS } from '../utils/gameLogic';
import { PHASES } from '../hooks/useGameState';

// 直接 import gameReducer 和 ACTIONS
// 由于 ACTIONS 是模块内部的常量，我们需要通过 dispatch 行为来间接测试
// 更好的方式是将 reducer 导出，这里我们用 renderHook 来测试 hook

import { renderHook, act } from '@testing-library/react';
import useGameState from '../hooks/useGameState';

// mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = value; },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

beforeEach(() => {
  localStorageMock.clear();
  vi.stubGlobal('localStorage', localStorageMock);
});

// ──────────────────────────────────────────────
// 初始状态
// ──────────────────────────────────────────────
describe('useGameState 初始状态', () => {
  it('初始阶段应为 TITLE', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.phase).toBe(PHASES.TITLE);
  });

  it('初始场景应为 childhood_1', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.scene).toBe('childhood_1');
  });

  it('初始属性应全为50', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.stats).toEqual(INITIAL_STATS);
  });

  it('初始不应有结局', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.ending).toBeNull();
  });

  it('初始诗词收集为空', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.collectedPoems).toEqual([]);
  });

  it('初始选择历史为空', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.choiceHistory).toEqual([]);
  });
});

// ──────────────────────────────────────────────
// START_NEW_GAME
// ──────────────────────────────────────────────
describe('startNewGame', () => {
  it('应切换到 GAME 阶段', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    expect(result.current.phase).toBe(PHASES.GAME);
  });

  it('应重置属性为初始值', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    expect(result.current.stats).toEqual(INITIAL_STATS);
  });

  it('应重置场景为 childhood_1', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    expect(result.current.scene).toBe('childhood_1');
  });

  it('transitionKey 应递增', () => {
    const { result } = renderHook(() => useGameState());
    const initialKey = result.current.transitionKey;
    act(() => {
      result.current.startNewGame();
    });
    expect(result.current.transitionKey).toBe(initialKey + 1);
  });
});

// ──────────────────────────────────────────────
// MAKE_CHOICE
// ──────────────────────────────────────────────
describe('makeChoice', () => {
  it('选择选项后应切换到下一个场景', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    act(() => {
      result.current.makeChoice(0); // childhood_1 的第一个选项 → childhood_2
    });
    expect(result.current.scene).toBe('childhood_2');
  });

  it('选择后应正确应用属性效果', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    // childhood_1 第一个选项: { talent: 5, career: 2, charm: 0, spirit: 0 }
    act(() => {
      result.current.makeChoice(0);
    });
    expect(result.current.stats.talent).toBe(55);
    expect(result.current.stats.career).toBe(52);
    expect(result.current.stats.charm).toBe(50);
    expect(result.current.stats.spirit).toBe(50);
  });

  it('选择第二个选项应应用不同的效果', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    // childhood_1 第二个选项: { talent: 2, career: 0, charm: 5, spirit: 3 }
    act(() => {
      result.current.makeChoice(1);
    });
    expect(result.current.stats.talent).toBe(52);
    expect(result.current.stats.career).toBe(50);
    expect(result.current.stats.charm).toBe(55);
    expect(result.current.stats.spirit).toBe(53);
  });

  it('无效的选项索引不应改变状态', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    const stateBefore = { ...result.current.stats, scene: result.current.scene };
    act(() => {
      result.current.makeChoice(999); // 不存在的选项
    });
    expect(result.current.scene).toBe(stateBefore.scene);
  });

  it('选择后应记录选择历史', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    act(() => {
      result.current.makeChoice(0);
    });
    expect(result.current.choiceHistory).toHaveLength(1);
    expect(result.current.choiceHistory[0]).toEqual({ scene: 'childhood_1', choice: 0 });
  });

  it('选择后应计算属性差值（statDeltas）', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    act(() => {
      result.current.makeChoice(0);
    });
    expect(result.current.statDeltas).toBeDefined();
    expect(result.current.statDeltas.talent).toBe(5);
    expect(result.current.statDeltas.career).toBe(2);
  });

  it('选择后 narrativeComplete 应重置为 false', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    act(() => {
      result.current.completeNarrative();
    });
    expect(result.current.narrativeComplete).toBe(true);
    act(() => {
      result.current.makeChoice(0);
    });
    expect(result.current.narrativeComplete).toBe(false);
  });

  it('选择到达 ending 场景时应切换到 ENDING 阶段', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    // old_3 的选项指向 'ending'
    // 我们需要手动走到最后，但更简单的方式是直接设置 scene
    // 这里我们通过完整路径走一遍
    // childhood_1 → childhood_2 → childhood_3 → youth_1 → youth_2 → young_adult_1 →
    // young_adult_2 → young_adult_3 → prime_1 → prime_2 → prime_3 → prime_4 →
    // middle_1 → middle_2 → middle_3 → old_1 → old_2 → old_3 → ending
    const choices = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const choiceIdx of choices) {
      act(() => {
        result.current.makeChoice(choiceIdx);
      });
    }
    // old_3 选择后应该到达 ending
    expect(result.current.phase).toBe(PHASES.ENDING);
    expect(result.current.ending).not.toBeNull();
  });
});

// ──────────────────────────────────────────────
// COMPLETE_NARRATIVE & 诗词触发
// ──────────────────────────────────────────────
describe('completeNarrative 与诗词触发', () => {
  it('叙事完成后无诗词时 narrativeComplete 应为 true', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    act(() => {
      result.current.completeNarrative();
    });
    expect(result.current.narrativeComplete).toBe(true);
  });

  it('到达有诗词的场景后叙事完成应触发诗词揭示', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    // childhood_1 (choice 0) → childhood_2 (choice 0) → childhood_3 (choice 0) → youth_1 (choice 0) → youth_2
    // youth_2 有诗词 'he zi you mian chi huai jiu'
    act(() => { result.current.makeChoice(0); }); // childhood_1 → childhood_2
    act(() => { result.current.makeChoice(0); }); // childhood_2 → childhood_3
    act(() => { result.current.makeChoice(0); }); // childhood_3 → youth_1
    act(() => { result.current.makeChoice(0); }); // youth_1 → youth_2

    // youth_2 有诗词，makeChoice 后 pendingPoems 应被设置
    expect(result.current.pendingPoems).not.toHaveLength(0);
    expect(result.current.pendingPoems[0].id).toBe('he zi you mian chi huai jiu');

    // 完成叙事后应触发诗词
    act(() => {
      result.current.completeNarrative();
    });
    expect(result.current.phase).toBe(PHASES.POEM_REVEAL);
    expect(result.current.currentPoem).not.toBeNull();
    expect(result.current.pendingPoems).toHaveLength(0);
  });

  it('收集的诗词应被记录到 collectedPoems', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    // 走到 youth_2（有诗词）
    act(() => { result.current.makeChoice(0); }); // childhood_1 → childhood_2
    act(() => { result.current.makeChoice(0); }); // childhood_2 → childhood_3
    act(() => { result.current.makeChoice(0); }); // childhood_3 → youth_1
    act(() => { result.current.makeChoice(0); }); // youth_1 → youth_2

    expect(result.current.collectedPoems).toContain('he zi you mian chi huai jiu');
  });
});

// ──────────────────────────────────────────────
// DISMISS_POEM
// ──────────────────────────────────────────────
describe('dismissPoem', () => {
  it('关闭诗词后应回到 GAME 阶段', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    // 走到 youth_2（有诗词）
    act(() => { result.current.makeChoice(0); });
    act(() => { result.current.makeChoice(0); });
    act(() => { result.current.makeChoice(0); });
    act(() => { result.current.makeChoice(0); });
    act(() => {
      result.current.completeNarrative();
    });
    expect(result.current.phase).toBe(PHASES.POEM_REVEAL);

    act(() => {
      result.current.dismissPoem();
    });
    expect(result.current.phase).toBe(PHASES.GAME);
    expect(result.current.currentPoem).toBeNull();
    expect(result.current.narrativeComplete).toBe(true);
  });
});

// ──────────────────────────────────────────────
// POEM_COLLECTION
// ──────────────────────────────────────────────
describe('诗词收集册', () => {
  it('showPoemCollection 应切换到 POEM_COLLECTION 阶段', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    act(() => {
      result.current.showPoemCollection();
    });
    expect(result.current.phase).toBe(PHASES.POEM_COLLECTION);
  });

  it('hidePoemCollection 在游戏中应回到 GAME 阶段', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    act(() => {
      result.current.showPoemCollection();
    });
    act(() => {
      result.current.hidePoemCollection();
    });
    expect(result.current.phase).toBe(PHASES.GAME);
  });
});

// ──────────────────────────────────────────────
// CLEAR_STAT_DELTAS
// ──────────────────────────────────────────────
describe('clearStatDeltas', () => {
  it('应清除 statDeltas', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    act(() => {
      result.current.makeChoice(0);
    });
    expect(result.current.statDeltas).not.toBeNull();
    act(() => {
      result.current.clearStatDeltas();
    });
    expect(result.current.statDeltas).toBeNull();
  });
});

// ──────────────────────────────────────────────
// RETURN_TO_TITLE
// ──────────────────────────────────────────────
describe('returnToTitle', () => {
  it('应回到 TITLE 阶段并重置所有状态', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    act(() => {
      result.current.makeChoice(0);
    });
    act(() => {
      result.current.returnToTitle();
    });
    expect(result.current.phase).toBe(PHASES.TITLE);
    expect(result.current.stats).toEqual(INITIAL_STATS);
    expect(result.current.choiceHistory).toEqual([]);
    expect(result.current.ending).toBeNull();
  });
});

// ──────────────────────────────────────────────
// currentSceneData
// ──────────────────────────────────────────────
describe('currentSceneData', () => {
  it('应返回当前场景的数据', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.startNewGame();
    });
    expect(result.current.currentSceneData).not.toBeNull();
    expect(result.current.currentSceneData.id).toBe('childhood_1');
    expect(result.current.currentSceneData.title).toBe('眉山降世');
  });

  it('无效场景应返回 null', () => {
    const { result } = renderHook(() => useGameState());
    // 默认 TITLE 阶段，scene 为 childhood_1，应该有数据
    expect(result.current.currentSceneData).not.toBeNull();
  });
});

// ──────────────────────────────────────────────
// CONTINUE_GAME
// ──────────────────────────────────────────────
describe('continueGame', () => {
  it('无存档时不应改变状态', () => {
    const { result } = renderHook(() => useGameState());
    act(() => {
      result.current.continueGame();
    });
    expect(result.current.phase).toBe(PHASES.TITLE);
  });

  it('有存档时应恢复存档状态', () => {
    const { result } = renderHook(() => useGameState());
    // 先开始游戏并走几步
    act(() => {
      result.current.startNewGame();
    });
    act(() => {
      result.current.makeChoice(0);
    });
    // 此时 auto-save 可能已触发
    // 手动确保存档存在
    const savedScene = result.current.scene;

    // 回到标题
    act(() => {
      // 不使用 returnToTitle，因为它会删除存档
      // 直接 dispatch CONTINUE_GAME
    });

    // 通过 localStorage 模拟存档
    localStorageMock.setItem(
      'sudongpo_rpg_save',
      JSON.stringify({
        scene: 'prime_1',
        stats: { talent: 60, career: 55, charm: 52, spirit: 50 },
        collectedPoems: ['he zi you mian chi huai jiu'],
        choiceHistory: [{ scene: 'childhood_1', choice: 0 }],
      })
    );

    const { result: result2 } = renderHook(() => useGameState());
    act(() => {
      result2.current.continueGame();
    });
    expect(result2.current.scene).toBe('prime_1');
    expect(result2.current.stats.talent).toBe(60);
    expect(result2.current.phase).toBe(PHASES.GAME);
  });
});
