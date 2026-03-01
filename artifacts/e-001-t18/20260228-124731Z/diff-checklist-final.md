# E-001-T18 第1轮差异清单（终版）

更新时间：2026-02-28 12:48 UTC
commit: `9f14fca`

## 本轮目标（仅两项）
1) 去掉地块区上方蓝色框层的独立切割感。
2) 缩小左右蓝色空隙，提升 9 块田地占比。

## 本轮完成项

### 1) 去顶部蓝框切割感
- 调整顶部 HUD 条：降低背景与边线对比度（更轻、更贴合背景），弱化“独立框层”观感。
- 保持顶部信息可读，但不再形成明显上方蓝色切割块。

### 2) 缩左右空隙，提升九宫格占比
- 放大地块区容器宽度：
  - mobile：`min(100vw, calc(100dvh - 260px), 446px)`
  - desktop：`min(66vw, 620px)`
- 收紧左右 padding：容器从 `px-2 sm:px-4` 收到 `px-0 sm:px-2`。
- 微调上下留白，保证 desktop/mobile 可读且地块维持第一视觉。

### 3) 入口与可读性保持不变
- “农场 -> 地块”默认直达 V2 逻辑保持（未回退 legacy 默认入口）。
- desktop/mobile 继续可读，图鉴/实验室导航不受本轮改动影响。

### 4) E-001-T18 对比链路接入
- compare 脚本新增 E-001-T18 分支（参考图、v2 路由、标注文案）。
- `package.json` 新增 `compare:e001-t18`。

## 验收事实（proof）
- git: `9f14fca`
- preview: `https://feature-e001-t18-r1.watermelon-clock.pages.dev/?v=9f14fca`
- artifact: `/home/ycz87/.openclaw/workspace-coder/cosmelon/artifacts/e-001-t18/20260228-124731Z/`
  - desktop: `E-001-T18-compare-desktop.png`
  - mobile: `E-001-T18-compare-mobile.png`

## 改动文件
- `src/components/farm-v2/FarmPlotBoardV2.tsx`
- `scripts/e001-t02-generate-triptych-compare.mjs`
- `package.json`

## 验证命令
- `npm run build`
- `npm run compare:e001-t18`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t18-r1 --commit-dirty=true`
