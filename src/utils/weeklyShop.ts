/**
 * weeklyShop — Weekly market generation and refresh utilities.
 *
 * Refresh rule:
 * - Refresh at Monday 00:00 UTC
 * - Shop items are regenerated on refresh
 */
import { VARIETY_DEFS } from '../types/farm';
import type { VarietyDef, GalaxyId } from '../types/farm';
import type {
  WeeklyShop,
  WeeklyItem,
  WeeklyItemType,
  WeeklyDecorationId,
  WeeklyRareGeneData,
  WeeklyLegendarySeedData,
  WeeklyDecorationData,
} from '../types/market';

const WEEKLY_ITEM_MIN = 3;
const WEEKLY_ITEM_MAX = 5;
const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const FIVE_GALAXIES: GalaxyId[] = ['thick-earth', 'fire', 'water', 'wood', 'metal'];
const EXTRA_TYPE_POOL: WeeklyItemType[] = ['rare-gene-fragment', 'legendary-seed', 'limited-decoration'];

const DECORATION_POOL: Array<{ id: WeeklyDecorationId; emoji: string; name: string }> = [
  { id: 'star-lamp', emoji: '🏮', name: 'Star Lamp' },
  { id: 'melon-scarecrow', emoji: '🧸', name: 'Melon Scarecrow' },
  { id: 'nebula-banner', emoji: '🎏', name: 'Nebula Banner' },
  { id: 'mini-windmill', emoji: '🎡', name: 'Mini Windmill' },
  { id: 'meteor-stone', emoji: '🪨', name: 'Meteor Stone' },
];

const RARE_GENE_POOL = Object.values(VARIETY_DEFS).filter(
  (def): def is VarietyDef & { rarity: 'epic' | 'legendary' } => (
    def.rarity === 'epic' || def.rarity === 'legendary'
  ),
);

const LEGENDARY_SEED_POOL = Object.values(VARIETY_DEFS).filter(
  (def): def is VarietyDef & { rarity: 'epic' } => (
    def.breedType === 'pure'
      && def.rarity === 'epic'
      && FIVE_GALAXIES.includes(def.galaxy)
  ),
);

function randomInt(minInclusive: number, maxInclusive: number): number {
  return Math.floor(Math.random() * (maxInclusive - minInclusive + 1)) + minInclusive;
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

function createItemId(nowTimestamp: number, index: number): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `weekly-${nowTimestamp}-${index}-${rand}`;
}

function toSignature(type: WeeklyItemType, key: string): string {
  return `${type}:${key}`;
}

function pickRareGene(used: Set<string>): WeeklyRareGeneData {
  const candidates = RARE_GENE_POOL.filter((def) => (
    !used.has(toSignature('rare-gene-fragment', def.id))
  ));
  const picked = randomPick(candidates.length > 0 ? candidates : RARE_GENE_POOL);
  used.add(toSignature('rare-gene-fragment', picked.id));
  return {
    varietyId: picked.id,
    rarity: picked.rarity,
    emoji: picked.emoji,
  };
}

function pickLegendarySeed(used: Set<string>): WeeklyLegendarySeedData {
  const candidates = LEGENDARY_SEED_POOL.filter((def) => (
    !used.has(toSignature('legendary-seed', def.id))
  ));
  const picked = randomPick(candidates.length > 0 ? candidates : LEGENDARY_SEED_POOL);
  used.add(toSignature('legendary-seed', picked.id));
  return {
    varietyId: picked.id,
    emoji: picked.emoji,
  };
}

function pickDecoration(used: Set<string>): WeeklyDecorationData {
  const candidates = DECORATION_POOL.filter((def) => (
    !used.has(toSignature('limited-decoration', def.id))
  ));
  const picked = randomPick(candidates.length > 0 ? candidates : DECORATION_POOL);
  used.add(toSignature('limited-decoration', picked.id));
  return {
    decorationId: picked.id,
    emoji: picked.emoji,
  };
}

function createWeeklyItem(
  type: WeeklyItemType,
  index: number,
  nowTimestamp: number,
  used: Set<string>,
): WeeklyItem {
  if (type === 'rare-gene-fragment') {
    const data = pickRareGene(used);
    return {
      id: createItemId(nowTimestamp, index),
      type,
      name: `Gene Fragment · ${data.varietyId}`,
      price: randomInt(200, 500),
      stock: randomInt(1, 2),
      data,
    };
  }

  if (type === 'legendary-seed') {
    const data = pickLegendarySeed(used);
    return {
      id: createItemId(nowTimestamp, index),
      type,
      name: `Legendary Seed · ${data.varietyId}`,
      price: 300,
      stock: randomInt(1, 2),
      data,
    };
  }

  const data = pickDecoration(used);
  const decorationName = DECORATION_POOL.find((item) => item.id === data.decorationId)?.name ?? data.decorationId;
  return {
    id: createItemId(nowTimestamp, index),
    type,
    name: decorationName,
    price: randomInt(100, 200),
    stock: randomInt(1, 3),
    data,
  };
}

export function getNextMondayUtcTimestamp(fromTimestamp: number = Date.now()): number {
  const from = new Date(fromTimestamp);
  const dayOfWeek = from.getUTCDay();
  const daysUntilNextMonday = dayOfWeek === 1 ? 7 : (8 - dayOfWeek) % 7;
  return Date.UTC(
    from.getUTCFullYear(),
    from.getUTCMonth(),
    from.getUTCDate() + daysUntilNextMonday,
    0, 0, 0, 0,
  );
}

export function shouldRefreshWeeklyShop(shop: WeeklyShop, nowTimestamp: number = Date.now()): boolean {
  const refreshAtTimestamp = Date.parse(shop.refreshAt);
  if (!Number.isFinite(refreshAtTimestamp)) return true;
  return nowTimestamp >= refreshAtTimestamp;
}

export function generateWeeklyItems(nowTimestamp: number = Date.now()): WeeklyItem[] {
  const itemCount = randomInt(WEEKLY_ITEM_MIN, WEEKLY_ITEM_MAX);
  const used = new Set<string>();
  const items: WeeklyItem[] = [
    createWeeklyItem('rare-gene-fragment', 0, nowTimestamp, used),
    createWeeklyItem('legendary-seed', 1, nowTimestamp, used),
    createWeeklyItem('limited-decoration', 2, nowTimestamp, used),
  ];

  while (items.length < itemCount) {
    const type = randomPick(EXTRA_TYPE_POOL);
    items.push(createWeeklyItem(type, items.length, nowTimestamp, used));
  }

  return items;
}

export function createWeeklyShop(nowTimestamp: number = Date.now()): WeeklyShop {
  return {
    items: generateWeeklyItems(nowTimestamp),
    refreshAt: new Date(getNextMondayUtcTimestamp(nowTimestamp)).toISOString(),
    lastRefreshAt: new Date(nowTimestamp).toISOString(),
  };
}

export function getWeeklyCountdownParts(refreshAt: string, nowTimestamp: number = Date.now()): {
  days: number;
  hours: number;
} {
  const refreshAtTimestamp = Date.parse(refreshAt);
  if (!Number.isFinite(refreshAtTimestamp)) {
    return { days: 0, hours: 0 };
  }

  const diffMs = Math.max(0, refreshAtTimestamp - nowTimestamp);
  return {
    days: Math.floor(diffMs / MS_PER_DAY),
    hours: Math.floor((diffMs % MS_PER_DAY) / MS_PER_HOUR),
  };
}
