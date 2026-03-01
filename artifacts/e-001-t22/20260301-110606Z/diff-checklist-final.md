# E-001-T22 Step A R6 Diff Checklist (Final)

## Scope
- Task: E-001-T22 Step A R6（仅下移九宫格锚点）
- Branch: `feature/e002-t01-pixi-phase0-baseline`
- Artifact run: `20260301-110606Z`

## 本轮唯一改动

### 1) 下移九宫格整体锚点（优先移动端）
- 在窄竖屏口径（非 compact 的 `useTightMobileSpacing`）为地块容器增加统一 Y 轴下移：
  - `transform: translateY(clamp(168px, 20vh, 184px))`
- 目标：压缩田地下方空白，让 9 块田整体更贴近视口底边。

## 硬验收结果
- 文件：`E-001-T22-R6-safezone-summary.json`
- 390x844：
  - bottomGap = **13.3px**（满足 4~16px）
  - left/right/bottom 全部 safe
- 360x800：
  - bottomGap = **9.4px**（不裁切）
  - left/right/bottom 全部 safe

## 不回退复核
- [x] Step A R4 裁切修复与外框融合保持
- [x] Step A R5 田地/果树/庄园相对位置语义保持
- [x] Step B 三类点击交互保持

## Artifact 清单
- 对比图：
  - `E-001-T22-compare-desktop.png`
  - `E-001-T22-compare-mobile.png`
- 安全区标注：
  - `E-001-T22-R6-safezone-mobile-390x844.png`
  - `E-001-T22-R6-safezone-narrow-360x800.png`
- 口径截图：
  - `E-001-T22-R6-mobile-390x844.png`
  - `E-001-T22-R6-narrow-360x800.png`
- 汇总：
  - `E-001-T22-R6-safezone-summary.json`
- 终版清单：
  - `diff-checklist-final.md`

## Validation
- `npm run build` ✅
- `npm run compare:e001-t22` ✅
