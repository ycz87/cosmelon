# E-001-T04 地块轮廓与排布对齐

## 本轮改动范围（严格）

仅调整地块外轮廓与 7 地块排布节奏：

- 地块轮廓（`IsometricPlotShell`）
- 地块间距（grid gap）
- 地块相对排布（slot 位移）

未改地块明暗材质，未改四角配景。

## 轮廓前后说明

文件：`src/components/farm/IsometricPlotShell.tsx`

- `topHeight`: `size * 0.60 -> size * 0.56`
- `depth`: `size * 0.14 -> size * 0.12`（最小值 `7 -> 6`）

效果：地块由“偏厚重”调整为“更贴近参考图的扁菱形体块”，外轮廓更轻、更规整。

## 排布前后说明

文件：`src/components/farm/SimpleFarmGrid.tsx`

- gap：
  - mobile `8 -> 6`
  - tablet `12 -> 10`
  - desktop `14 -> 12`
- 每个 slot 增加 `xOffset/yOffset` 微调，收敛中轴并压紧纵向节奏（保持 2-1-2-1-1 拓扑）。

效果：地块群中心更聚拢，行间节奏更稳定，减少“离散感”。

## 三联对比

```bash
npm run compare:e001-t04
```

输出：`artifacts/e-001-t04/<runId>/E-001-T04-compare-{desktop|mobile|detail}.png`
