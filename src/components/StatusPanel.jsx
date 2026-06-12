/**
 * 属性状态面板 — 苏东坡人生 RPG
 * 显示才华、官运、人缘、心境四项属性，带动画反馈
 */

import React, { useEffect, useState } from 'react';
import { STAT_LABELS, STAT_COLORS, STAT_ICONS } from '../utils/gameLogic';

export default function StatusPanel({ stats, statDeltas, onDeltaClear }) {
  const [animatedStats, setAnimatedStats] = useState({ ...stats });
  const [showDeltas, setShowDeltas] = useState(false);

  useEffect(() => {
    setAnimatedStats({ ...stats });
    if (statDeltas) {
      setShowDeltas(true);
      const timer = setTimeout(() => {
        setShowDeltas(false);
        if (onDeltaClear) onDeltaClear();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [stats, statDeltas, onDeltaClear]);

  return (
    <div className="bg-paper-dark/50 backdrop-blur-sm rounded-lg p-4 border border-ink/5">
      {/* 面板标题 */}
      <div className="flex items-center gap-2 mb-3">
        <div className="seal !w-8 !h-8 !text-xs !border-vermillion/60 !text-vermillion/80">
          状态
        </div>
        <span className="text-sm text-ink-light tracking-wider">人生四境</span>
      </div>

      {/* 属性列表 */}
      <div className="space-y-3">
        {Object.entries(STAT_LABELS).map(([key, label]) => {
          const value = animatedStats[key] || 0;
          const color = STAT_COLORS[key];
          const delta = statDeltas?.[key] || 0;
          const icon = STAT_ICONS[key];

          return (
            <div key={key} className="relative">
              {/* 属性名称和数值 */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded"
                    style={{
                      backgroundColor: `${color}15`,
                      color: color,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {icon}
                  </span>
                  <span className="text-sm font-medium text-ink">{label}</span>
                </div>
                <span className="text-sm font-bold tabular-nums" style={{ color }}>
                  {value}
                </span>
              </div>

              {/* 属性条 */}
              <div className="stat-bar-track">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${value}%`,
                    backgroundColor: color,
                  }}
                />
              </div>

              {/* 变化数值浮动提示 */}
              {showDeltas && delta !== 0 && (
                <span
                  className={`stat-delta ${delta > 0 ? 'positive' : 'negative'}`}
                  style={{ right: 0, top: -8 }}
                >
                  {delta > 0 ? `+${delta}` : delta}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
