/**
 * 叙事文本面板 — 苏东坡人生 RPG
 * 带打字机效果的叙事文本展示，支持水墨背景
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

/** 打字机速度（毫秒/字） */
const TYPING_SPEED = 35;
/** 标点符号后暂停时间 */
const PUNCTUATION_PAUSE = 120;

export default function NarrativePanel({
  sceneData,
  onTypingComplete,
  narrativeComplete,
  transitionKey,
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullTextRef = useRef('');
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  const fullText = sceneData ? sceneData.narrative : '';

  // 当场景切换时重置
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    fullTextRef.current = fullText;
    indexRef.current = 0;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [transitionKey, fullText]);

  // 打字机效果
  useEffect(() => {
    if (!isTyping || !fullText) return;

    const typeNext = () => {
      if (indexRef.current >= fullTextRef.current.length) {
        setIsTyping(false);
        if (onTypingComplete) onTypingComplete();
        return;
      }

      const char = fullTextRef.current[indexRef.current];
      indexRef.current += 1;
      setDisplayedText(fullTextRef.current.substring(0, indexRef.current));

      // 标点符号后暂停
      const isPunctuation = '，。！？；：、—……「」『』（）'.includes(char);
      const pause = isPunctuation ? PUNCTUATION_PAUSE : TYPING_SPEED;

      timerRef.current = setTimeout(typeNext, pause);
    };

    timerRef.current = setTimeout(typeNext, TYPING_SPEED);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTyping, fullText, onTypingComplete]);

  // 点击跳过打字效果
  const handleClick = useCallback(() => {
    if (isTyping) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setDisplayedText(fullTextRef.current);
      indexRef.current = fullTextRef.current.length;
      setIsTyping(false);
      if (onTypingComplete) onTypingComplete();
    }
  }, [isTyping, onTypingComplete]);

  if (!sceneData) return null;

  // 将叙事文本按换行分段
  const paragraphs = displayedText.split('\n').filter((p) => p.trim() !== '');

  return (
    <div
      className="relative flex-1 paper-texture rounded-lg p-5 md:p-8 overflow-hidden cursor-pointer"
      onClick={handleClick}
      key={transitionKey}
    >
      {/* 水墨装饰 */}
      <div className="ink-blob" style={{ top: -30, right: -30, width: 150, height: 150 }} />
      <div className="ink-blob" style={{ bottom: -20, left: -20, width: 100, height: 100 }} />

      {/* 场景标题区 */}
      <div className="relative z-10 mb-4 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <span className="stage-badge">{sceneData.stage}</span>
          <span className="text-xs text-ink-light year-display">{sceneData.year}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-ink tracking-wider">
          {sceneData.title}
        </h2>
        <div className="ink-divider mt-3" />
      </div>

      {/* 叙事文本 */}
      <div className="relative z-10 narrative-scroll animate-fade-in">
        {paragraphs.map((para, idx) => (
          <p
            key={idx}
            className="text-base md:text-lg leading-loose text-ink/90 mb-3 indent-8"
          >
            {para}
          </p>
        ))}

        {/* 打字机光标 */}
        {isTyping && <span className="typing-cursor" />}
      </div>

      {/* 点击提示 */}
      {isTyping && (
        <div className="absolute bottom-3 right-4 text-xs text-ink-light/40 animate-pulse">
          点击跳过
        </div>
      )}
    </div>
  );
}
