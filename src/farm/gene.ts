import type { GeneFragment } from '../types/gene';
import type { GalaxyId, HybridGalaxyPair, Rarity, VarietyId } from '../types/farm';
import type { SeedQuality } from '../types/slicing';
import { GALAXY_VARIETIES, HYBRID_VARIETIES, VARIETY_DEFS } from '../types/farm';

/**
 * 注入种子品种抽取：80% 目标星系，20% 其他已解锁星系
 * 不会出杂交品种（当前阶段没有杂交品种，但逻辑上预留）
 */
export function rollInjectedVariety(
  targetGalaxyId: GalaxyId,
  unlockedGalaxies: GalaxyId[],
  quality: SeedQuality = 'normal',
): VarietyId {
  const roll = Math.random();
  let sourceGalaxies: GalaxyId[];

  if (roll < 0.8) {
    // 80% 从目标星系
    sourceGalaxies = [targetGalaxyId];
  } else {
    // 20% 从其他已解锁星系（排除目标星系）
    const others = unlockedGalaxies.filter(g => g !== targetGalaxyId);
    sourceGalaxies = others.length > 0 ? others : [targetGalaxyId];
  }

  // 复用 rollVariety 的加权逻辑
  const multiplier = quality === 'legendary' ? 4 : quality === 'epic' ? 2 : 1;
  const sourcePool: VarietyId[] = [];
  for (const gid of sourceGalaxies) {
    sourcePool.push(...(GALAXY_VARIETIES[gid] ?? []));
  }
  if (sourcePool.length === 0) sourcePool.push(...GALAXY_VARIETIES['thick-earth']);

  const pool: { id: VarietyId; weight: number }[] = sourcePool.map(id => {
    const def = VARIETY_DEFS[id];
    const isHighRarity = def.rarity === 'rare' || def.rarity === 'epic' || def.rarity === 'legendary';
    return { id, weight: def.dropRate * (isHighRarity ? multiplier : 1) };
  });

  const totalWeight = pool.reduce((sum, p) => sum + p.weight, 0);
  let r = Math.random() * totalWeight;
  for (const p of pool) {
    r -= p.weight;
    if (r <= 0) return p.id;
  }
  return pool[pool.length - 1].id;
}

/**
 * 生成注入种子 ID
 */
export function createInjectedSeedId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

type HybridGalaxyName = 'earth' | 'fire' | 'water' | 'wood' | 'metal';

const HYBRID_GALAXY_ORDER: Record<HybridGalaxyName, number> = {
  earth: 0,
  fire: 1,
  water: 2,
  wood: 3,
  metal: 4,
};

function normalizeHybridGalaxy(galaxyId: GalaxyId): HybridGalaxyName {
  switch (galaxyId) {
    case 'thick-earth':
      return 'earth';
    case 'fire':
      return 'fire';
    case 'water':
      return 'water';
    case 'wood':
      return 'wood';
    case 'metal':
      return 'metal';
    default:
      throw new Error(`Unsupported galaxy for fusion: ${galaxyId}`);
  }
}

export function toHybridGalaxyPair(g1: GalaxyId, g2: GalaxyId): HybridGalaxyPair {
  const galaxy1 = normalizeHybridGalaxy(g1);
  const galaxy2 = normalizeHybridGalaxy(g2);
  const sorted = [galaxy1, galaxy2].sort((a, b) => HYBRID_GALAXY_ORDER[a] - HYBRID_GALAXY_ORDER[b]);
  return `${sorted[0]}-${sorted[1]}` as HybridGalaxyPair;
}

export function fusionSuccessRate(rarity1: Rarity, rarity2: Rarity): number {
  const pair = [rarity1, rarity2];
  if (pair.includes('legendary')) return 0.90;
  if (pair.includes('epic')) return 0.70;
  if (pair[0] === 'rare' && pair[1] === 'rare') return 0.55;
  if (pair.includes('rare')) return 0.50;
  return 0.30;
}

export function attemptFusion(
  fragment1: GeneFragment,
  fragment2: GeneFragment,
  modifierBonus = 0,
): { success: boolean; successRate: number; galaxyPair: HybridGalaxyPair } | null {
  if (fragment1.galaxyId === fragment2.galaxyId) return null;

  let galaxyPair: HybridGalaxyPair;
  try {
    galaxyPair = toHybridGalaxyPair(fragment1.galaxyId, fragment2.galaxyId);
  } catch {
    return null;
  }
  const successRate = Math.min(1, fusionSuccessRate(fragment1.rarity, fragment2.rarity) + modifierBonus);

  return {
    success: Math.random() < successRate,
    successRate,
    galaxyPair,
  };
}

export function rollHybridVariety(galaxyPair: HybridGalaxyPair): VarietyId {
  const candidates = HYBRID_VARIETIES[galaxyPair];
  const pool = candidates.map(id => ({ id, weight: VARIETY_DEFS[id].dropRate }));
  const totalWeight = pool.reduce((sum, p) => sum + p.weight, 0);

  let r = Math.random() * totalWeight;
  for (const p of pool) {
    r -= p.weight;
    if (r <= 0) return p.id;
  }

  return pool[pool.length - 1].id;
}
