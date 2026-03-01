# E-001-T13 第1轮差异清单（终版）

更新时间：2026-02-28 06:43 UTC
commit: `2ed1751`

## 本轮交付范围（仅 Step 1）
- 仅完成：V2 基座 + 最小接线 + 3x3 空地骨架。
- 未跨步：未做单块三状态细节、未做 HUD/底栏最终收敛、未切主入口。

## 本轮完成项

### 1) V2 基座（新目录，独立于 Legacy）
- 新增：`src/components/farm-v2/FarmPlotBoardV2.tsx`
- 该组件独立渲染 3x3 九宫格空地骨架（9 块），不依赖 Legacy 的地块视觉实现。

### 2) 最小接线（仅挂载层）
- 在 `FarmPage` 里加入最小切换开关：当 URL 带 `farmBoard=v2` 时挂载 V2。
- 默认入口保持 Legacy，不影响既有流程。

### 3) 对比链路接入 E-001-T13
- `scripts/e001-t02-generate-triptych-compare.mjs` 新增 E-001-T13 分支：
  - 自动访问 `?farmReview=1&farmBoard=v2` 截图；
  - 使用最新参考图生成对比图；
  - 标注文案切换到 V2 基座语义。
- `package.json` 新增脚本：`compare:e001-t13`。

## 验收事实（proof）
- git: `2ed1751`
- preview: `https://feature-e001-t13-r1.watermelon-clock.pages.dev/?farmReview=1&farmBoard=v2&v=2ed1751`
- artifact: `/home/ycz87/.openclaw/workspace-coder/cosmelon/artifacts/e-001-t13/20260228-064114Z/`
  - desktop: `E-001-T13-compare-desktop.png`
  - mobile: `E-001-T13-compare-mobile.png`

## 改动文件
- `src/components/farm-v2/FarmPlotBoardV2.tsx`
- `src/components/FarmPage.tsx`
- `scripts/e001-t02-generate-triptych-compare.mjs`
- `package.json`

## 验证命令
- `npm run build`
- `npm run compare:e001-t13`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t13-r1 --commit-dirty=true`
