# E-001-T11 地块间距与落位返工

## 参数前后对照

文件：`src/components/farm/SimpleFarmGrid.tsx`

### 1) 地块整体下移（纵向落位）
- `sceneTopPadding`
  - compact mobile: `1.98x -> 2.22x`
  - mobile: `2.04x -> 2.26x`
  - desktop/tablet: `1.90x -> 2.08x`
- `sceneBottomPadding`
  - compact mobile: `0.68x -> 0.62x`
  - mobile: `0.64x -> 0.60x`
  - desktop/tablet: `0.56x -> 0.52x`

### 2) 地块间距收紧（排密）
- `gap`
  - compact mobile: `5 -> 4`
  - mobile: `6 -> 5`
  - tablet: `10 -> 8`
  - desktop: `12 -> 10`

### 3) 地块群排布内聚
- slot `xOffset`
  - row2: `±8 -> ±12`
  - row4: `±14 -> ±20`
- slot `yOffset`
  - row2: `-4 -> -8`
  - row3: `-8 -> -14`
  - row4: `-12 -> -22`
  - row5: `-18 -> -30`

> 结果：地块群整体下沉到山体下方，同时横纵节奏收紧，视觉更密但不重叠。

## 产物

- 三联对比：`artifacts/e-001-t11/20260224-153903Z/E-001-T11-compare-{desktop|mobile|detail}.png`
- detail 放大（含标注）：`artifacts/e-001-t11/20260224-153903Z/E-001-T11-zoom-detail-annotated.png`
