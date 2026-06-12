/**
 * 游戏逻辑 — 苏东坡人生 RPG
 * 包含属性计算、结局判定、存档读写等功能
 */

/** 属性初始值 */
export const INITIAL_STATS = {
  talent: 50,
  career: 50,
  charm: 50,
  spirit: 50,
};

/** 属性中文名映射 */
export const STAT_LABELS = {
  talent: '才华',
  career: '官运',
  charm: '人缘',
  spirit: '心境',
};

/** 属性对应颜色 */
export const STAT_COLORS = {
  talent: '#c4a35a',
  career: '#b22222',
  charm: '#6b8e23',
  spirit: '#7fb685',
};

/** 属性对应图标（Unicode） */
export const STAT_ICONS = {
  talent: '墨',
  career: '笏',
  charm: '朋',
  spirit: '禅',
};

/**
 * 应用属性变化效果
 * @param {object} currentStats - 当前属性值
 * @param {object} effects - 变化效果，如 { talent: 5, career: -3 }
 * @returns {object} 新的属性值（已钳制在0-100范围内）
 */
export function applyEffects(currentStats, effects) {
  const newStats = { ...currentStats };
  for (const [key, value] of Object.entries(effects)) {
    if (key in newStats && typeof value === 'number') {
      newStats[key] = Math.max(0, Math.min(100, newStats[key] + value));
    }
  }
  return newStats;
}

/**
 * 计算属性变化差值
 * @param {object} oldStats - 变化前属性
 * @param {object} newStats - 变化后属性
 * @returns {object} 差值，如 { talent: 5, career: -3 }
 */
export function calculateDelta(oldStats, newStats) {
  const delta = {};
  for (const key of Object.keys(INITIAL_STATS)) {
    delta[key] = newStats[key] - oldStats[key];
  }
  return delta;
}

/**
 * 结局类型定义
 */
export const ENDINGS = {
  GREATEST_WRITER: {
    id: 'GREATEST_WRITER',
    title: '千古文豪',
    description: '你的才华照亮了千年，后世之人读你的诗文，如饮甘露。官运浮沉算得了什么？你的文字，才是真正不朽的功名。',
    flavor: '大江东去，浪淘尽，千古风流人物——而你，便是那浪淘不尽的。',
    condition: (stats) => stats.talent >= 75 && stats.talent >= Math.max(stats.career, stats.spirit),
  },
  RENOWNED_MINISTER: {
    id: 'RENOWNED_MINISTER',
    title: '一代名臣',
    description: '虽历经贬谪，但你的政绩泽被苍生。苏堤长存，百姓铭记。朝堂上的风云或许会消散，但民心不会忘记。',
    flavor: '为官一任，造福一方。纵然朝堂风雨如晦，你始终是百姓心中最亮的那盏灯。',
    condition: (stats) => stats.career >= 75 && stats.career >= Math.max(stats.talent, stats.spirit),
  },
  ENLIGHTENED_SCHOLAR: {
    id: 'ENLIGHTENED_SCHOLAR',
    title: '旷达居士',
    description: '风雨平生，你已了悟。黄州的竹杖芒鞋、惠州的荔枝、儋州的海风——都是你修行的道场。此心安处，便是吾乡。',
    flavor: '回首向来萧瑟处，归去，也无风雨也无晴。',
    condition: (stats) => stats.spirit >= 75 && stats.spirit >= Math.max(stats.talent, stats.career),
  },
  ELEGANT_SCHOLAR: {
    id: 'ELEGANT_SCHOLAR',
    title: '风流雅士',
    description: '才华横溢，人缘广阔，你与天下英才交游，与山水为伴。你的一生虽非位极人臣，却活得洒脱自在，快意人生。',
    flavor: '人生到处知何似，应似飞鸿踏雪泥。飞过千山万水，留下一路诗篇。',
    condition: (stats) => stats.charm >= 70 && stats.talent >= 60,
  },
  WANDERING_EXILE: {
    id: 'WANDERING_EXILE',
    title: '颠沛流离',
    description: '命运多舛，一生漂泊。但即便在最困顿的时刻，你也不曾放下手中的笔。那些苦难，都化成了最深沉的文字。',
    flavor: '世事一场大梦，人生几度秋凉。纵然一生坎坷，你仍然是苏轼。',
    condition: (stats) => {
      const avg = (stats.talent + stats.career + stats.charm + stats.spirit) / 4;
      return avg < 50;
    },
  },
  BALANCED_LIFE: {
    id: 'BALANCED_LIFE',
    title: '东坡全人',
    description: '你的一生，才华、功名、人缘、心境，各有高低，却不偏废。正如你自己说的——人生如逆旅，我亦是行人。走过了，便好。',
    flavor: '一蓑烟雨任平生。你走过的每一步，都算数。',
    condition: () => true, // 默认结局
  },
};

/**
 * 根据最终属性判定结局
 * @param {object} stats - 最终属性值
 * @returns {object} 结局对象
 */
export function determineEnding(stats) {
  // 按优先级检查结局条件
  const endingOrder = [
    ENDINGS.GREATEST_WRITER,
    ENDINGS.RENOWNED_MINISTER,
    ENDINGS.ENLIGHTENED_SCHOLAR,
    ENDINGS.ELEGANT_SCHOLAR,
    ENDINGS.WANDERING_EXILE,
    ENDINGS.BALANCED_LIFE,
  ];

  for (const ending of endingOrder) {
    if (ending.condition(stats)) {
      return ending;
    }
  }

  return ENDINGS.BALANCED_LIFE;
}

/**
 * 保存游戏进度到 localStorage
 * @param {object} gameState - 游戏状态
 */
export function saveGame(gameState) {
  try {
    const saveData = {
      scene: gameState.scene,
      stats: gameState.stats,
      collectedPoems: gameState.collectedPoems,
      choiceHistory: gameState.choiceHistory,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('sudongpo_rpg_save', JSON.stringify(saveData));
    return true;
  } catch (e) {
    console.error('保存游戏失败:', e);
    return false;
  }
}

/**
 * 从 localStorage 读取游戏进度
 * @returns {object|null} 游戏状态，若无存档则返回 null
 */
export function loadGame() {
  try {
    const raw = localStorage.getItem('sudongpo_rpg_save');
    if (!raw) return null;
    const saveData = JSON.parse(raw);
    return {
      scene: saveData.scene,
      stats: saveData.stats,
      collectedPoems: saveData.collectedPoems,
      choiceHistory: saveData.choiceHistory || [],
    };
  } catch (e) {
    console.error('读取存档失败:', e);
    return null;
  }
}

/**
 * 删除存档
 */
export function deleteSave() {
  try {
    localStorage.removeItem('sudongpo_rpg_save');
    return true;
  } catch (e) {
    console.error('删除存档失败:', e);
    return false;
  }
}

/**
 * 检查是否有存档
 * @returns {boolean}
 */
export function hasSave() {
  return localStorage.getItem('sudongpo_rpg_save') !== null;
}

/**
 * 计算人生阶段完成度
 * @param {string} currentScene - 当前场景ID
 * @returns {number} 0-100 的完成百分比
 */
export function calculateProgress(currentScene) {
  const sceneOrder = [
    'childhood_1', 'childhood_2', 'childhood_3',
    'youth_1', 'youth_2',
    'young_adult_1', 'young_adult_2', 'young_adult_3',
    'prime_1', 'prime_2', 'prime_3', 'prime_4',
    'middle_1', 'middle_2', 'middle_3',
    'old_1', 'old_2', 'old_3',
  ];

  const index = sceneOrder.indexOf(currentScene);
  if (index === -1) return 100;
  return Math.round(((index + 1) / sceneOrder.length) * 100);
}
