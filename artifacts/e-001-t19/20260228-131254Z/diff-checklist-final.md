# E-001-T19 第1轮差异清单（终版）

更新时间：2026-02-28 13:16 UTC
commit: `7119c92`

## 本轮硬要求（仅两项）
1) 删除红框整条信息区（“今日专注0分钟 + 右侧资源统计”整条不显示）。
2) 将蓝框左右边距缩窄约 50%，提升 9 块田地占比。

## 本轮完成项

### 1) 红框整条信息区已删除
- 在 `FarmPage` 的 plots 主视图中，移除“今日专注 + 资源统计”整条信息区渲染。
- 页面不再展示该条横向信息栏。

### 2) 左右边距缩窄，九宫格占比提升
- `FarmPlotBoardV2` 调整地块区宽度：
  - desktop：从 `min(66vw, 620px)` 提升到 `min(86vw, 760px)`；
  - mobile：维持高占比宽度。
- 结合上一轮已收紧的容器左右 padding（`px-0 sm:px-2`），实际左右蓝色空隙显著缩窄。

### 3) 保持不变项
- “农场 -> 地块”默认直达 V2（未回退 legacy 默认）。
- desktop/mobile 均保持可读。

### 4) E-001-T19 对比链路接入
- compare 脚本新增 E-001-T19 分支（直接走真实入口页 `/?`，标注文案更新）。
- `package.json` 新增 `compare:e001-t19`。

## 验收事实（proof）
- git: `7119c92`
- preview: `https://feature-e001-t19-r1.watermelon-clock.pages.dev/?v=7119c92`
- artifact: `/home/ycz87/.openclaw/workspace-coder/cosmelon/artifacts/e-001-t19/20260228-131254Z/`
  - desktop: `E-001-T19-current-desktop.png`, `E-001-T19-compare-desktop.png`
  - mobile: `E-001-T19-current-mobile.png`, `E-001-T19-compare-mobile.png`

## 改动文件
- `src/components/FarmPage.tsx`
- `src/components/farm-v2/FarmPlotBoardV2.tsx`
- `scripts/e001-t02-generate-triptych-compare.mjs`
- `package.json`

## 验证命令
- `npm run build`
- `npm run compare:e001-t19`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t19-r1 --commit-dirty=true`
