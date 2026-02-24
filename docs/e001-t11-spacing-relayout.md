# E-001-T11 地块间距与落位返工

## 参数前后对照

文件：`src/components/farm/SimpleFarmGrid.tsx`

### 1) 地块整体继续下移（相对 `7461c24`）
- `sceneTopPadding`
  - compact mobile: `2.22x -> 2.42x`
  - mobile: `2.26x -> 2.44x`
  - desktop/tablet: `2.08x -> 2.24x`
- `sceneBottomPadding`
  - compact mobile: `0.62x -> 0.56x`
  - mobile: `0.60x -> 0.54x`
  - desktop/tablet: `0.52x -> 0.48x`

### 2) 地块间距继续压缩（更密）
- `gap`
  - compact mobile: `4 -> 3`
  - mobile: `5 -> 4`
  - tablet: `8 -> 7`
  - desktop: `10 -> 9`

### 3) 地块群排布继续内聚（相对 `7461c24`）
- slot `xOffset`
  - row2: `±12 -> ±16`
  - row4: `±20 -> ±26`
- slot `yOffset`
  - row2: `-8 -> -10`
  - row3: `-14 -> -18`
  - row4: `-22 -> -30`
  - row5: `-30 -> -40`

> 结果：地块群进一步下沉，全部稳定处于山体下方；横纵间距较 `7461c24` 继续收紧，视觉更密但无重叠。

## 版本号证明

- `package.json` 版本：`0.60.1`

## 产物

- 三联对比：`artifacts/e-001-t11/20260224-231458Z/E-001-T11-compare-{desktop|mobile|detail}.png`
- detail 放大（含标注）：`artifacts/e-001-t11/20260224-231458Z/E-001-T11-zoom-detail-annotated.png`
