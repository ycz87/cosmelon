# E-001-T16 返工第2轮差异清单（终版）

更新时间：2026-02-28 11:06 UTC
commit: `784fa47`

## 返工范围（仅 E-001-T16）
- 只处理“顶部融合”问题：去掉/弱化独立顶部层，让农场顶部信息并入西瓜时钟现有顶部体系。
- 不跨到 E-001-T17。

## 本轮改动

### 1) 去掉独立顶部层
- 移除九宫格上方那条独立的“额外顶层”构件（原先单独悬浮的顶栏感）。
- 保留围栏语义但回收到背景层（地平线一体化），不再形成视觉分层断裂。

### 2) 顶部信息融合到时钟顶部体系
- `FarmHudV2` 从悬浮小条改为贴顶整行（`top-0`）的轻量信息行。
- 用与页面顶部一致的弱分隔线、低对比背景、统一间距，让 HUD 看起来属于同一顶部体系，而不是额外盖板。

### 3) 保持九宫格主视觉
- 下调顶部占用后同步调整地块区 `paddingTop`，避免主画面被压缩。
- 移动端与桌面端都保持九宫格为第一视觉焦点。

### 4) 场景融合继续成立
- 围栏/建筑/树木以低存在感背景层保留，维持场景接地关系，不抢主体。

## 验收事实（proof）
- git: `784fa47`
- preview: `https://feature-e001-t16-r2.watermelon-clock.pages.dev/?farmReview=1&farmBoard=v2&v=784fa47`
- artifact: `/home/ycz87/.openclaw/workspace-coder/cosmelon/artifacts/e-001-t16/20260228-110315Z/`
  - desktop: `E-001-T16-compare-desktop.png`
  - mobile: `E-001-T16-compare-mobile.png`

## 改动文件
- `src/components/farm-v2/FarmPlotBoardV2.tsx`

## 验证命令
- `npm run build`
- `npm run compare:e001-t16`
- `npx wrangler pages deploy dist --project-name=watermelon-clock --branch=feature-e001-t16-r2 --commit-dirty=true`
