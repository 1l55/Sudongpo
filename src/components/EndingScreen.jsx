/**
 * 结局画面 — 苏东坡人生 RPG
 * 根据最终属性展示不同结局评价
 */

import React, { useState, useEffect } from 'react';
import { STAT_LABELS, STAT_COLORS } from '../utils/gameLogic';

export default function EndingScreen({ ending, stats, onReturnToTitle, onShowPoems }) {
  const [showStats, setShowStats] = useState(false);
  const [showFlavor, setShowFlavor] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowStats(true), 1200);
    const t2 = setTimeout(() => setShowFlavor(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!ending) return null;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center paper-texture overflow-hidden">
      {/* 水墨装饰 */}
      <div className="title-ink-bg" />
      <div className="ink-blob" style={{ top: '10%', left: '5%', width: 200, height: 200 }} />
      <div className="ink-blob" style={{ bottom: '10%', right: '10%', width: 160, height: 160 }} />

      <div className="relative z-10 max-w-lg w-full px-6 animate-fade-in-slow">
        {/* 人生总结 */}
        <div className="text-center mb-6">
          <div className="seal-large mx-auto mb-6 animate-float">
            一生
          </div>
          <p className="text-sm text-ink-light tracking-wider mb-2">人生如逆旅</p>
          <p className="text-sm text-ink-light tracking-wider">我亦是行人</p>
        </div>

        {/* 结局标题 */}
        <div className="text-center mb-8">
          <h1 className="ending-title mb-3">{ending.title}</h1>
          <div className="ink-divider w-32 mx-auto" />
        </div>

        {/* 结局描述 */}
        <p className="text-base md:text-lg leading-loose text-ink/90 text-center mb-8 animate-fade-in">
          {ending.description}
        </p>

        {/* 最终属性 */}
        <div
          className={`transition-all duration-700 ${
            showStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-paper-dark/50 rounded-lg p-4 border border-ink/5 mb-6">
            <div className="text-center text-sm text-ink-light mb-3 tracking-wider">
              — 终局四境 —
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(STAT_LABELS).map(([key, label]) => {
                const value = stats[key] || 0;
                const color = STAT_COLORS[key];
                return (
                  <div key={key} className="text-center">
                    <div className="text-xs text-ink-light mb-1">{label}</div>
                    <div className="text-2xl font-bold" style={{ color }}>
                      {value}
                    </div>
                    <div className="stat-bar-track mt-1">
                      <div
                        className="stat-bar-fill"
                        style={{ width: `${value}%`, backgroundColor: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 风味文字 */}
        <div
          className={`transition-all duration-700 ${
            showFlavor ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="text-center mb-8">
            <div className="ink-divider w-16 mx-auto mb-4" />
            <p className="text-base text-ink/70 italic tracking-wider leading-relaxed">
              「{ending.flavor}」
            </p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
          <button
            onClick={onReturnToTitle}
            className="choice-btn text-center !bg-vermillion/5 !border-vermillion/40 !text-vermillion"
          >
            再续一生
          </button>
          <button
            onClick={onShowPoems}
            className="choice-btn text-center !bg-transparent !border-ink/20 !text-ink-light"
          >
            翻阅诗册
          </button>
        </div>
      </div>
    </div>
  );
}
