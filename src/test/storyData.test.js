/**
 * storyData.js 数据完整性测试 — 苏东坡人生 RPG
 * 检查：死胡同节点、选项指向有效性、必填字段、诗词引用有效性
 */

import { describe, it, expect } from 'vitest';
import storyData from '../data/storyData';
import poems from '../data/poems';

// ──────────────────────────────────────────────
// 场景基本结构验证
// ──────────────────────────────────────────────
describe('storyData 场景基本结构', () => {
  const sceneIds = Object.keys(storyData);

  it('应至少有10个场景', () => {
    expect(sceneIds.length).toBeGreaterThanOrEqual(10);
  });

  it('每个场景应有 id, stage, title, narrative, choices', () => {
    for (const [id, scene] of Object.entries(storyData)) {
      expect(scene).toHaveProperty('id', id);
      expect(scene).toHaveProperty('stage');
      expect(scene).toHaveProperty('title');
      expect(scene).toHaveProperty('narrative');
      expect(scene).toHaveProperty('choices');
    }
  });

  it('每个场景的 narrative 不应为空字符串', () => {
    for (const [id, scene] of Object.entries(storyData)) {
      expect(scene.narrative.length, `场景 ${id} 的 narrative 为空`).toBeGreaterThan(0);
    }
  });

  it('每个场景应至少有1个选项', () => {
    for (const [id, scene] of Object.entries(storyData)) {
      expect(scene.choices.length, `场景 ${id} 没有选项`).toBeGreaterThanOrEqual(1);
    }
  });

  it('场景的 id 应与对象的 key 一致', () => {
    for (const [key, scene] of Object.entries(storyData)) {
      expect(scene.id).toBe(key);
    }
  });
});

// ──────────────────────────────────────────────
// 选项 nextScene 指向有效性（关键：无死胡同节点）
// ──────────────────────────────────────────────
describe('选项 nextScene 指向有效性', () => {
  const sceneIds = new Set(Object.keys(storyData));

  it('每个选项的 nextScene 应指向有效场景或 "ending"', () => {
    const errors = [];
    for (const [sceneId, scene] of Object.entries(storyData)) {
      for (let i = 0; i < scene.choices.length; i++) {
        const choice = scene.choices[i];
        if (choice.nextScene !== 'ending' && !sceneIds.has(choice.nextScene)) {
          errors.push(
            `场景 "${sceneId}" 的选项 ${i} 指向不存在的 nextScene: "${choice.nextScene}"`
          );
        }
      }
    }
    expect(errors, `发现无效 nextScene:\n${errors.join('\n')}`).toHaveLength(0);
  });

  it('所有非起点场景应至少被一个选项引用（无孤岛场景）', () => {
    const referencedScenes = new Set();
    for (const scene of Object.values(storyData)) {
      for (const choice of scene.choices) {
        if (choice.nextScene !== 'ending') {
          referencedScenes.add(choice.nextScene);
        }
      }
    }
    const sceneIds = Object.keys(storyData);
    const firstScene = 'childhood_1'; // 起始场景不需要被引用
    const orphanScenes = sceneIds.filter(
      (id) => id !== firstScene && !referencedScenes.has(id)
    );
    expect(
      orphanScenes,
      `以下场景无法到达（孤岛）: ${orphanScenes.join(', ')}`
    ).toHaveLength(0);
  });

  it('至少有一个选项指向 "ending"（确保游戏可以结束）', () => {
    const hasEnding = Object.values(storyData).some((scene) =>
      scene.choices.some((c) => c.nextScene === 'ending')
    );
    expect(hasEnding, '没有任何场景指向 "ending"，游戏无法正常结束').toBe(true);
  });
});

// ──────────────────────────────────────────────
// 选项 effects 完整性
// ──────────────────────────────────────────────
describe('选项 effects 完整性', () => {
  it('每个选项应有 effects 对象', () => {
    for (const [sceneId, scene] of Object.entries(storyData)) {
      for (let i = 0; i < scene.choices.length; i++) {
        expect(
          scene.choices[i].effects,
          `场景 "${sceneId}" 选项 ${i} 缺少 effects`
        ).toBeDefined();
      }
    }
  });

  it('effects 应包含有效的属性键', () => {
    const validKeys = new Set(['talent', 'career', 'charm', 'spirit']);
    for (const [sceneId, scene] of Object.entries(storyData)) {
      for (let i = 0; i < scene.choices.length; i++) {
        const effects = scene.choices[i].effects;
        for (const key of Object.keys(effects)) {
          expect(
            validKeys.has(key),
            `场景 "${sceneId}" 选项 ${i} 的 effects 包含无效键: "${key}"`
          ).toBe(true);
        }
      }
    }
  });

  it('effects 的值应为数字', () => {
    for (const [sceneId, scene] of Object.entries(storyData)) {
      for (let i = 0; i < scene.choices.length; i++) {
        const effects = scene.choices[i].effects;
        for (const [key, value] of Object.entries(effects)) {
          expect(
            typeof value,
            `场景 "${sceneId}" 选项 ${i} 的 effects.${key} 不是数字: ${value}`
          ).toBe('number');
        }
      }
    }
  });

  it('每个选项应有 text 和 flavor', () => {
    for (const [sceneId, scene] of Object.entries(storyData)) {
      for (let i = 0; i < scene.choices.length; i++) {
        const choice = scene.choices[i];
        expect(choice.text, `场景 "${sceneId}" 选项 ${i} 缺少 text`).toBeDefined();
        expect(choice.flavor, `场景 "${sceneId}" 选项 ${i} 缺少 flavor`).toBeDefined();
      }
    }
  });
});

// ──────────────────────────────────────────────
// 诗词引用有效性
// ──────────────────────────────────────────────
describe('诗词引用有效性', () => {
  const poemIds = new Set(poems.map((p) => p.id));

  it('场景中引用的诗词 ID 应在 poems 数据中存在', () => {
    const errors = [];
    for (const [sceneId, scene] of Object.entries(storyData)) {
      if (scene.poem && scene.poem.length > 0) {
        for (const pid of scene.poem) {
          if (!poemIds.has(pid)) {
            errors.push(
              `场景 "${sceneId}" 引用了不存在的诗词 ID: "${pid}"`
            );
          }
        }
      }
    }
    expect(errors, `发现无效诗词引用:\n${errors.join('\n')}`).toHaveLength(0);
  });

  it('poems 数据中每首诗词的 triggerScene 应对应一个存在场景的 poem 字段', () => {
    const errors = [];
    for (const poem of poems) {
      const scene = storyData[poem.triggerScene];
      if (!scene) {
        errors.push(`诗词 "${poem.id}" 的 triggerScene "${poem.triggerScene}" 不存在`);
        continue;
      }
      if (!scene.poem || !scene.poem.includes(poem.id)) {
        errors.push(
          `诗词 "${poem.id}" 的 triggerScene "${poem.triggerScene}" 场景的 poem 字段不包含 "${poem.id}"`
        );
      }
    }
    expect(errors, `诗词-场景映射不一致:\n${errors.join('\n')}`).toHaveLength(0);
  });

  it('每首诗词应有 title, author, content, triggerScene', () => {
    for (const poem of poems) {
      expect(poem).toHaveProperty('id');
      expect(poem).toHaveProperty('title');
      expect(poem).toHaveProperty('author');
      expect(poem).toHaveProperty('content');
      expect(poem).toHaveProperty('triggerScene');
    }
  });

  it('诗词内容不为空', () => {
    for (const poem of poems) {
      expect(poem.content.length, `诗词 "${poem.id}" 内容为空`).toBeGreaterThan(0);
    }
  });

  it('不应有重复的诗词 ID', () => {
    const ids = poems.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size, '存在重复的诗词 ID').toBe(ids.length);
  });
});

// ──────────────────────────────────────────────
// 人生阶段覆盖
// ──────────────────────────────────────────────
describe('人生阶段覆盖', () => {
  it('应覆盖6个人生阶段', () => {
    const stages = new Set(Object.values(storyData).map((s) => s.stage));
    const expectedStages = ['幼年', '少年', '青年', '壮年', '中年', '晚年'];
    for (const stage of expectedStages) {
      expect(stages.has(stage), `缺少人生阶段: "${stage}"`).toBe(true);
    }
  });

  it('stageIndex 应与阶段对应且连续', () => {
    const stageMap = {};
    for (const scene of Object.values(storyData)) {
      if (!stageMap[scene.stage]) {
        stageMap[scene.stage] = scene.stageIndex;
      } else {
        expect(
          stageMap[scene.stage],
          `阶段 "${scene.stage}" 的 stageIndex 不一致`
        ).toBe(scene.stageIndex);
      }
    }
    const indices = Object.values(stageMap).sort((a, b) => a - b);
    for (let i = 0; i < indices.length; i++) {
      expect(indices[i], `stageIndex 不连续，期望 ${i}，得到 ${indices[i]}`).toBe(i);
    }
  });
});
