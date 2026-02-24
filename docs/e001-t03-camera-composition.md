# E-001-T03 相机与构图对齐

## 调参范围

仅调整相机与构图参数（主体尺度、纵向构图位置），未改颜色、纹理、阴影细节。

## 参数前后对照

文件：`src/components/farm/SimpleFarmGrid.tsx`

- `MOBILE_LAYOUT.plotSize`: `92 -> 96`
- `TABLET_LAYOUT.plotSize`: `104 -> 110`
- `DESKTOP_LAYOUT.plotSize`: `120 -> 128`
- `sceneTopPadding` 系数：
  - mobile: `1.88 -> 2.08`
  - desktop/tablet: `1.72 -> 1.9`
- `sceneBottomPadding` 系数：
  - mobile: `0.68 -> 0.62`
  - desktop/tablet: `0.6 -> 0.56`

## 锚点偏差阈值说明

本轮验收采用“构图锚点相对偏差阈值”：

- A1/A2（sun/mainCloud）: 偏差 <= 8% 视口宽高
- A3/A4（leftHouse/rightBarn）: 偏差 <= 10% 视口宽高
- A5（plotClusterCenter）: 偏差 <= 6% 视口宽高

说明：本 Task 目标是先收敛主构图关系，阈值按视觉一眼一致性设定，用于筛掉明显偏移。

## 三联对比生成

```bash
npm run compare:e001-t03
```

输出目录固定为：`artifacts/e-001-t-03/<runId>/`
