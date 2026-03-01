# E-001-T22 Step A R6 Diff Checklist (Final)

## Scope
- Task: E-001-T22 Step A R6（仅九宫格下移 + 田地下方空白优化）
- Branch: `feature/e002-t01-pixi-phase0-baseline`
- Artifact run: `20260301-111930Z`

## 本轮改动（仅此一项）

### 1) 下移九宫格整体锚点（优先移动端）
- 在移动竖屏口径（`useTightMobileSpacing`）下，对地块容器整体下移：
  - `transform: translateY(clamp(168px, 20vh, 184px))`
- 目的：压缩田地下方空白，并保证 R6 硬验收窗口（390x844 bottom gap 4~16px）。

## 硬验收结果
- 文件：`E-001-T22-R6-safezone-summary.json`
- `390x844`：
  - bottom gap = **13.3px**（满足 4~16px）
  - left/right/bottom 全 safe
- `360x800`：
  - bottom gap = **9.4px**
  - left/right/bottom 全 safe（无裁切）

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
