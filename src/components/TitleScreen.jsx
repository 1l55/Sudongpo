/**
 * 标题画面 — 苏东坡人生 RPG
 * 开场水墨风格标题，含"开始游戏"和"继续游戏"按钮
 */

import React from 'react';

export default function TitleScreen({ onStartNewGame, onContinueGame, hasSavedGame }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center paper-texture overflow-hidden">
      {/* 水墨装饰背景 */}
      <div className="title-ink-bg" />

      {/* 装饰性水墨圆点 */}
      <div className="ink-blob" style={{ top: '15%', left: '10%', width: 180, height: 180 }} />
      <div className="ink-blob" style={{ bottom: '20%', right: '15%', width: 120, height: 120 }} />

      {/* 主内容 */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in-slow">
        {/* 印章 */}
        <div className="seal-large mb-6 animate-float">千古<br />风流</div>

        {/* 标题 */}
        <h1
          className="text-5xl md:text-7xl font-black tracking-widest mb-2"
          style={{ color: '#2c2c2c', textShadow: '2px 2px 8px rgba(44,44,44,0.1)' }}
        >
          苏东坡
        </h1>
        <h2
          className="text-2xl md:text-3xl font-light tracking-[0.3em] mb-4"
          style={{ color: '#5a5a5a' }}
        >
          人生 RPG
        </h2>

        {/* 分割线 */}
        <div className="ink-divider w-48 mb-8" />

        {/* 副标题 */}
        <p className="text-base md:text-lg text-ink-light mb-12 tracking-wider text-center px-4 leading-relaxed max-w-md">
          千古风流人物，一蓑烟雨平生<br />
          你将走过苏轼跌宕起伏的一生
        </p>

        {/* 按钮区域 */}
        <div className="flex flex-col gap-4 w-64">
          <button
            onClick={onStartNewGame}
            className="choice-btn text-center !bg-vermillion/5 !border-vermillion/40 !text-vermillion hover:!bg-vermouth/10 hover:!border-vermillion"
            style={{ fontSize: '1.1rem', letterSpacing: '0.15em' }}
          >
            开始新人生
          </button>

          {hasSavedGame && (
            <button
              onClick={onContinueGame}
              className="choice-btn text-center !bg-transparent !border-ink/20 !text-ink-light"
              style={{ letterSpacing: '0.1em' }}
            >
              继续上次
            </button>
          )}
        </div>

        {/* 底部署名 */}
        <div className="absolute bottom-8 text-ink-light/50 text-sm tracking-wider">
          以文字为墨 · 以选择为笔
        </div>
      </div>
    </div>
  );
}
