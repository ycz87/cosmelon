# E-001-T21 Step A Diff Checklist (Final)

## Scope
- Task: E-001-T21 Step A only (透视构图 + 顶部真实状态 + 底部真实入口)
- Branch: `feature/e002-t01-pixi-phase0-baseline`
- Compare run: `20260301-034557Z`

## Implemented changes

### 1. 俯视微倾斜立体感 (perspective tilt)
- 3x3 grid now uses `perspective(1400px) rotateX(8deg)` on desktop, `perspective(1100px) rotateX(7deg)` on mobile.
- Each row gets a progressive `translateY` offset (1.5-2.2px per row) for subtle depth.
- `transformOrigin: '50% 28%'` keeps the top row closer and bottom row receding.
- File: `FarmPlotBoardV2.tsx`

### 2. 首屏构图占比收敛 (25/15/60 layout)
- Sky layer: `0% → 25%` (desktop) / `0% → 26%` (mobile) — contains sun, clouds.
- Middle layer: `25% → 40%` (desktop) / `26% → 41%` (mobile) — hills, road, fence, house, tree.
- Field layer: `40% → 100%` (desktop) / `41% → 100%` (mobile) — 9 plots + grass.
- Backdrop CSS percentages recalibrated to hit 25/15/60 target (±3%).
- Board `paddingTop` increased to push plots into the 60% field zone.
- File: `FarmPlotBoardV2.tsx`

### 3. 顶部状态改为真实业务信息
- Removed placeholder badges (Level/钻石/Life).
- Now shows: ⏱ 今日专注 Xm / 🪙 瓜币 X / 🌱 可种 X / 🍉 可收 X.
- Data sourced from real props: `todayFocusMinutes`, `coinBalance`, `plantableSeedCount`, `harvestablePlotCount`.
- Files: `FarmPlotBoardV2.tsx`, `FarmPage.tsx`, `App.tsx`

### 4. 底部按钮改为真实业务入口
- Removed placeholder buttons (Shop/Bag/Tasks/Social).
- Now shows: 🏠 瓜棚 / 📖 图鉴 / 🧪 实验室 / 🏪 商城.
- Each button triggers `onNavigate(target)` → switches to corresponding tab/sub-tab.
- Labels are i18n-aware (passed from FarmPage via `navLabels`).
- Files: `FarmPlotBoardV2.tsx`, `FarmPage.tsx`

## Acceptance check mapping (E-001-T21 Step A)
- [x] 9块地"俯视微倾斜"立体感（perspective + rotateX + row offset）
- [x] 首屏构图占比：田地~60% / 中景~15% / 天空~25%（desktop+mobile）
- [x] 顶部状态改为真实业务信息（今日专注/瓜币/可种/可收）
- [x] 底部按钮改为真实入口（瓜棚/图鉴/实验室/商城，可跳转）
- [x] 入口链路不变：Farm → Plots defaults to V2

## Artifacts
- `E-001-T21-current-desktop.png`
- `E-001-T21-current-mobile.png`
- `E-001-T21-compare-desktop.png`
- `E-001-T21-compare-mobile.png`
- `E-001-T21-composition-annotation.md`
- `E-001-T21-summary.json`

## Validation
- `npm run build` ✅
- `npm run compare:e001-t21` ✅
