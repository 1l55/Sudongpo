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