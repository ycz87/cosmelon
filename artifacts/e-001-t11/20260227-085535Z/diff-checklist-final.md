# E-001-T11 第10轮差异清单（终版）

更新时间：2026-02-27 08:55 UTC
commit: `1662f34`

## 本轮改动（基于 `2e2741f`）

### P0-A 底角配景切边强化（桌面优先）
- 底角 barn/house 尺寸桌面端 md 断点提升至 196×258 / 188×246（+53%/+52%）
- 位置外溢至 left/right -14%、bottom -12%，强化切边感
- z-index 提升至 14，确保配景覆盖边缘
- drop-shadow 加深增强立体感

### P0-B 移动端留白压缩
- sceneBottomPadding compact 模式降至 0.03/0.02（原 0.06/0.05）
- sceneTopPadding compact 模式微调（+0.08）以平衡视觉重心上移
- gridAutoRows compact mobile 提升至 0.72（原 0.66），地块纵向占比增大
- plotScale compact 各档 +0.04，地块整体放大

### P0-C 地块方正厚实感提升
- bedHeight 从 0.78 提升至 0.84（+7.7%）
- depth 从 0.16 提升至 0.19（+18.8%），侧面厚度显著增加
- cornerR 从 0.10 提升至 0.105
- 内凹土层 stroke 加深（opacity 0.52→0.62）、strokeWidth 加粗
- contactShadow 扩大（rx +5%、ry +13%、opacity +11%）
- 顶面/侧面 strokeWidth 均加粗（+15%~+37%）

## 已收敛项
- 成熟态稳定 4 瓜组（桌面/移动一致）
- 地块厚实感显著提升（bedHeight/depth/stroke 三维度加强）
- 底角配景桌面端体量大幅增加并外溢切边
- 移动端底部留白进一步压缩

## 未收敛项
| 未收敛项 | 具体改法 |
| --- | --- |
| 与参考图手绘质感仍有差距（参考图为手绘插画风） | CSS/SVG 实现的极限，可考虑后续 Pixi.js 方案替代 |
| 参考图地块为等距菱形视角，当前为正面矩形 | 架构层面差异，需 Pixi.js Phase 重构 |

## 改动文件
- `src/components/farm/IsometricPlotShell.tsx`
- `src/components/farm/SimpleFarmGrid.tsx`
- `src/components/farm/FarmDecorations.tsx`
