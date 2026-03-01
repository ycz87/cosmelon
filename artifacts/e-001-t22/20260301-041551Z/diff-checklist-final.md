# E-001-T22 Step A Diff Checklist (Final)

## Scope
- Task: E-001-T22 Step A only (视觉先行)
- Branch: `feature/e002-t01-pixi-phase0-baseline`
- Compare run: `20260301-041551Z`

## Implemented changes

### 1) 移除底部重复业务入口条
- 删除 V2 农田底部重复入口整条（瓜棚/图鉴/实验室/商城）。
- 保留顶部主导航 + 农场子Tab，避免信息重复。
- File: `src/components/farm-v2/FarmPlotBoardV2.tsx`

### 2) 背景重构为三层（草地/山丘/天空）
- Sky layer：`0~27/28%`，天空渐变 + 云层 + 太阳。
- Midground hills：`27/28~43/44%`，山丘带 + 小屋 + 果树 + 栅栏。
- Grass field：`43/44~100%`，草地与纹理层。
- 通过明确分层高度百分比，三层衔接更自然，无硬断层。
- File: `src/components/farm-v2/FarmPlotBoardV2.tsx`

### 3) 作物重画与放大（更可爱更精细）
- Sprout：盆土底座 + 更饱满叶片，尺寸提升（容器 4x4 -> 5x5）。
- Mature canopy：藤蔓更粗、叶片更大，果实数量与尺寸明显提升。
- Mature melons：主果直径提升到 42%，辅果 34% + 中心 24%，成熟态接近占满整块地的主体观感。
- Plot shell 同步优化：外壳圆角 22px，土壤高光/纹理增强。
- File: `src/components/farm-v2/FarmPlotTileV2.tsx`

## Acceptance check mapping (E-001-T22 Step A)
- [x] 底部重复业务入口条已移除
- [x] 背景已重构为三层（草地/山丘+果树小屋/天空）
- [x] 作物重画并放大，成熟瓜主体感显著增强
- [x] 仅执行 Step A（未进入 Step B/C）

## Artifacts
- `E-001-T22-current-desktop.png`
- `E-001-T22-current-mobile.png`
- `E-001-T22-compare-desktop.png`
- `E-001-T22-compare-mobile.png`
- `E-001-T22-summary.json`
- `diff-checklist-final.md`

## Validation
- `npm run build` ✅
- `npm run compare:e001-t22` ✅
