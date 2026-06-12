/**
 * 诗词展示 — 苏东坡人生 RPG
 * 诗词触发时以竖排古风展示，含水墨渲染效果
 */

import React, { useState, useEffect } from 'react';

export default function PoemReveal({ poem, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // 入场动画
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setShowContent(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      if (onDismiss) onDismiss();
    }, 500);
  };

  if (!poem) return null;

  return (
    <div
      className={`poem-overlay transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleDismiss}
    >
      <div
        className={`poem-card transition-all duration-700 ${
          showContent
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-90'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 装饰角标 */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-vermillion/30" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-vermillion/30" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-vermillion/30" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-vermillion/30" />

        {/* 诗词类型标签 */}
        <div className="flex items-center justify-between mb-4">
          <span className="stage-badge">{poem.type}</span>
          <span className="text-xs text-ink-light">{poem.year}</span>
        </div>

        {/* 诗词标题 */}
        <h3
          className="text-xl md:text-2xl font-bold text-center mb-2 tracking-widest"
          style={{ color: '#2c2c2c' }}
        >
          《{poem.title}》
        </h3>
        <p className="text-sm text-ink-light text-center mb-6 tracking-wider">
          {poem.author}
        </p>

        {/* 诗词内容（竖排） */}
        <div className="flex justify-center mb-6">
          <div className="poem-vertical text-base md:text-lg leading-relaxed text-ink/90">
            {showContent &&
              poem.content.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {line && <br />}
                </React.Fragment>
              ))}
          </div>
        </div>

        {/* 创作背景 */}
        {showContent && (
          <div className="animate-fade-in">
            <div className="ink-divider" />
            <p className="text-sm text-ink-light leading-relaxed mt-3 italic">
              {poem.context}
            </p>
          </div>
        )}

        {/* 关闭提示 */}
        <div className="text-center mt-4">
          <button
            onClick={handleDismiss}
            className="text-sm text-vermillion/60 hover:text-vermillion transition-colors tracking-wider"
          >
            收入诗册 · 继续
          </button>
        </div>
      </div>
    </div>
  );
}
