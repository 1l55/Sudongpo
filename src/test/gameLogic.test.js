/**
 * gameLogic.js 单元测试 — 苏东坡人生 RPG
 * 覆盖：applyEffects、calculateDelta、determineEnding、
 *        saveGame/loadGame/deleteSave/hasSave、calculateProgress
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  INITIAL_STATS,
  STAT_LABELS,
  applyEffects,
  calculateDelta,
  determineEnding,
  ENDINGS,
  saveGame,
  loadGame,
  deleteSave,
  hasSave,
  calculateProgress,
} from '../utils/gameLogic';

// ──────────────────────────────────────────────
// applyEffects
// ──────────────────────────────────────────────
describe('applyEffects', () => {
  it('正常属性变化应正确叠加', () => {
    const stats = { ...INITIAL_STATS };
    const result = applyEffects(stats, { talent: 10, career: -5 });
    expect(result.talent).toBe(60);
    expect(result.career).toBe(45);
    expect(result.charm).toBe(50);
    expect(result.spirit).toBe(50);
  });

  it('属性值不得低于0', () => {
    const result = applyEffects({ talent: 3, career: 50, charm: 50, spirit: 50 }, { talent: -100 });
    expect(result.talent).toBe(0);
  });

  it('属性值不得高于100', () => {
    const result = applyEffects({ talent: 95, career: 50, charm: 50, spirit: 50 }, { talent: 100 });
    expect(result.talent).toBe(100);
  });

  it('忽略不属于属性的无效键', () => {
    const stats = { ...INITIAL_STATS };
    const result = applyEffects(stats, { invalidKey: 999, talent: 5 });
    expect(result.talent).toBe(55);
    expect(result.invalidKey).toBeUndefined();
  });

  it('忽略非数字类型的效果值', () => {
    const stats = { ...INITIAL_STATS };
    const result = applyEffects(stats, { talent: 'hello', career: null });
    expect(result.talent).toBe(50);
    expect(result.career).toBe(50);
  });

  it('空效果对象不应改变任何属性', () => {
    const stats = { ...INITIAL_STATS };
    const result = applyEffects(stats, {});
    expect(result).toEqual(INITIAL_STATS);
  });

  it('不改变原始对象（不可变性）', () => {
    const stats = { ...INITIAL_STATS };
    const copy = { ...stats };
    applyEffects(stats, { talent: 10 });
    expect(stats).toEqual(copy);
  });
});

// ──────────────────────────────────────────────
// calculateDelta
// ──────────────────────────────────────────────
describe('calculateDelta', () => {
  it('正确计算属性差值', () => {
    const oldStats = { talent: 50, career: 50, charm: 50, spirit: 50 };
    const newStats = { talent: 55, career: 45, charm: 50, spirit: 60 };
    const delta = calculateDelta(oldStats, newStats);
    expect(delta).toEqual({ talent: 5, career: -5, charm: 0, spirit: 10 });
  });

  it('完全相同的属性应返回全0差值', () => {
    const stats = { ...INITIAL_STATS };
    const delta = calculateDelta(stats, stats);
    expect(delta).toEqual({ talent: 0, career: 0, charm: 0, spirit: 0 });
  });
});

// ──────────────────────────────────────────────
// determineEnding
// ──────────────────────────────────────────────
describe('determineEnding', () => {
  it('GREATEST_WRITER: 才华≥75且才华≥max(官运,心境)', () => {
    const stats = { talent: 80, career: 60, charm: 50, spirit: 60 };
    const ending = determineEnding(stats);
    expect(ending.id).toBe('GREATEST_WRITER');
  });

  it('RENOWNED_MINISTER: 官运≥75且官运≥max(才华,心境)', () => {
    const stats = { talent: 60, career: 80, charm: 50, spirit: 60 };
    const ending = determineEnding(stats);
    expect(ending.id).toBe('RENOWNED_MINISTER');
  });

  it('ENLIGHTENED_SCHOLAR: 心境≥75且心境≥max(才华,官运)', () => {
    const stats = { talent: 60, career: 60, charm: 50, spirit: 80 };
    const ending = determineEnding(stats);
    expect(ending.id).toBe('ENLIGHTENED_SCHOLAR');
  });

  it('ELEGANT_SCHOLAR: 人缘≥70且才华≥60', () => {
    const stats = { talent: 65, career: 50, charm: 75, spirit: 50 };
    const ending = determineEnding(stats);
    expect(ending.id).toBe('ELEGANT_SCHOLAR');
  });

  it('WANDERING_EXILE: 四项均值<50', () => {
    const stats = { talent: 30, career: 30, charm: 30, spirit: 30 };
    const ending = determineEnding(stats);
    expect(ending.id).toBe('WANDERING_EXILE');
  });

  it('BALANCED_LIFE: 默认结局', () => {
    // 中等属性，不满足其他任何条件
    const stats = { talent: 55, career: 55, charm: 55, spirit: 55 };
    const ending = determineEnding(stats);
    expect(ending.id).toBe('BALANCED_LIFE');
  });

  it('才华和官运都≥75但才华更高时应返回GREATEST_WRITER', () => {
    const stats = { talent: 85, career: 80, charm: 50, spirit: 60 };
    const ending = determineEnding(stats);
    expect(ending.id).toBe('GREATEST_WRITER');
  });

  it('官运和心境都≥75但官运更高时应返回RENOWNED_MINISTER', () => {
    const stats = { talent: 50, career: 85, charm: 50, spirit: 80 };
    const ending = determineEnding(stats);
    expect(ending.id).toBe('RENOWNED_MINISTER');
  });

  it('所有属性为0时应返回WANDERING_EXILE', () => {
    const stats = { talent: 0, career: 0, charm: 0, spirit: 0 };
    const ending = determineEnding(stats);
    expect(ending.id).toBe('WANDERING_EXILE');
  });

  it('所有属性为100时GREATEST_WRITER优先（才华==官运==心境==100, 按优先级取第一个）', () => {
    const stats = { talent: 100, career: 100, charm: 100, spirit: 100 };
    const ending = determineEnding(stats);
    // GREATEST_WRITER 排在优先级第一位，且 condition: talent>=75 && talent>=max(career,spirit)
    // talent=100 >= max(100,100) = true
    expect(ending.id).toBe('GREATEST_WRITER');
  });
});

// ──────────────────────────────────────────────
// 存档功能 (saveGame / loadGame / deleteSave / hasSave)
// ──────────────────────────────────────────────
describe('存档功能', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saveGame 应成功写入 localStorage', () => {
    const gameState = {
      scene: 'childhood_2',
      stats: { ...INITIAL_STATS },
      collectedPoems: ['poem1'],
      choiceHistory: [{ scene: 'childhood_1', choice: 0 }],
    };
    const result = saveGame(gameState);
    expect(result).toBe(true);
    const raw = localStorage.getItem('sudongpo_rpg_save');
    expect(raw).not.toBeNull();
  });

  it('loadGame 在无存档时应返回 null', () => {
    expect(loadGame()).toBeNull();
  });

  it('loadGame 应正确恢复存档数据', () => {
    const gameState = {
      scene: 'prime_1',
      stats: { talent: 55, career: 48, charm: 52, spirit: 45 },
      collectedPoems: ['poem1', 'poem2'],
      choiceHistory: [{ scene: 'childhood_1', choice: 0 }],
    };
    saveGame(gameState);
    const loaded = loadGame();
    expect(loaded.scene).toBe('prime_1');
    expect(loaded.stats).toEqual(gameState.stats);
    expect(loaded.collectedPoems).toEqual(gameState.collectedPoems);
    expect(loaded.choiceHistory).toEqual(gameState.choiceHistory);
  });

  it('loadGame 应处理缺失的 choiceHistory（兼容旧存档）', () => {
    const saveData = {
      scene: 'childhood_2',
      stats: { ...INITIAL_STATS },
      collectedPoems: [],
      // 没有 choiceHistory 字段
    };
    localStorage.setItem('sudongpo_rpg_save', JSON.stringify(saveData));
    const loaded = loadGame();
    expect(loaded.choiceHistory).toEqual([]);
  });

  it('deleteSave 应移除存档', () => {
    saveGame({ scene: 'test', stats: INITIAL_STATS, collectedPoems: [], choiceHistory: [] });
    expect(hasSave()).toBe(true);
    const result = deleteSave();
    expect(result).toBe(true);
    expect(hasSave()).toBe(false);
  });

  it('hasSave 无存档时应返回 false', () => {
    expect(hasSave()).toBe(false);
  });

  it('hasSave 有存档时应返回 true', () => {
    saveGame({ scene: 'test', stats: INITIAL_STATS, collectedPoems: [], choiceHistory: [] });
    expect(hasSave()).toBe(true);
  });

  it('loadGame 应处理损坏的存档数据', () => {
    localStorage.setItem('sudongpo_rpg_save', '{invalid json!!!}');
    const loaded = loadGame();
    expect(loaded).toBeNull();
  });
});

// ──────────────────────────────────────────────
// calculateProgress
// ──────────────────────────────────────────────
describe('calculateProgress', () => {
  it('childhood_1 应返回较低的进度', () => {
    const progress = calculateProgress('childhood_1');
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThan(20);
  });

  it('old_3 应返回较高的进度', () => {
    const progress = calculateProgress('old_3');
    expect(progress).toBeGreaterThan(80);
    expect(progress).toBeLessThanOrEqual(100);
  });

  it('未知的场景应返回100', () => {
    const progress = calculateProgress('unknown_scene');
    expect(progress).toBe(100);
  });

  it('场景应按顺序递增进度', () => {
    const p1 = calculateProgress('childhood_1');
    const p2 = calculateProgress('youth_1');
    const p3 = calculateProgress('prime_1');
    const p4 = calculateProgress('old_1');
    expect(p2).toBeGreaterThan(p1);
    expect(p3).toBeGreaterThan(p2);
    expect(p4).toBeGreaterThan(p3);
  });
});

// ──────────────────────────────────────────────
// 常量与映射
// ──────────────────────────────────────────────
describe('常量验证', () => {
  it('INITIAL_STATS 应包含4个属性且值均为50', () => {
    expect(Object.keys(INITIAL_STATS)).toHaveLength(4);
    expect(Object.values(INITIAL_STATS).every((v) => v === 50)).toBe(true);
  });

  it('STAT_LABELS 键应与 INITIAL_STATS 键一致', () => {
    expect(Object.keys(STAT_LABELS).sort()).toEqual(Object.keys(INITIAL_STATS).sort());
  });

  it('ENDINGS 应包含6种结局', () => {
    expect(Object.keys(ENDINGS)).toHaveLength(6);
  });

  it('每个结局都应有 id, title, description, condition', () => {
    for (const ending of Object.values(ENDINGS)) {
      expect(ending).toHaveProperty('id');
      expect(ending).toHaveProperty('title');
      expect(ending).toHaveProperty('description');
      expect(ending).toHaveProperty('condition');
      expect(typeof ending.condition).toBe('function');
    }
  });
});
