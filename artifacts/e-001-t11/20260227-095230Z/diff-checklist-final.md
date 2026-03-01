# E-001-T11 第13轮差异清单（终版）

更新时间：2026-02-27 09:53 UTC
commit: `df34761`

## 本轮改动（基于 `7c00e9d`）

### P0-A 桌面端底角“压边侵入感”强化
- 左下/右下角落主体继续放大：
  - Barn md: `286x376 -> 340x448`
  - House md: `276x362 -> 332x436`
- 锚点继续上提（desktop bottom 到 `~15%`），让角落主体进入主画幅而非仅贴底边
- 外溢进一步收紧至 `md left/right -2%`，提升“压边侵入”的成立感
- z-index 提升至 `17`，确保角落主体层级稳定压住底部草地

### P0-B 移动端下半区留白压缩
- compact 下 plotScale 再提高至 `1.36/1.40/1.46`
- row 高度提升：mobile `gridAutoRows 0.82`
- 槽位位移收紧：`slotOffsetScale 0.90/0.92/0.98`，提升地块纵向堆叠紧凑度
- 顶部留白提高到 `1.78/1.72` 以把地块主簇压向画面中下部，减少下半区“空场感”

### P0-C 整体成立感补强
- 底部动物尺寸与落位加大（cow/sheep），补足低位视觉锚点
- 角落主体阴影增强（`0_9px_15px`），强化接地与体量感

## 已收敛项
- 成熟态稳定 4 瓜组（桌面/移动一致）
- 桌面端底角主体体量与侵入感相比第12轮明显增强
- 移动端主农场聚焦与下半区填充较第12轮进一步提升

## 未收敛项与下一步改法
| 未收敛项 | 下一步改法 |
| --- | --- |
| 与参考图相比，整体手绘插画笔触仍偏“干净” | 在不动布局的前提下，增加背景层 grain/noise 与线稿抖动细节 |
| 参考图是等距菱形地块透视，当前仍为正视矩形 | 属架构差异，需 Pixi.js Phase 重构 |

## 改动文件
- `src/components/farm/SimpleFarmGrid.tsx`
- `src/components/farm/FarmDecorations.tsx`

## 验证方式
- `npm run build`
- `npm run compare:e001-t11`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t11-r13 --commit-dirty=true`
