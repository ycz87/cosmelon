# Epic: 产品打磨与优化

- **ID:** E-001
- **状态:** Done
- **目标:** 以参考图为基准完成农场地块视觉复刻，建立低返工的分步验收流程

## 本轮范围（P0）

- 农场地块参考图复刻（严格按参考图还原）

## 验收标准（本轮）

- [x] 10 个 Task 全部完成并有对应交付物
- [x] 每个 Task 都有「改动说明 + 三联对比图（desktop/mobile/detail）」
- [x] 终验评分达到 >= 85 分（构图 40 / 配色 30 / 细节 30）
- [x] 合并到 main 并完成版本号升级
- [x] 返工项 E-001-T11（地块间距与落位）验收通过

## Task 清单

| ID | Task | 状态 | 备注 |
|----|------|------|------|
| E-001-T01 | 基线冻结（参考图/视口/锚点） | Done | commit `fe05dc6`，验收通过 |
| E-001-T02 | 对比工具固定化（三联对比一键产出） | Done | commit `835102b`，验收通过 |
| E-001-T03 | 相机与构图对齐 | Done | commit `949387e`，验收通过 |
| E-001-T04 | 地块轮廓与排布对齐 | Done | commit `61dd4fd`，验收通过 |
| E-001-T05 | 地块明暗体积重建 | Done | commit `61fd5c6`，验收通过 |
| E-001-T06 | 接地融合（阴影/遮挡/色温） | Done | commit `a24a14a`，验收通过 |
| E-001-T07 | 四角配景比例与层级 | Done | commit `4f366be`，验收通过 |
| E-001-T08 | 手绘风格统一（去拼装感） | Done | commit `42cff9a`，验收通过 |
| E-001-T09 | 多端收口（桌面/移动） | Done | commit `92dfd7b`，验收通过 |
| E-001-T10 | 终验打分与发布收口 | Done | merge `3f479ae`（v0.60.0）验收通过 |
| E-001-T11 | 地块间距与落位返工 | Done | 终版 commit `141f0a4`（v0.61.3），验收通过 |

## 备注

- 主参考图：`/home/ycz87/.openclaw/workspace-coder/cosmelon/farm-plot-reference.jpg`
- 历史对比素材：仓库根目录 `farm-r7-*-reference-*.png` / `farm-r7-*-compare-*.png`
