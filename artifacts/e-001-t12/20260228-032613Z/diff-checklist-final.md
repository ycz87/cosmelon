# E-001-T12 第1轮差异清单（终版）

更新时间：2026-02-28 03:30 UTC
commit: `ebef80d`

## 本轮完成项

### 1) 3x3 九宫格（9块）落地
- 农田展示从 7 块改为固定 9 块（3 列 x 3 行）。
- 预览态与默认态统一支持 9 块。
- 空地/幼苗/成熟4瓜组可同屏。

### 2) 存储与地块上限同步到 9
- `MAX_PLOT_COUNT` 调整为 9。
- `PLOT_MILESTONES` 调整为固定 9 块。
- 迁移逻辑从硬编码移除 `plots[7]/plots[8]` 改为通用切片。

### 3) E-001-T12 对比链路切换到新参考图
- 对比脚本新增 E-001-T12 分支：直接使用新参考图 `/home/ycz87/.openclaw/media/inbound/file_21---3f96fab5-a32c-497b-ad28-95a0ff5ead39.jpg` 生成对比图。
- 对比头部文案、标注图例针对 E-001-T12 更新。

## 本轮改动文件
- `src/components/farm/SimpleFarmGrid.tsx`
- `src/hooks/useFarmStorage.ts`
- `src/types/farm.ts`
- `scripts/e001-t02-generate-triptych-compare.mjs`

## 已知差距（仍需收敛）
- 当前主地块仍沿用旧土壤卡片样式，与新参考图的“深棕网格土块 + 2D线稿”存在明显风格差。
- HUD（顶部资源条）与底部工具栏尚未按新参考图复刻。
- 目前仅完成 3x3 与对比链路切换，视觉一致性还需继续打磨。

## 验证命令
- `npm run build`
- `node scripts/e001-t02-generate-triptych-compare.mjs --task-id=E-001-T12`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t12-r1 --commit-dirty=true`
