# E-001-T15 返工第3轮差异清单（终版）

更新时间：2026-02-28 10:04 UTC
commit: `3b0ac83`

## 返工范围（仅本步）
- 仅调整九宫格编排，不跨 E-001-T16。
- 目标：继续提升地块区占比、下移重心、压缩下半区空场，并保持三状态同屏可读。

## 本轮改动

### 1) 再提升地块区占比
- `FarmPlotBoardV2` 在 compact 模式下版心宽度改为：
  - `min(99vw, calc(100dvh - 188px), 720px)`
- 横向占比进一步提升，地块区更接近“第一眼主体”。

### 2) 继续下移重心
- compact 顶部留白从 `pt-[180px]` 调整到 `pt-[204px]`。
- 九宫格视觉中心整体下沉，减轻“重心偏上”问题。

### 3) 进一步压缩下半区空场
- compact 底部留白压缩到 `pb-0`（sm: `pb-3`）。
- 在同视口内减少下半区无效草地空场。

### 4) 三状态同屏可读性保持
- 未改动状态映射与单块视觉语义，继续保持 empty/growing/mature-4 同屏可读。

## 验收事实（proof）
- git: `3b0ac83`
- preview: `https://feature-e001-t15-r3.watermelon-clock.pages.dev/?farmReview=1&farmBoard=v2&v=3b0ac83`
- artifact: `/home/ycz87/.openclaw/workspace-coder/cosmelon/artifacts/e-001-t15/20260228-100230Z/`
  - desktop: `E-001-T15-compare-desktop.png`
  - mobile: `E-001-T15-compare-mobile.png`

## 改动文件
- `src/components/farm-v2/FarmPlotBoardV2.tsx`

## 验证命令
- `npm run build`
- `npm run compare:e001-t15`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t15-r3 --commit-dirty=true`
