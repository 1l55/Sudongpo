/**
 * 选择面板 — 苏东坡人生 RPG
 * 展示当前场景的选择项，带古风美学效果
 */

import React, { useState } from 'react';

export default function ChoicePanel({
  choices,
  onChoose,
  narrativeComplete,
  transitionKey,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 重置选择状态
  React.useEffect(() => {
    setSelectedIndex(null);
  }, [transitionKey]);

  const handleChoose = (index) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(index);
    // 延迟执行，让动画播放
    setTimeout(() => {
      onChoose(index);
    }, 400);
  };

  if (!choices || choices.length === 0) return null;

  return (
    <div
      className="relative bg-paper-dark/30 backdrop-blur-sm rounded-lg p-4 md:p-5 border border-ink/5"
      key={transitionKey}
    >
      {/* 标题 */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-vermillion" />
        <span className="text-sm text-ink-light tracking-wider">此际抉择</span>
      </div>

      {/* 选项列表 */}
      <div className="space-y-3">
        {choices.map((choice, index) => {
          const isSelected = selectedIndex === index;
          const isOtherSelected = selectedIndex !== null && selectedIndex !== index;
          const effectEntries = Object.entries(choice.effects).filter(
            ([_, v]) => v !== 0
          );

          return (
            <div
              key={index}
              className={`
                transition-all duration-300
                ${narrativeComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                ${isSelected ? 'scale-[1.02]' : ''}
                ${isOtherSelected ? 'opacity-30 scale-95' : ''}
              `}
              style={{
                transitionDelay: narrativeComplete ? `${index * 100}ms` : '0ms',
              }}
            >
              <button
                onClick={() => handleChoose(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                disabled={selectedIndex !== null}
                className={`
                  choice-btn w-full
                  ${isSelected ? '!border-vermillion !bg-vermillion/10' : ''}
                  ${isOtherSelected ? 'pointer-events-none' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  {/* 序号标记 */}
                  <span
                    className={`
                      inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded
                      flex-shrink-0 mt-0.5
                      ${isSelected
                        ? 'bg-vermillion text-paper'
                        : 'bg-ink/5 text-ink-light'
                      }
                    `}
                  >
                    {['甲', '乙', '丙'][index]}
                  </span>

                  <div className="flex-1">
                    {/* 选择文本 */}
                    <span className="block leading-relaxed">{choice.text}</span>

                    {/* 属性变化预览（悬停时显示） */}
                    {(hoveredIndex === index || isSelected) && effectEntries.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2 animate-fade-in">
                        {effectEntries.map(([key, value]) => {
                          const labels = {
                            talent: '才华',
                            career: '官运',
                            charm: '人缘',
                            spirit: '心境',
                          };
                          return (
                            <span
                              key={key}
                              className={`text-xs px-2 py-0.5 rounded ${
                                value > 0
                                  ? 'bg-vermillion/10 text-vermillion'
                                  : 'bg-bamboo/10 text-bamboo-dark'
                              }`}
                            >
                              {labels[key]} {value > 0 ? `+${value}` : value}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* 等待提示 */}
      {!narrativeComplete && (
        <div className="text-center text-xs text-ink-light/40 mt-2 animate-pulse">
          请先阅读叙事内容...
        </div>
      )}
    </div>
  );
}
