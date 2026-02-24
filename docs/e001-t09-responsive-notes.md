# E-001-T09 多端收口（桌面/移动）

## 本轮范围

仅处理 responsive 构图、安全区、裁切边界；未改素材风格。

## 桌面/移动差异说明

- **桌面（>=640）**
  - 保持原始 slot 偏移比例（`slotOffsetScale=1`）
  - 保持现有主构图节奏（top/bottom padding 不变）
  - 场景容器加宽缓冲 `+108`，防止边缘元素紧贴边界

- **移动（420~639）**
  - 保持视觉语义不变，轻微收敛位移（`slotOffsetScale=0.92`）
  - 纵向安全区微调（top `2.04x` / bottom `0.64x`）
  - 左右安全边距 `10px`，避免关键锚点贴边

- **小屏移动（<420）**
  - 启用紧凑布局：`plotSize=88`、`gap=5`
  - 位移缩放 `0.84`，防止地块群挤压导致裁切
  - 左右安全边距 `12px`，并上提/下放 padding 平衡可视区

## 核心锚点可见性结论

- 桌面与移动均保持 sun / mainCloud / leftHouse / rightBarn / plotClusterCenter 可见。
- 未改视觉风格参数（色彩、纹理、描边规则保持一致）。

## 三联对比

```bash
npm run compare:e001-t09
```

输出：`artifacts/e-001-t09/<runId>/E-001-T09-compare-{desktop|mobile|detail}.png`
