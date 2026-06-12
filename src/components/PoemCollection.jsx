/**
 * 诗词收集册 — 苏东坡人生 RPG
 * 以对话框形式展示已收集的诗词
 */

import React from 'react';
import poems from '../data/poems';

export default function PoemCollection({
  collectedPoems,
  onClose,
  visible,
}) {
  if (!visible) return null;

  const collectedPoemData = poems.filter((p) => collectedPoems.includes(p.id));
  const totalPoems = poems.length;

  return (
    <div
      className="fixed inset-0 bg-ink/80 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-paper rounded-lg border border-ink/10 w-[90vw] max-w-lg max-h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-ink-spread"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 标题栏 */}
        <div className="p-5 border-b border-ink/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="seal !w-9 !h-9 !text-[10px]">诗<br />册</div>
              <div>
                <h3 className="text-lg font-bold text-ink tracking-wider">诗词收集册</h3>
                <p className="text-xs text-ink-light">
                  已收集 {collectedPoemData.length} / {totalPoems} 首
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-ink-light hover:text-ink transition-colors text-xl px-2"
            >
              ✕
            </button>
          </div>

          {/* 进度条 */}
          <div className="mt-3 stat-bar-track">
            <div
              className="stat-bar-fill bg-vermillion"
              style={{ width: `${(collectedPoemData.length / totalPoems) * 100}%` }}
            />
          </div>
        </div>

        {/* 诗词列表 */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {collectedPoemData.length === 0 ? (
            <div className="text-center py-12 text-ink-light">
              <p className="text-lg mb-2">尚未收集任何诗词</p>
              <p className="text-sm">随着人生旅途的推进，你将在此收获佳作...</p>
            </div>
          ) : (
            collectedPoemData.map((poem) => (
              <PoemItem key={poem.id} poem={poem} />
            ))
          )}

          {/* 未收集的诗词（灰色占位） */}
          {poems
            .filter((p) => !collectedPoems.includes(p.id))
            .map((poem) => (
              <div
                key={poem.id}
                className="opacity-30 border-l border-ink/10 pl-4 ml-2 py-2"
              >
                <p className="text-sm text-ink-light">??? — {poem.type}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/** 单首诗词展示 */
function PoemItem({ poem }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div
      className="poem-collection-item cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between py-1">
        <div>
          <h4 className="text-base font-medium text-ink tracking-wider">
            《{poem.title}》
          </h4>
          <p className="text-xs text-ink-light mt-0.5">
            {poem.type} · {poem.year}
          </p>
        </div>
        <span className="text-xs text-ink-light/40">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="mt-2 animate-fade-in">
          <div className="poem-vertical text-sm leading-loose text-ink/80 mb-2">
            {poem.content.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {line && <br />}
              </React.Fragment>
            ))}
          </div>
          <p className="text-xs text-ink-light italic mt-2 border-t border-ink/5 pt-2">
            {poem.context}
          </p>
        </div>
      )}
    </div>
  );
}
