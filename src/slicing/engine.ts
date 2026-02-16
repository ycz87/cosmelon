/**
 * 切瓜逻辑引擎
 *
 * 计算切瓜产出（种子数量/品质、道具掉落、combo 奖励、保底机制）。
 */
import type { ItemId, SlicingResult, SeedQuality, PityCounter } from '../types/slicing';
import { COMMON_ITEMS, RARE_ITEMS } from '../types/slicing';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** 保底阈值 */
const EPIC_PITY_THRESHOLD = 30;
const LEGENDARY_PITY_THRESHOLD = 80;

/**
 * 根据保底计数器决定种子品质
 * - 连续 80 瓜没出 legendary → 必出 legendary
 * - 连续 30 瓜没出 epic → 必出 epic
 * - 否则随机：5% legendary, 15% epic, 80% normal
 */
function rollSeedQuality(pity: PityCounter): SeedQuality {
  if (pity.legendaryPity >= LEGENDARY_PITY_THRESHOLD) return 'legendary';
  if (pity.epicPity >= EPIC_PITY_THRESHOLD) return 'epic';

  const roll = Math.random();
  if (roll < 0.05) return 'legendary';
  if (roll < 0.20) return 'epic';
  return 'normal';
}

/**
 * 更新保底计数器
 */
export function updatePity(pity: PityCounter, quality: SeedQuality): PityCounter {
  return {
    epicPity: quality === 'epic' || quality === 'legendary' ? 0 : pity.epicPity + 1,
    legendaryPity: quality === 'legendary' ? 0 : pity.legendaryPity + 1,
  };
}

/**
 * 计算切瓜结果
 * @param melonType 西瓜类型
 * @param isPerfect 是否完美切割
 * @param comboCount 当前 combo 连击数（本次是第几刀，从 1 开始）
 * @param pity 保底计数器
 */
export function rollSlicingResult(
  melonType: 'ripe' | 'legendary',
  isPerfect: boolean,
  comboCount: number,
  pity: PityCounter,
): SlicingResult {
  // 基础种子数
  let seeds: number;
  if (melonType === 'legendary') {
    seeds = randomInt(3, 5);
  } else {
    seeds = randomInt(1, 3);
  }
  if (isPerfect) seeds += 1;

  // Combo 奖励
  let comboBonus = 0;
  if (comboCount >= 3) comboBonus += 1;  // 3连 +1
  // 5连的稀有种子奖励在 seedQuality 里处理

  seeds += comboBonus;

  // 种子品质
  let seedQuality: SeedQuality;
  if (comboCount >= 5) {
    // 5连必出 legendary 种子
    seedQuality = 'legendary';
  } else {
    seedQuality = rollSeedQuality(pity);
  }

  // 道具掉落
  const items: ItemId[] = [];
  if (melonType === 'legendary') {
    items.push(pickRandom(RARE_ITEMS));
  } else {
    if (Math.random() < 0.2) {
      items.push(pickRandom(COMMON_ITEMS));
    }
  }

  return { seeds, seedQuality, items, isPerfect, melonType, comboBonus };
}
