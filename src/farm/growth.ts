/**
 * 农场生长引擎
 *
 * 计算每日生长进度、枯萎检测、品种随机。
 */
import type { Plot, VarietyId, GrowthStage } from '../types/farm';
import type { SeedQuality } from '../types/slicing';
import {
  BLUE_STAR_VARIETIES, VARIETY_DEFS, GROWTH_STAGES,
} from '../types/farm';

// ─── 专注加速 ───

/**
 * 根据当日专注分钟数计算推进天数
 * 基础 3 天成熟 → 每天推进 1/3 进度
 */
export function calculateDailyProgress(focusMinutes: number): number {
  if (focusMinutes >= 90) return 3;   // 当天直接成熟
  if (focusMinutes >= 50) return 2;   // ~67% 进度
  if (focusMinutes >= 25) return 1.5; // ~50% 进度
  return 1;                           // 保底 ~33%
}

/** 天数转进度增量（基础 3 天成熟） */
export function daysToProgress(days: number): number {
  return days / 3;
}

// ─── 生长阶段 ───

export function getGrowthStage(progress: number): GrowthStage {
  let stage: GrowthStage = 'seed';
  for (const s of GROWTH_STAGES) {
    if (progress >= s.threshold) stage = s.id;
  }
  return stage;
}

export function getStageEmoji(progress: number, varietyId?: VarietyId): string {
  const stage = getGrowthStage(progress);
  if (stage === 'fruit' && varietyId) {
    return VARIETY_DEFS[varietyId]?.emoji ?? '🍉';
  }
  return GROWTH_STAGES.find(s => s.id === stage)?.emoji ?? '🌰';
}

/** 品种是否已揭晓（进度 >= 20%） */
export function isVarietyRevealed(progress: number): boolean {
  return progress >= 0.20;
}

// ─── 品种随机 ───

/**
 * 根据种子品质随机品种
 * epic 种子：稀有+ 概率 ×2
 * legendary 种子：稀有+ 概率 ×4
 */
export function rollVariety(seedQuality: SeedQuality = 'normal'): VarietyId {
  const multiplier = seedQuality === 'legendary' ? 4 : seedQuality === 'epic' ? 2 : 1;

  // 构建加权池
  const pool: { id: VarietyId; weight: number }[] = BLUE_STAR_VARIETIES.map(id => {
    const def = VARIETY_DEFS[id];
    const isHighRarity = def.rarity === 'rare' || def.rarity === 'epic' || def.rarity === 'legendary';
    return { id, weight: def.dropRate * (isHighRarity ? multiplier : 1) };
  });

  // 归一化
  const totalWeight = pool.reduce((sum, p) => sum + p.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const p of pool) {
    roll -= p.weight;
    if (roll <= 0) return p.id;
  }
  return pool[pool.length - 1].id;
}

// ─── 地块更新 ───

/**
 * 更新单个地块的生长进度
 * @returns 更新后的地块 + 是否刚揭晓品种
 */
export function updatePlotGrowth(
  plot: Plot,
  daysPassed: number,
  todayKey: string,
): { plot: Plot; justRevealed: boolean } {
  if (plot.state !== 'growing') return { plot, justRevealed: false };

  const prevProgress = plot.progress;
  const progressInc = daysToProgress(daysPassed);
  const newProgress = Math.min(1, plot.progress + progressInc);

  const wasRevealed = isVarietyRevealed(prevProgress);
  const nowRevealed = isVarietyRevealed(newProgress);
  const justRevealed = !wasRevealed && nowRevealed;

  const newState = newProgress >= 1 ? 'mature' as const : 'growing' as const;

  return {
    plot: {
      ...plot,
      progress: newProgress,
      state: newState,
      lastUpdateDate: todayKey,
    },
    justRevealed,
  };
}

/**
 * 枯萎检测：连续 3 天未活跃 → 所有生长中的地块枯萎
 */
export function witherPlots(plots: Plot[]): Plot[] {
  return plots.map(p => {
    if (p.state === 'growing' || p.state === 'mature') {
      return { ...p, state: 'withered' as const };
    }
    return p;
  });
}

/**
 * 计算两个日期之间的天数差
 */
export function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA + 'T00:00:00');
  const b = new Date(dateB + 'T00:00:00');
  return Math.floor(Math.abs(b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}
