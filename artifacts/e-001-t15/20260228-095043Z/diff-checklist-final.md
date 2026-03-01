# E-001-T15 返工第2轮差异清单（终版）

更新时间：2026-02-28 09:53 UTC
commit: `d558b8a`

## 返工范围（仅本步）
- 只调整九宫格编排：放大地块区占比、下移重心、压缩无效空场。
- 未跨步到 E-001-T16（未进入 HUD/底栏细节）。

## 本轮改动

### 1) 放大地块区占比
- `FarmPlotBoardV2` 版心宽度提升：
  - mobile: `min(92vw, 620px)`
  - desktop: `min(76vw, 640px)`
- 9 块地在首屏视觉面积更大，第一眼关注点更集中在地块区。

### 2) 下移重心
- 使用分模式 padding（class）控制版心纵向位置：
  - compact（移动端）显著下移（`pt-[152px]`）
  - desktop 保持中上区但略下沉（`pt-12 / sm:pt-14`）
- 目标是减少“重心偏上”观感。

### 3) 压缩无效空场
- 移动端底部留白压缩为 `pb-4`（sm `pb-6`），降低下半区空场。
- 桌面端底部留白同步收敛（`pb-10 / sm:pb-12`）。

## 验收事实（proof）
- git: `d558b8a`
- preview: `https://feature-e001-t15-r2.watermelon-clock.pages.dev/?farmReview=1&farmBoard=v2&v=d558b8a`
- artifact: `/home/ycz87/.openclaw/workspace-coder/cosmelon/artifacts/e-001-t15/20260228-095043Z/`
  - desktop: `E-001-T15-compare-desktop.png`
  - mobile: `E-001-T15-compare-mobile.png`

## 改动文件
- `src/components/farm-v2/FarmPlotBoardV2.tsx`

## 验证命令
- `npm run build`
- `npm run compare:e001-t15`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t15-r2 --commit-dirty=true`
