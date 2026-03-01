# E-001-T14 第1轮差异清单（终版）

更新时间：2026-02-28 07:11 UTC
commit: `52cec1f`

## 本轮完成项（Step 2/5）

### 1) V2 单块地块可复用组件
- 新增 `FarmPlotTileV2`：统一地块外框、内层 3x3 土格、2D 卡通线条语言。
- 输出状态映射 `mapPlotStateToTileState`，用于把 Plot state 映射到 V2 三状态。

### 2) 三状态接入
- `empty`：空地土格（无占位按钮）。
- `growing`：9 宫格内幼苗小图标（统一风格）。
- `mature`：固定 4 瓜组（2x2），与移动/桌面一致。

### 3) V2 板块接线更新
- `FarmPlotBoardV2` 改为调用 `FarmPlotTileV2`，不再内联绘制地块。
- 保持 V2 与 Legacy 平行：仅通过 `farmBoard=v2` 挂载。

### 4) 对比链路扩展到 E-001-T14
- compare 脚本新增 E-001-T14 分支：
  - 访问 `?farmReview=1&farmBoard=v2` 截图；
  - 新参考图对比；
  - 标注文案切换为“单块三状态”语义。
- `package.json` 新增 `compare:e001-t14`。

## 验收事实（proof）
- git: `52cec1f`
- preview: `https://feature-e001-t14-r1.watermelon-clock.pages.dev/?farmReview=1&farmBoard=v2&v=52cec1f`
- artifact: `/home/ycz87/.openclaw/workspace-coder/cosmelon/artifacts/e-001-t14/20260228-071604Z/`
  - desktop: `E-001-T14-compare-desktop.png`
  - mobile: `E-001-T14-compare-mobile.png`

## 改动文件
- `src/components/farm-v2/FarmPlotTileV2.tsx`
- `src/components/farm-v2/FarmPlotBoardV2.tsx`
- `scripts/e001-t02-generate-triptych-compare.mjs`
- `package.json`

## 验证命令
- `npm run build`
- `npm run compare:e001-t14`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t14-r1 --commit-dirty=true`
