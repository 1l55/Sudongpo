/**
 * 主游戏界面 — 苏东坡人生 RPG
 * 组合叙事面板、选择面板、属性面板等组件
 */

import React from 'react';
import NarrativePanel from './NarrativePanel';
import ChoicePanel from './ChoicePanel';
import StatusPanel from './StatusPanel';
import PoemReveal from './PoemReveal';
import PoemCollection from './PoemCollection';
import { calculateProgress } from '../utils/gameLogic';

export default function GameScreen({
  currentSceneData,
  stats,
  statDeltas,
  collectedPoems,
  narrativeComplete,
  transitionKey,
  currentPoem,
  phase,
  onChoose,
  onTypingComplete,
  onDismissPoem,
  onShowPoems,
  onHidePoems,
  onDeltaClear,
}) {
  if (!currentSceneData) return null;

  const progress = calculateProgress(currentSceneData.id);

  return (
    <div className="relative w-full h-full flex flex-col paper-texture overflow-hidden">
      {/* ===== 顶部信息栏 ===== */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-ink/5 bg-paper/80 backdrop-blur-sm z-20">
        <div className="flex items-center gap-3">
          <span className="stage-badge text-xs">{currentSceneData.stage}</span>
          <span className="text-sm text-ink year-display">{currentSceneData.year}</span>
        </div>

        {/* 人生进度 */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-light">人生旅途</span>
          <div className="w-24 stat-bar-track !h-1.5">
            <div
              className="stat-bar-fill !h-1.5"
              style={{
                width: `${progress}%`,
                backgroundColor: '#b22222',
              }}
            />
          </div>
          <span className="text-xs text-ink-light tabular-nums">{progress}%</span>
        </div>

        {/* 诗词收集册按钮 */}
        <button
          onClick={onShowPoems}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-vermillion/20 bg-vermillion/5 hover:bg-vermillion/10 transition-colors"
        >
          <span className="text-vermillion text-xs">诗册</span>
          <span className="text-vermillion text-xs font-bold">{collectedPoems.length}</span>
        </button>
      </header>

      {/* ===== 主体区域 ===== */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* 左侧属性面板（桌面端） */}
        <aside className="hidden md:flex md:flex-col md:w-56 lg:w-64 p-4 border-r border-ink/5 overflow-y-auto">
          <StatusPanel
            stats={stats}
            statDeltas={statDeltas}
            onDeltaClear={onDeltaClear}
          />
        </aside>

        {/* 中间叙事 + 选择区域 */}
        <main className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
          {/* 叙事面板 */}
          <NarrativePanel
            sceneData={currentSceneData}
            onTypingComplete={onTypingComplete}
            narrativeComplete={narrativeComplete}
            transitionKey={transitionKey}
          />

          {/* 移动端属性面板（折叠式） */}
          <div className="md:hidden">
            <MobileStatBar stats={stats} statDeltas={statDeltas} />
          </div>

          {/* 选择面板 */}
          <div className="flex-shrink-0">
            <ChoicePanel
              choices={currentSceneData.choices}
              onChoose={onChoose}
              narrativeComplete={narrativeComplete}
              transitionKey={transitionKey}
            />
          </div>
        </main>
      </div>

      {/* ===== 诗词触发弹出层 ===== */}
      {currentPoem && phase === 'poem_reveal' && (
        <PoemReveal poem={currentPoem} onDismiss={onDismissPoem} />
      )}

      {/* ===== 诗词收集册弹出层 ===== */}
      <PoemCollection
        collectedPoems={collectedPoems}
        onClose={onHidePoems}
        visible={phase === 'poem_collection'}
      />
    </div>
  );
}

/** 移动端精简属性栏 */
function MobileStatBar({ stats, statDeltas }) {
  const statConfig = [
    { key: 'talent', label: '才华', color: '#c4a35a' },
    { key: 'career', label: '官运', color: '#b22222' },
    { key: 'charm', label: '人缘', color: '#6b8e23' },
    { key: 'spirit', label: '心境', color: '#7fb685' },
  ];

  return (
    <div className="flex gap-2 bg-paper-dark/30 rounded-lg p-2 border border-ink/5">
      {statConfig.map(({ key, label, color }) => {
        const value = stats[key] || 0;
        const delta = statDeltas?.[key] || 0;
        return (
          <div key={key} className="flex-1 text-center relative">
            <div className="text-xs text-ink-light">{label}</div>
            <div className="text-sm font-bold" style={{ color }}>
              {value}
            </div>
            <div className="stat-bar-track !h-1 mt-0.5">
              <div
                className="stat-bar-fill !h-1"
                style={{ width: `${value}%`, backgroundColor: color }}
              />
            </div>
            {delta !== 0 && (
              <span
                className={`stat-delta text-xs ${delta > 0 ? 'positive' : 'negative'}`}
                style={{ left: '50%', transform: 'translateX(-50%)', top: -12 }}
              >
                {delta > 0 ? `+${delta}` : delta}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
