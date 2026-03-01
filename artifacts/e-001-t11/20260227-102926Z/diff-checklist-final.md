# E-001-T11 第15轮差异清单（终版）

更新时间：2026-02-27 10:29 UTC
commit: `94e5701`

## 本轮改动（基于 `60a67b0`）

### P0-A 底角主体“回调到成立但不过冲”
- 桌面端底角主体体量回调：
  - Barn md: `392x516 -> 302x398`
  - House md: `382x504 -> 294x386`
- 锚点回调：`md bottom 26% -> 10.2%/10.4%`
- 层级从 `z-18 -> z-16`，避免底角主体压住主地块轮廓
- 阴影从 `0_10px_16px -> 0_8px_14px`，降低“冲脸感”

### P0-B 移动端重心上提并控拥挤
- 地块参数回调到更可读区间：
  - `plotScale` 回调为 `1.30/1.34/1.46`
  - `sceneTopPadding` 回调为 `1.66/1.60`
  - `gridAutoRows` 回调为 `0.78`
  - `slotOffsetScale` 调整为 `1.02/1.04/1.00`
- 移除移动端低价值装饰拥挤：
  - 底部围栏/草丛/灌木改为 `sm` 以上显示
  - crate/chick 改为 `sm` 以上显示
  - 底部动物改为 `sm` 以上显示
- 结果：移动端下半区“堆物感”明显降低，主地块层次更清晰

### P0-C 稳定性保障
- 未改动成熟态逻辑，保持 4 瓜组稳定（无回退）

## 已收敛项
- 桌面端底角主体从“过冲”回到“成立但不遮挡主地块”
- 移动端拥挤显著缓解，主农场可读性提升
- 成熟 4 瓜组稳定保持

## 未收敛项与下一步改法
| 未收敛项 | 下一步改法 |
| --- | --- |
| 桌面端与参考图相比，底角侵入感仍可微增 | 仅做 5%~8% 小幅体量微调，不再改锚点与层级，防止再次过冲 |
| 手绘插画笔触语言差异 | 在背景层增加轻纹理与边线细节，不再动结构布局 |

## 改动文件
- `src/components/farm/SimpleFarmGrid.tsx`
- `src/components/farm/FarmDecorations.tsx`

## 验证方式
- `npm run build`
- `npm run compare:e001-t11`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t11-r15 --commit-dirty=true`
