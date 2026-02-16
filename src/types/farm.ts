/**
 * 农场系统类型定义
 *
 * 品种、地块、图鉴、农场存储。
 */
import type { SeedQuality } from './slicing';

// ─── 星系 ───
export type GalaxyId = 'blue-star' | 'flame-crystal' | 'frost-moon' | 'rainbow' | 'dark-matter';

export interface GalaxyDef {
  id: GalaxyId;
  emoji: string;
  unlockCondition: string; // 描述性，Phase 1 只解锁 blue-star
}

export const GALAXIES: GalaxyDef[] = [
  { id: 'blue-star', emoji: '🌍', unlockCondition: 'default' },
  { id: 'flame-crystal', emoji: '🔥', unlockCondition: 'collect-5' },
  { id: 'frost-moon', emoji: '🧊', unlockCondition: 'collect-8-bluestar' },
  { id: 'rainbow', emoji: '🌈', unlockCondition: 'collect-15' },
  { id: 'dark-matter', emoji: '🌑', unlockCondition: 'collect-20' },
];

// ─── 稀有度 ───
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'hidden';

export const RARITY_STARS: Record<Rarity, number> = {
  common: 1, rare: 2, epic: 3, legendary: 4, hidden: 5,
};

export const RARITY_COLOR: Record<Rarity, string> = {
  common: '#4ade80',   // 绿
  rare: '#60a5fa',     // 蓝
  epic: '#a78bfa',     // 紫
  legendary: '#fbbf24', // 金
  hidden: '#f472b6',   // 粉
};

// ─── 品种 ───
export type VarietyId =
  // 蓝星 8 个
  | 'jade-stripe' | 'black-pearl' | 'honey-bomb' | 'mini-round'
  | 'star-moon' | 'golden-heart' | 'ice-sugar-snow' | 'cube-melon';

export interface VarietyDef {
  id: VarietyId;
  galaxy: GalaxyId;
  rarity: Rarity;
  dropRate: number;  // 基础掉率（0-1）
  emoji: string;
}

/** 蓝星品种定义 */
export const VARIETY_DEFS: Record<VarietyId, VarietyDef> = {
  'jade-stripe':     { id: 'jade-stripe',     galaxy: 'blue-star', rarity: 'common',    dropRate: 0.18, emoji: '🍉' },
  'black-pearl':     { id: 'black-pearl',     galaxy: 'blue-star', rarity: 'common',    dropRate: 0.16, emoji: '🖤' },
  'honey-bomb':      { id: 'honey-bomb',      galaxy: 'blue-star', rarity: 'common',    dropRate: 0.15, emoji: '🍯' },
  'mini-round':      { id: 'mini-round',      galaxy: 'blue-star', rarity: 'common',    dropRate: 0.14, emoji: '🔴' },
  'star-moon':       { id: 'star-moon',       galaxy: 'blue-star', rarity: 'rare',      dropRate: 0.07, emoji: '🌙' },
  'golden-heart':    { id: 'golden-heart',    galaxy: 'blue-star', rarity: 'rare',      dropRate: 0.06, emoji: '💛' },
  'ice-sugar-snow':  { id: 'ice-sugar-snow',  galaxy: 'blue-star', rarity: 'epic',      dropRate: 0.03, emoji: '❄️' },
  'cube-melon':      { id: 'cube-melon',      galaxy: 'blue-star', rarity: 'legendary', dropRate: 0.01, emoji: '🧊' },
};

export const ALL_VARIETY_IDS: VarietyId[] = Object.keys(VARIETY_DEFS) as VarietyId[];
export const BLUE_STAR_VARIETIES: VarietyId[] = ALL_VARIETY_IDS.filter(id => VARIETY_DEFS[id].galaxy === 'blue-star');

// ─── 生长阶段 ───
export type GrowthStage = 'seed' | 'sprout' | 'leaf' | 'flower' | 'fruit';

export interface StageDef {
  id: GrowthStage;
  threshold: number; // 进度阈值 (0-1)
  emoji: string;
}

export const GROWTH_STAGES: StageDef[] = [
  { id: 'seed',   threshold: 0,    emoji: '🌰' },
  { id: 'sprout', threshold: 0.20, emoji: '🌱' },
  { id: 'leaf',   threshold: 0.50, emoji: '🌿' },
  { id: 'flower', threshold: 0.75, emoji: '🌼' },
  { id: 'fruit',  threshold: 1.00, emoji: '🍉' },
];

// ─── 地块 ───
export type PlotState = 'empty' | 'growing' | 'mature' | 'withered';

export interface Plot {
  id: number;
  state: PlotState;
  seedQuality?: SeedQuality;
  varietyId?: VarietyId;
  progress: number;       // 0-1
  plantedDate?: string;   // ISO date
  lastUpdateDate?: string; // ISO date (最后一次生长更新)
}

export function createEmptyPlot(id: number): Plot {
  return { id, state: 'empty', progress: 0 };
}

// ─── 图鉴 ───
export interface CollectedVariety {
  varietyId: VarietyId;
  firstObtainedDate: string;
  count: number;
}

// ─── 农场存储 ───
export interface FarmStorage {
  plots: Plot[];
  collection: CollectedVariety[];
  lastActiveDate: string; // YYYY-MM-DD
  consecutiveInactiveDays: number; // 连续未活跃天数（用于枯萎检测）
}

export const DEFAULT_FARM_STORAGE: FarmStorage = {
  plots: [0, 1, 2, 3].map(createEmptyPlot),
  collection: [],
  lastActiveDate: '',
  consecutiveInactiveDays: 0,
};
