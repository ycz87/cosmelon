# PROJECT_FASTSTART

给 `codex` / `claude` 的启动快照（每次开工先读本文件）。

## 项目概况
- 仓库目录：`/home/ycz87/.openclaw/workspace-coder/cosmelon`
- 项目名：`pomodoro`
- 当前版本：`0.61.4`
- 技术栈：React 19 + TypeScript + Vite + Tailwind + PWA

## 关键目录
- `src/`：前端主代码
- `src/components/`：页面和组件（农场相关在 `src/components/farm/`）
- `scripts/`：辅助脚本（含 E-001-T11 对比图脚本）
- `artifacts/`：验收产物与对比图
- `baseline/`：参考基线图

## E-001-T11 高频修改文件
- `src/components/farm/SimpleFarmGrid.tsx`
- `src/components/farm/FarmDecorations.tsx`
- `src/components/farm/IsometricPlotShell.tsx`

## 常用命令
- 开发：`npm run dev`
- 构建：`npm run build`
- 对比图：`npm run compare:e001-t11`
- 预览部署：`npx wrangler pages deploy dist --project-name=watermelon-clock --branch=<branch> --commit-dirty=true`

## 启动约束（给工具）
- 先读：`PROJECT_FASTSTART.md`、`CURRENT_STATE.md`、`CHANGE_CONTEXT.md`
- 然后直接执行任务（不需要额外回执）
