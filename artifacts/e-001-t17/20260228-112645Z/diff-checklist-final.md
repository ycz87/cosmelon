# E-001-T17 第1轮差异清单（终版）

更新时间：2026-02-28 11:33 UTC
commit: `622f2e1`

## 本轮目标
- 将西瓜时钟真实入口“农场 -> 地块”默认切到 V2 新界面，不再依赖 `farmBoard=v2` 临时参数。
- 保持图鉴/实验室等其他栏目入口不受影响。

## 本轮完成项

### 1) 真实入口替换到 V2
- 修改 `FarmPage` 的入口判定：
  - 默认直接使用 V2；
  - 仅在 URL 指定 `farmBoard=legacy` 时回退 Legacy（不对普通用户暴露默认入口）。
- 用户从主导航点击“🌱 农场”，再点击“🌱 地块”即可进入 V2。

### 2) 不影响其他栏目入口
- `SubTab`（地块/图鉴/实验室）结构未改，仅替换地块页承载组件。
- 图鉴、实验室入口与导航逻辑保持原行为。

### 3) 验收产物链路补齐
- compare 脚本扩展 `E-001-T17`，用于 desktop/mobile 对比产物。
- 新增入口链路截图脚本：`scripts/e001-t17-capture-entry-flow.mjs`。
- `package.json` 新增脚本：`compare:e001-t17`、`capture:e001-t17-entry`。

## 入口点击链路截图（desktop/mobile）
- desktop step1（主导航页）：`E-001-T17-entry-desktop-step1-main-tabs.png`
- desktop step2（点击农场->地块后进入 V2）：`E-001-T17-entry-desktop-step2-plots-v2.png`
- mobile step1（主导航页）：`E-001-T17-entry-mobile-step1-main-tabs.png`
- mobile step2（点击农场->地块后进入 V2）：`E-001-T17-entry-mobile-step2-plots-v2.png`

## 验收事实（proof）
- git: `622f2e1`
- preview: `https://feature-e001-t17-r1.watermelon-clock.pages.dev/?v=622f2e1`
- artifact: `/home/ycz87/.openclaw/workspace-coder/cosmelon/artifacts/e-001-t17/20260228-112645Z/`
  - compare: `E-001-T17-compare-desktop.png`、`E-001-T17-compare-mobile.png`
  - entry flow: `E-001-T17-entry-desktop-step1-main-tabs.png`、`E-001-T17-entry-desktop-step2-plots-v2.png`、`E-001-T17-entry-mobile-step1-main-tabs.png`、`E-001-T17-entry-mobile-step2-plots-v2.png`

## 改动文件
- `src/components/FarmPage.tsx`
- `scripts/e001-t02-generate-triptych-compare.mjs`
- `scripts/e001-t17-capture-entry-flow.mjs`
- `package.json`

## 验证命令
- `npm run build`
- `npm run compare:e001-t17`
- `npm run capture:e001-t17-entry -- --output-dir=/home/ycz87/.openclaw/workspace-coder/cosmelon/artifacts/e-001-t17/20260228-112645Z`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t17-r1 --commit-dirty=true`
