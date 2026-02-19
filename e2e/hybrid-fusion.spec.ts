import { test, expect, type Page } from '@playwright/test';
import { HYBRID_GALAXY_PAIRS, HYBRID_VARIETIES, VARIETY_DEFS } from '../src/types/farm';
import type { CollectedVariety, HybridGalaxyPair, Rarity, VarietyId } from '../src/types/farm';
import { zh } from '../src/i18n/locales/zh';
import { en } from '../src/i18n/locales/en';
import { ja } from '../src/i18n/locales/ja';
import { ko } from '../src/i18n/locales/ko';
import { de } from '../src/i18n/locales/de';
import { fr } from '../src/i18n/locales/fr';
import { es } from '../src/i18n/locales/es';
import { pt } from '../src/i18n/locales/pt';

type FusionGalaxyId = 'thick-earth' | 'fire' | 'water' | 'wood' | 'metal';

interface DebugState {
  settings: Record<string, unknown>;
  farm: Record<string, unknown>;
  shed: Record<string, unknown>;
  gene: Record<string, unknown>;
}

interface SeedFragment {
  id: string;
  galaxyId: FusionGalaxyId;
  varietyId: VarietyId;
  rarity: Rarity;
  obtainedAt: string;
}

function createFragment(
  id: string,
  galaxyId: FusionGalaxyId,
  varietyId: VarietyId,
  rarity: Rarity,
): SeedFragment {
  return {
    id,
    galaxyId,
    varietyId,
    rarity,
    obtainedAt: new Date().toISOString(),
  };
}

function createSeedPayload(options?: {
  language?: 'zh' | 'en' | 'ja' | 'ko' | 'de' | 'fr' | 'es' | 'pt';
  fragments?: SeedFragment[];
  hybridSeeds?: Array<{ id: string; galaxyPair: HybridGalaxyPair }>;
  collection?: CollectedVariety[];
  itemCounts?: Record<string, number>;
  seeds?: { normal: number; epic: number; legendary: number };
}): DebugState {
  const now = Date.now();
  const todayKey = new Date(now).toISOString().slice(0, 10);

  return {
    settings: {
      workMinutes: 25,
      shortBreakMinutes: 5,
      theme: 'dark',
      language: options?.language ?? 'zh',
    },
    farm: {
      plots: [0, 1, 2, 3].map((id) => ({
        id,
        state: 'empty',
        progress: 0,
        accumulatedMinutes: 0,
        lastActivityTimestamp: 0,
      })),
      collection: options?.collection ?? [],
      lastActiveDate: todayKey,
      consecutiveInactiveDays: 0,
      lastActivityTimestamp: now,
    },
    shed: {
      seeds: options?.seeds ?? { normal: 0, epic: 0, legendary: 0 },
      items: options?.itemCounts ?? {},
      injectedSeeds: [],
      hybridSeeds: options?.hybridSeeds ?? [],
    },
    gene: {
      fragments: options?.fragments ?? [],
    },
  };
}

function seedInit(page: Page, payload: DebugState) {
  return page.addInitScript((state: DebugState) => {
    const win = window as unknown as { __fusionRandomQueue?: number[] };
    win.__fusionRandomQueue = [];

    const originalRandom = Math.random.bind(Math);
    Math.random = () => {
      if (Array.isArray(win.__fusionRandomQueue) && win.__fusionRandomQueue.length > 0) {
        const queued = win.__fusionRandomQueue.shift();
        if (typeof queued === 'number') return queued;
      }
      return originalRandom();
    };

    localStorage.clear();
    localStorage.setItem('pomodoro-guide-seen', '1');
    localStorage.setItem('pomodoro-settings', JSON.stringify(state.settings));
    localStorage.setItem('watermelon-farm', JSON.stringify(state.farm));
    localStorage.setItem('watermelon-shed', JSON.stringify(state.shed));
    localStorage.setItem('watermelon-genes', JSON.stringify(state.gene));
  }, payload);
}

async function queueRandom(page: Page, ...values: number[]) {
  await page.evaluate((nextValues: number[]) => {
    const win = window as unknown as { __fusionRandomQueue?: number[] };
    if (!Array.isArray(win.__fusionRandomQueue)) {
      throw new Error('fusion random queue is not initialized');
    }
    win.__fusionRandomQueue.push(...nextValues);
  }, values);
}

async function goToFarm(page: Page) {
  await page.goto('/');
  await page.locator('header button').filter({ hasText: '🌱' }).first().click();
  await expect(page.locator('.farm-grid-perspective')).toBeVisible();
}

async function goToGeneLab(page: Page) {
  await goToFarm(page);
  await page.locator('button').filter({ hasText: zh.geneLabTab }).click();
  await expect(page.getByText(zh.geneFusionTitle)).toBeVisible();
}

async function selectFusionPair(
  page: Page,
  firstGalaxyId: FusionGalaxyId,
  secondGalaxyId: FusionGalaxyId,
) {
  const fusionSection = page.locator('section').filter({ hasText: zh.geneFusionTitle }).first();
  await fusionSection.scrollIntoViewIfNeeded();

  await fusionSection
    .locator('button')
    .filter({ hasText: zh.galaxyName(firstGalaxyId) })
    .first()
    .click();

  await fusionSection
    .locator('button')
    .filter({ hasText: zh.galaxyName(secondGalaxyId) })
    .last()
    .click();

  return fusionSection;
}

test.describe('Hybrid Fusion', () => {
  const rateCases: Array<{
    name: string;
    firstGalaxy: FusionGalaxyId;
    secondGalaxy: FusionGalaxyId;
    expectedRate: number;
    fragments: SeedFragment[];
  }> = [
    {
      name: '⭐×⭐ -> 30%',
      firstGalaxy: 'thick-earth',
      secondGalaxy: 'wood',
      expectedRate: 30,
      fragments: [
        createFragment('c1', 'thick-earth', 'jade-stripe', 'common'),
        createFragment('c2', 'wood', 'vine-melon', 'common'),
      ],
    },
    {
      name: '⭐⭐×⭐ -> 50%',
      firstGalaxy: 'fire',
      secondGalaxy: 'thick-earth',
      expectedRate: 50,
      fragments: [
        createFragment('r1', 'fire', 'flame-pattern', 'rare'),
        createFragment('c3', 'thick-earth', 'jade-stripe', 'common'),
      ],
    },
    {
      name: '⭐⭐×⭐⭐ -> 55%',
      firstGalaxy: 'fire',
      secondGalaxy: 'metal',
      expectedRate: 55,
      fragments: [
        createFragment('r2', 'fire', 'flame-pattern', 'rare'),
        createFragment('r3', 'metal', 'galaxy-stripe', 'rare'),
      ],
    },
    {
      name: '⭐⭐⭐×⭐ -> 70%',
      firstGalaxy: 'water',
      secondGalaxy: 'thick-earth',
      expectedRate: 70,
      fragments: [
        createFragment('e1', 'water', 'diamond-melon', 'epic'),
        createFragment('c4', 'thick-earth', 'jade-stripe', 'common'),
      ],
    },
    {
      name: '⭐⭐⭐⭐×任意 -> 90%',
      firstGalaxy: 'metal',
      secondGalaxy: 'thick-earth',
      expectedRate: 90,
      fragments: [
        createFragment('l1', 'metal', 'eternal-melon', 'legendary'),
        createFragment('c5', 'thick-earth', 'jade-stripe', 'common'),
      ],
    },
  ];

  for (const rateCase of rateCases) {
    test(`AC1: ${rateCase.name}`, async ({ page }) => {
      await seedInit(page, createSeedPayload({ fragments: rateCase.fragments }));
      await goToGeneLab(page);

      const fusionSection = await selectFusionPair(page, rateCase.firstGalaxy, rateCase.secondGalaxy);
      const expectedText = zh.geneFusionRate(rateCase.expectedRate / 100);

      await expect(fusionSection.getByText(expectedText)).toBeVisible();
    });
  }

  test('AC2 + AC7(fail): fusion failure consumes genes, no hybrid seed, with fail animation', async ({ page }) => {
    const payload = createSeedPayload({
      fragments: [
        createFragment('f1', 'thick-earth', 'jade-stripe', 'common'),
        createFragment('f2', 'wood', 'vine-melon', 'common'),
      ],
    });

    await seedInit(page, payload);
    await goToGeneLab(page);

    const fusionSection = await selectFusionPair(page, 'thick-earth', 'wood');
    await queueRandom(page, 0.99);

    const fusionButton = fusionSection.getByRole('button', { name: zh.geneFusionButton });
    await fusionButton.click();

    await expect(page.getByText(zh.geneFusionFail)).toBeVisible();
    await expect(fusionSection.locator('.gene-fusion-fail')).toBeVisible();
    await expect(fusionSection.locator('.gene-fusion-burst')).toContainText('💥');

    const genes = await page.evaluate(() => JSON.parse(localStorage.getItem('watermelon-genes') || '{}'));
    const shed = await page.evaluate(() => JSON.parse(localStorage.getItem('watermelon-shed') || '{}'));

    expect(genes.fragments).toHaveLength(0);
    expect(shed.hybridSeeds).toHaveLength(0);
  });

  test('AC3 + AC7(success): gene modifier adds +20% (cap 100%) and shows success animation', async ({ page }) => {
    const payload = createSeedPayload({
      fragments: [
        createFragment('m1', 'metal', 'eternal-melon', 'legendary'),
        createFragment('m2', 'thick-earth', 'jade-stripe', 'common'),
      ],
      itemCounts: {
        'gene-modifier': 1,
      },
    });

    await seedInit(page, payload);
    await goToGeneLab(page);

    const fusionSection = await selectFusionPair(page, 'metal', 'thick-earth');
    await expect(fusionSection.getByText(zh.geneFusionRate(0.9))).toBeVisible();

    const modifierCheckbox = fusionSection.locator('input[type="checkbox"]');
    await expect(modifierCheckbox).toBeEnabled();
    await modifierCheckbox.check();

    await expect(fusionSection.getByText(zh.geneFusionRate(1))).toBeVisible();

    await queueRandom(page, 0.95);
    await fusionSection.getByRole('button', { name: zh.geneFusionButton }).click();

    await expect(page.getByText(zh.geneFusionSuccess)).toBeVisible();
    await expect(fusionSection.locator('.gene-fusion-success')).toBeVisible();
    await expect(fusionSection.locator('.gene-fusion-burst')).toContainText('✨');

    const shed = await page.evaluate(() => JSON.parse(localStorage.getItem('watermelon-shed') || '{}'));

    expect(shed.items['gene-modifier']).toBe(0);
    expect(shed.hybridSeeds).toHaveLength(1);
    expect(shed.hybridSeeds[0].galaxyPair).toBe('earth-metal');
  });

  test('AC4: fusion success creates hybrid seed, planting uses drop-rate random roll', async ({ page }) => {
    const payload = createSeedPayload({
      fragments: [
        createFragment('h1', 'thick-earth', 'jade-stripe', 'common'),
        createFragment('h2', 'fire', 'lava-melon', 'common'),
      ],
    });

    await seedInit(page, payload);
    await goToGeneLab(page);

    const fusionSection = await selectFusionPair(page, 'thick-earth', 'fire');
    await queueRandom(page, 0.01);
    await fusionSection.getByRole('button', { name: zh.geneFusionButton }).click();

    await expect(page.getByText(zh.geneFusionSuccess)).toBeVisible();

    const shedAfterFusion = await page.evaluate(() => JSON.parse(localStorage.getItem('watermelon-shed') || '{}'));
    expect(shedAfterFusion.hybridSeeds).toHaveLength(1);
    expect(shedAfterFusion.hybridSeeds[0].galaxyPair).toBe('earth-fire');

    await page.locator('button').filter({ hasText: zh.farmPlotsTab }).first().click();

    const plantButton = page.locator('.farm-grid-perspective button').filter({ hasText: zh.farmPlant }).first();
    await plantButton.click();

    await queueRandom(page, 0.95);

    const pairLabel = zh.hybridGalaxyPairLabel('earth-fire');
    await page.locator('button').filter({ hasText: pairLabel }).first().click();

    await page.waitForTimeout(150);

    const farm = await page.evaluate(() => JSON.parse(localStorage.getItem('watermelon-farm') || '{}'));
    const shedAfterPlant = await page.evaluate(() => JSON.parse(localStorage.getItem('watermelon-shed') || '{}'));

    expect(farm.plots[0].state).toBe('growing');
    expect(HYBRID_VARIETIES['earth-fire']).toContain(farm.plots[0].varietyId);
    expect(farm.plots[0].varietyId).toBe(HYBRID_VARIETIES['earth-fire'][2]);
    expect(shedAfterPlant.hybridSeeds).toHaveLength(0);
  });

  test('AC5: 30 hybrid varieties data is complete and consistent', () => {
    expect(HYBRID_GALAXY_PAIRS).toHaveLength(10);

    const allHybridVarieties: VarietyId[] = [];

    for (const pair of HYBRID_GALAXY_PAIRS) {
      const varieties = HYBRID_VARIETIES[pair];
      expect(varieties).toHaveLength(3);

      const totalDropRate = varieties.reduce((sum, varietyId) => sum + VARIETY_DEFS[varietyId].dropRate, 0);
      expect(totalDropRate).toBeCloseTo(1, 5);

      for (const varietyId of varieties) {
        const def = VARIETY_DEFS[varietyId];
        expect(def.breedType).toBe('hybrid');
        expect(def.hybridPair).toBe(pair);
        allHybridVarieties.push(varietyId);
      }
    }

    expect(allHybridVarieties).toHaveLength(30);
    expect(new Set(allHybridVarieties).size).toBe(30);
  });

  test('AC6: Hybrid Dex tab displays progress, 10 pairs, and 30 cards correctly', async ({ page }) => {
    const collection: CollectedVariety[] = [
      {
        varietyId: 'lava-field',
        firstObtainedDate: new Date().toISOString().slice(0, 10),
        count: 1,
      },
    ];

    await seedInit(page, createSeedPayload({ collection }));
    await goToFarm(page);

    await page.locator('button').filter({ hasText: `🧬 ${zh.hybridDexTab ?? '杂交'}` }).click();

    await expect(page.getByText(zh.hybridDexTitle ?? '杂交图鉴')).toBeVisible();
    await expect(page.getByText('1/30')).toBeVisible();

    for (const pair of HYBRID_GALAXY_PAIRS) {
      await expect(page.getByText(zh.hybridGalaxyPairLabel(pair))).toBeVisible();
    }

    const cards = page.locator('div.grid.grid-cols-3 button');
    expect(await cards.count()).toBe(30);
    expect(await page.locator('div.grid.grid-cols-3 button:enabled').count()).toBe(1);
    expect(await page.locator('div.grid.grid-cols-3 button:disabled').count()).toBe(29);
  });

  test('AC8: i18n has no missing fusion/hybrid keys across 8 locales', () => {
    const locales = {
      zh,
      en,
      ja,
      ko,
      de,
      fr,
      es,
      pt,
    } as const;

    const requiredTextKeys = [
      'geneLabTab',
      'geneFusionTitle',
      'geneFusionDesc',
      'geneFusionButton',
      'geneFusionSuccess',
      'geneFusionFail',
      'geneFusionNoFragments',
      'hybridSeedHint',
      'hybridDexTab',
      'hybridDexTitle',
    ] as const;

    for (const [localeCode, messages] of Object.entries(locales)) {
      for (const key of requiredTextKeys) {
        const value = messages[key];
        expect(typeof value, `${localeCode}.${key} should be string`).toBe('string');
        expect(String(value).trim().length, `${localeCode}.${key} should not be empty`).toBeGreaterThan(0);
      }

      expect(messages.geneFusionRate(0.5)).toMatch(/50\s*%/);
      expect(messages.itemName('gene-modifier')).not.toBe('gene-modifier');

      for (const pair of HYBRID_GALAXY_PAIRS) {
        const pairName = messages.hybridGalaxyPairName(pair);
        const pairLabel = messages.hybridGalaxyPairLabel(pair);
        const seedLabel = messages.hybridSeedLabel(pairName);

        expect(pairName).toBeTruthy();
        expect(pairName).not.toBe(pair);
        expect(pairLabel).toContain(pairName);
        expect(seedLabel).toContain(pairName);
      }
    }
  });
});
