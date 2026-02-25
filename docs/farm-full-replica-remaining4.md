# 农场视觉完整复刻（剩余4项）

## 本轮改动完成项

1. 地块排列：改为不规则错位（不再严格垂直轴线）
2. 房屋样式：左上橙色双层+烟囱，右上红色拱顶谷仓
3. 配景元素：右上补齐木箱 + 小鸡
4. 地块内容：成熟状态改为 4 西瓜一组，并在验收图中按“空地+幼苗+成熟”混合分布

## 参数/实现对照（相对 `52b763b`）

文件：`src/components/farm/SimpleFarmGrid.tsx`
- `PORTRAIT_SLOT_PLACEMENTS`：7 个地块 `xOffset/yOffset` 重新错位，形成非对称自然排布

文件：`src/components/farm/FarmDecorations.tsx`
- 新增 `TopLeftHouseIcon`（橙色双层+烟囱）
- 新增 `TopRightBarnIcon`（红色拱顶谷仓）
- 新增 `CrateIcon`、`ChickIcon` 并挂载右上区域

文件：`src/components/FarmPage.tsx`
- mature 视觉由 3 果改为 4 果布局（2+2）

文件：`scripts/e001-t02-generate-triptych-compare.mjs`
- `E-001-T11` 验收口径保持 7 块地
- 注入空地/幼苗/成熟混合状态用于对比验收

## 产物

- 三联对比：`artifacts/e-001-t11/20260225-030133Z/E-001-T11-compare-{desktop|mobile|detail}.png`
- 关键改动标注图：`artifacts/e-001-t11/20260225-030133Z/E-001-T11-key-diff-annotated.png`
- 版本号：`v0.61.0`
