# E-001-T16 第1轮差异清单（终版）

更新时间：2026-02-28 10:39 UTC
commit: `6d0deb7`

## 本轮完成项（Step 4/5）

### 1) V2 场景融合（地块区与草地/围栏/建筑层级）
- 在 `FarmPlotBoardV2` 新增场景层：天空云朵、草地层带、地块后景围栏、左右建筑/树木体块、地块接地阴影。
- 地块区与场景元素形成前后层级关系，弱化拼装感，增强“接地”观感。

### 2) HUD 风格收敛（不抢主视觉）
- 新增 `FarmHudV2`：顶部轻量圆角徽章（等级/金币/钻石/生命），统一 2D 线条与块面语言。
- 控制色彩和对比度，保持可读但不压过九宫格主体。

### 3) 底栏风格收敛（工具栏 + 导航栏）
- 新增 `FarmBottomBarV2`：暖色卡通底栏容器、工具按钮行、导航按钮行。
- 与 HUD 同语义风格，形成一致的 2D UI 语言。

### 4) 保持地块主视觉
- 维持 E-001-T15 的九宫格占比与重心基础，并通过场景层“托底”突出地块主区。
- 三状态（empty/growing/mature-4）继续同屏可读。

### 5) E-001-T16 对比链路接入
- compare 脚本扩展 E-001-T16 分支（状态 seed、v2 路由、标注文案、参考图流程）。
- `package.json` 新增 `compare:e001-t16`。

## 验收事实（proof）
- git: `6d0deb7`
- preview: `https://feature-e001-t16-r1.watermelon-clock.pages.dev/?farmReview=1&farmBoard=v2&v=6d0deb7`
- artifact: `/home/ycz87/.openclaw/workspace-coder/cosmelon/artifacts/e-001-t16/20260228-103620Z/`
  - desktop: `E-001-T16-compare-desktop.png`
  - mobile: `E-001-T16-compare-mobile.png`

## 改动文件
- `src/components/farm-v2/FarmPlotBoardV2.tsx`
- `scripts/e001-t02-generate-triptych-compare.mjs`
- `package.json`

## 验证命令
- `npm run build`
- `npm run compare:e001-t16`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t16-r1 --commit-dirty=true`
