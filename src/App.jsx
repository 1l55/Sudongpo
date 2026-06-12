/**
 * 主应用 — 苏东坡人生 RPG
 * 管理游戏阶段切换，组合各子画面
 */

import React from 'react';
import useGameState from './hooks/useGameState';
import { PHASES } from './hooks/useGameState';
import TitleScreen from './components/TitleScreen';
import GameScreen from './components/GameScreen';
import EndingScreen from './components/EndingScreen';
import PoemCollection from './components/PoemCollection';

export default function App() {
  const game = useGameState();

  return (
    <div className="w-screen h-screen overflow-hidden font-serif">
      {/* 标题画面 */}
      {game.phase === PHASES.TITLE && (
        <TitleScreen
          onStartNewGame={game.startNewGame}
          onContinueGame={game.continueGame}
          hasSavedGame={game.hasSavedGame}
        />
      )}

      {/* 主游戏画面 */}
      {(game.phase === PHASES.GAME ||
        game.phase === PHASES.POEM_REVEAL) && (
        <GameScreen
          currentSceneData={game.currentSceneData}
          stats={game.stats}
          statDeltas={game.statDeltas}
          collectedPoems={game.collectedPoems}
          narrativeComplete={game.narrativeComplete}
          transitionKey={game.transitionKey}
          currentPoem={game.currentPoem}
          phase={game.phase}
          onChoose={game.makeChoice}
          onTypingComplete={game.completeNarrative}
          onDismissPoem={game.dismissPoem}
          onShowPoems={game.showPoemCollection}
          onHidePoems={game.hidePoemCollection}
          onDeltaClear={game.clearStatDeltas}
        />
      )}

      {/* 结局画面 */}
      {game.phase === PHASES.ENDING && (
        <EndingScreen
          ending={game.ending}
          stats={game.stats}
          onReturnToTitle={game.returnToTitle}
          onShowPoems={game.showPoemCollection}
        />
      )}

      {/* 诗词收集册（全局弹出层） */}
      {game.phase === PHASES.POEM_COLLECTION && (
        <PoemCollection
          collectedPoems={game.collectedPoems}
          onClose={game.hidePoemCollection}
          visible={true}
        />
      )}
    </div>
  );
}
