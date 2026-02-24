# E-001-T06 接地融合（阴影/遮挡/色温）

## 本轮范围

仅处理接触阴影、边缘遮挡、局部色温统一；未修改地块轮廓与构图，未调整角落配景尺寸。

## 接地规则说明

1. **阴影方向**：阴影整体沿右下轻微偏移（`cx` 由中心改为 `0.53~0.55 * size`），与场景受光方向一致。
2. **软硬层次**：保留两层软阴影（groundTint + shadow）叠加一层更实的接触阴影（contactShadow），边缘硬、外圈软，避免漂浮。
3. **透明度控制**：接触阴影 opacity 从 `0.72` 提升到 `0.78`，增强贴地感；外圈阴影维持较低透明度避免脏污。
4. **局部遮挡**：在左右侧面新增从上到下的 occlusion 渐变，压住底缘亮边，减少“贴片悬空”感。
5. **色温统一**：groundTint / shadow / contactShadow 统一到暖中性土色区间，避免地块与草地色温打架。

## 实施位置

文件：`src/components/farm/IsometricPlotShell.tsx`

- 调整 `PALETTES` 中 `shadow/groundTint/contactShadow`
- 新增 `occlusion` 渐变并叠加到左右侧面
- 调整 3 层阴影椭圆的 `cx` 与接触阴影透明度

## 三联对比

```bash
npm run compare:e001-t06
```

输出：`artifacts/e-001-t06/<runId>/E-001-T06-compare-{desktop|mobile|detail}.png`
