# E-001-T11 第14轮差异清单（终版）

更新时间：2026-02-27 10:15 UTC
commit: `60a67b0`

## 本轮改动（基于 `df34761`）

### P0-A 桌面端“压边侵入感”极限强化
- 底角主体进一步放大：
  - Barn md: `340x448 -> 392x516`
  - House md: `332x436 -> 382x504`
- 桌面锚点继续上提：`md bottom ~15% -> 26%`，让底角主体显著侵入主画幅
- 水平位置改为内收（md left/right `~1.5%`），配合超大体量形成“切边压入”视觉
- 层级提升到 `z-18`，确保角落主体稳定压住下层景观

### P0-B 移动端下半区留白收缩 + 主体聚焦
- compact 地块继续放大：`plotScale 1.44 / 1.48 / 1.52`
- 紧凑行高提升：`gridAutoRows mobile 0.84`
- 槽位位移压缩：`slotOffsetScale 0.82 / 0.86 / 0.94`，地块更紧凑、垂直聚焦更强
- 顶部留白提高到 `1.92 / 1.86`，并将 bottomPadding 固定为 0，进一步压缩中下部空场

### P0-C 低位锚点强化
- 动物尺寸与落位继续增强（cow/sheep 更大更高位），补足下半区视觉锚点
- 底角主体阴影加强为 `0_10px_16px`，接地感更强

## 已收敛项
- 成熟态稳定 4 瓜组（桌面/移动一致）
- 桌面端底角主体侵入感、体量与层级较第13轮显著增强
- 移动端主农场聚焦与下半区填充继续提升

## 未收敛项与改法
| 未收敛项 | 下一步改法 |
| --- | --- |
| 与参考图“手绘插画笔触”仍有风格差 | 下一轮在不改布局前提下补背景层纹理与笔触细节（草地/天空） |
| 等距菱形透视差异 | 结构性差异，需 Pixi.js phase 解决 |

## 改动文件
- `src/components/farm/SimpleFarmGrid.tsx`
- `src/components/farm/FarmDecorations.tsx`

## 验证方式
- `npm run build`
- `npm run compare:e001-t11`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t11-r14 --commit-dirty=true`
