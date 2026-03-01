# E-001-T11 第11轮差异清单（终版）

更新时间：2026-02-27 09:16 UTC
commit: `f17fa91`

## 本轮改动（基于 `1662f34`）

### P0-A 底角配景切边强化（桌面优先）
- 底角 barn/house 桌面端 md 断点提升至 246×324 / 236×310（较R10再 +25%/+26%）
- 位置调整为 bottom 1~3%（从负值改为正值），确保底角配景在 overflow:hidden 容器内可见
- 水平外溢 left/right -13%~-21%，保持切边感
- z-index 提升至 15

### P0-B 移动端留白压缩 + 聚焦提升
- sceneBottomPadding compact 模式降至 0（移动端完全消除底部留白）
- sceneTopPadding compact 模式降低（1.46/1.4，原 1.72/1.64），地块整体上移
- plotScale compact 各档再 +0.06（1.24/1.28/1.38），地块更大更聚焦
- gridAutoRows compact mobile 提升至 0.76（原 0.72），纵向占比增大
- slotOffsetScale compact 提升至 0.94/0.97/1.0，地块间距更紧凑

### P0-C 手绘质感增强
- SVG grain texture opacity 从 0.05 提升至 0.09（feTurbulence 噪点更明显）
- 顶面 grain overlay opacity 从 0.22 提升至 0.30
- 侧面新增 grain overlay（opacity 0.14），统一手绘纹理
- 整体地块表面呈现更强的手绘颗粒感

## 已收敛项
- 成熟态稳定 4 瓜组（桌面/移动一致）
- 地块厚实感显著（bedHeight 0.84 / depth 0.19 / 加粗 stroke）
- 底角配景桌面端体量大幅增加，底部可见且切边
- 移动端底部留白基本消除，7 地块填满首屏
- 手绘颗粒纹理覆盖顶面+侧面+内凹土层

## 未收敛项
| 未收敛项 | 说明 |
| --- | --- |
| 参考图为手绘插画风格，当前为 SVG/CSS 实现 | CSS/SVG 技术极限，需 Pixi.js Phase 重构 |
| 参考图地块为等距菱形视角 | 架构层面差异，需 Pixi.js 重构 |

## 改动文件
- `src/components/farm/IsometricPlotShell.tsx`
- `src/components/farm/SimpleFarmGrid.tsx`
- `src/components/farm/FarmDecorations.tsx`
