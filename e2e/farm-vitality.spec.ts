import { test, expect } from '@playwright/test';

interface SeedDebugStatePayload {
  settings: Record<string, unknown>;
  farm: Record<string, unknown>;
  shed: Record<string, unknown>;
}

async function seedDebugState(page: import('@playwright/test').Page) {
  const now = Date.now();
  const todayKey = new Date(now).toISOString().slice(0, 10);

  const payload: SeedDebugStatePayload = {
    settings: {
      workMinutes: 25,
      shortBreakMinutes: 5,
      alertSound: 'chime',
      alertRepeatCount: 2,
      alertVolume: 80,
      ambienceVolume: 40,
      autoStartBreak: true,
      autoStartWork: false,
      theme: 'dark',
      language: 'zh',
    },
    farm: {
      plots: [
        {
          id: 0,
          state: 'growing',
          seedQuality: 'normal',
          varietyId: 'jade-stripe',
          progress: 0.32,
          accumulatedMinutes: 3200,
          plantedDate: todayKey,
          lastUpdateDate: todayKey,
          lastActivityTimestamp: now,
        },
        {
          id: 1,
          state: 'empty',
          progress: 0,
          accumulatedMinutes: 0,
          lastActivityTimestamp: 0,
        },
        {
          id: 2,
          state: 'empty',
          progress: 0,
          accumulatedMinutes: 0,
          lastActivityTimestamp: 0,
        },
        {
          id: 3,
          state: 'empty',
          progress: 0,
          accumulatedMinutes: 0,
          lastActivityTimestamp: 0,
        },
      ],
      collection: [],
      lastActiveDate: todayKey,
      consecutiveInactiveDays: 0,
      lastActivityTimestamp: now,
    },
    shed: {
      seeds: { normal: 8, epic: 0, legendary: 0 },
    },
  };

  await page.addInitScript((seed: SeedDebugStatePayload) => {
    localStorage.clear();
    localStorage.setItem('pomodoro-guide-seen', '1');
    localStorage.setItem('watermelon-debug', 'true');
    localStorage.setItem('pomodoro-settings', JSON.stringify(seed.settings));
    localStorage.setItem('watermelon-farm', JSON.stringify(seed.farm));
    localStorage.setItem('watermelon-shed', JSON.stringify(seed.shed));
  }, payload);
}

async function goToFarm(page: import('@playwright/test').Page) {
  await page.goto('/');
  const farmTab = page.locator('header button').filter({ hasText: '🌱' }).first();
  await farmTab.click();
  await expect(page.locator('.farm-grid-perspective')).toBeVisible();
}

async function activateDebugToolbar(page: import('@playwright/test').Page) {
  const settingsButton = page.getByRole('button', { name: /settings|设置/i });
  await settingsButton.click();

  const settingsPanel = page.locator('.settings-scrollbar').first();
  await expect(settingsPanel).toBeVisible();

  const versionBadge = settingsPanel.locator('span').filter({ hasText: /^v\d+\.\d+\.\d+$/ });
  await expect(versionBadge).toBeVisible();
  for (let i = 0; i < 7; i += 1) {
    await versionBadge.click();
  }

  await expect(page.getByText('🧪 Debug Toolbar')).toBeVisible();
  await settingsButton.click();
}

async function openDebugPanel(page: import('@playwright/test').Page) {
  const debugTitle = page.getByText('🧪 Debug Toolbar');
  const resetButton = page.getByRole('button', { name: '🔄 重置所有数据' });
  if (!(await resetButton.isVisible().catch(() => false))) {
    await debugTitle.click();
  }
  await expect(resetButton).toBeVisible();
}

async function readProgress(page: import('@playwright/test').Page, plotId: number): Promise<number | null> {
  return page.evaluate((targetPlotId: number) => {
    const farmRaw = localStorage.getItem('watermelon-farm');
    if (!farmRaw) return null;
    try {
      const farm = JSON.parse(farmRaw) as { plots?: Array<{ id?: number; progress?: number }> };
      const plot = farm.plots?.find((item) => item.id === targetPlotId);
      return typeof plot?.progress === 'number' ? plot.progress : null;
    } catch {
      return null;
    }
  }, plotId);
}

test.describe('Farm vitality AC coverage', () => {
  test.beforeEach(async ({ page }) => {
    await seedDebugState(page);
  });

  test('AC1: growing 地块不直接显示 farmGrowthTime 文案', async ({ page }) => {
    await goToFarm(page);

    const growingPlot = page.locator('.farm-grid-perspective > div').first();
    await expect(growingPlot.getByText(/已生长.*共需/)).toHaveCount(0);
    await expect(page.locator('div.rounded-\\[12px\\]')).toHaveCount(0);
  });

  test('AC2: 点击 growing 地块弹出 tooltip，显示百分比和 farmGrowthTime', async ({ page }) => {
    await goToFarm(page);

    const growingPlot = page.locator('.farm-grid-perspective > div').first();
    await growingPlot.click();

    const tooltip = page.locator('div.rounded-\\[12px\\]');
    await expect(tooltip).toBeVisible();
    await expect(tooltip.getByText(/^\d+%$/)).toBeVisible();
    await expect(tooltip.getByText(/已生长/)).toBeVisible();
    await expect(tooltip.getByText(/共需/)).toBeVisible();

    const tooltipBg = await tooltip.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(tooltipBg).toBe('rgba(0, 0, 0, 0.85)');
  });

  test('AC3: 点击网格空白区域关闭 tooltip', async ({ page }) => {
    await goToFarm(page);

    const growingPlot = page.locator('.farm-grid-perspective > div').first();
    const grid = page.locator('.farm-grid-perspective');
    const tooltip = page.locator('div.rounded-\\[12px\\]');

    await growingPlot.click();
    await expect(tooltip).toBeVisible();

    await grid.evaluate((el) => {
      el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    await expect(tooltip).toHaveCount(0);
  });

  test('AC4: timeMultiplier > 1 时，等待 6 秒后 progress 增加', async ({ page }) => {
    await goToFarm(page);
    await page.evaluate(() => localStorage.setItem('watermelon-debug', 'true'));
    await activateDebugToolbar(page);
    await openDebugPanel(page);

    const multiplierSection = page.locator('section').filter({ hasText: '时间倍率' });
    await multiplierSection.getByRole('button', { name: '100x' }).click();

    const initialProgress = await readProgress(page, 0);
    if (initialProgress === null) throw new Error('plot progress not found before multiplier update');

    await page.waitForTimeout(6000);

    const progressed = await readProgress(page, 0);
    if (progressed === null) throw new Error('plot progress not found after multiplier update');
    expect(progressed).toBeGreaterThan(initialProgress);
  });

  test('AC5: Debug Toolbar 时间倍率区可用 1000x 按钮', async ({ page }) => {
    await goToFarm(page);
    await page.evaluate(() => localStorage.setItem('watermelon-debug', 'true'));
    await activateDebugToolbar(page);
    await openDebugPanel(page);

    const multiplierSection = page.locator('section').filter({ hasText: '时间倍率' });
    const button1000x = multiplierSection.getByRole('button', { name: '1000x' });
    await expect(button1000x).toBeVisible();
    await expect(button1000x).toBeEnabled();
  });

  test('AC6: timeMultiplier=1 时等待 6 秒，progress 保持不变', async ({ page }) => {
    await goToFarm(page);
    await page.evaluate(() => localStorage.setItem('watermelon-debug', 'true'));
    await activateDebugToolbar(page);
    await openDebugPanel(page);

    const multiplierSection = page.locator('section').filter({ hasText: '时间倍率' });
    await multiplierSection.getByRole('button', { name: '1x' }).click();

    const initialProgress = await readProgress(page, 0);
    if (initialProgress === null) throw new Error('plot progress not found before 1x check');

    await page.waitForTimeout(6000);

    const progressed = await readProgress(page, 0);
    if (progressed === null) throw new Error('plot progress not found after 1x check');
    expect(progressed).toBe(initialProgress);
  });
});
