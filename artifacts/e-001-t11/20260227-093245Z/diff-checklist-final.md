# E-001-T11 第12轮差异清单（终版）

更新时间：2026-02-27 09:34 UTC
commit: `7c00e9d`

## 本轮改动（基于 `f17fa91`）

### P0-A 底角配景成立感（桌面优先）
- 底角配景体量继续放大：
  - 左下 Barn：md `246x324` -> `286x376`
  - 右下 House：md `236x310` -> `276x362`
- 底角锚点明显上提：desktop `bottom ~1%` -> `7.4%/7.6%`，确保在首屏主视觉区形成“成立”的角落主体
- z-index `15 -> 16`，避免被地形层压住
- 阴影加强：`drop-shadow` 从 `0_7px_13px` 提升到 `0_8px_14px`

### P0-B 移动端下半区留白压缩
- 地块整体进一步放大：compact `plotScale` 提升到 `1.30 / 1.34 / 1.42`
- 纵向密度继续提升：`gridAutoRows` mobile `0.76 -> 0.80`
- 纵向位移系数提升：`slotOffsetScale` `0.94/0.97/1.0 -> 1.02/1.05/1.04`
- 顶部留白回调到 `1.64 / 1.58`（避免地块过度上浮后底部再次空场），底部 padding 维持 0

### P0-C 手绘视觉语言一致性
- 继续沿用第11轮增强后的 grain texture（顶面+侧面），维持土壤颗粒感与地块层次
- 本轮重点集中在构图与配景成立感，不再额外改动地块材质参数，避免风格震荡

## 已收敛项
- 成熟态稳定 4 瓜组（桌面/移动一致）
- 7 地块首屏聚焦进一步提升，移动端下半区留白较前轮明显收紧
- 桌面底角配景在首屏内可见面积提升，角落主体感增强

## 未收敛项与改法
| 未收敛项 | 下一步改法 |
| --- | --- |
| 桌面端与参考图相比，底角“压边侵入感”仍可再强 | 保持当前体量，继续微调 `left/right` 外溢与 `bottom` 锚点，向“侵入主画幅”方向再推进 6%~10% |
| 参考图手绘插画语言与当前 SVG 风格仍有差异 | 保留现有验收分支稳定性，后续在 Pixi.js phase 做材质与笔触系统升级 |

## 改动文件
- `src/components/farm/SimpleFarmGrid.tsx`
- `src/components/farm/FarmDecorations.tsx`

## 验证方式
- `npm run build`
- `npm run compare:e001-t11`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t11-r12 --commit-dirty=true`
