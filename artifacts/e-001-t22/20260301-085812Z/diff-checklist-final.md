# E-001-T22 Step A R4 Diff Checklist (Final)

## Scope
- Task: E-001-T22 Step A R4（仅此步返工）
- Branch: `feature/e002-t01-pixi-phase0-baseline`
- Artifact run: `20260301-085812Z`

## Charles 反馈三项修正

### 1) 移动端最下排底部裁切
- 已修复：最下排地块完整可见，不再被底部裁切。
- 证据：
  - `E-001-T22-R4-mobile-390x844.png`
  - `E-001-T22-R4-safezone-mobile-390x844.png`

### 2) 竖屏缩窄时左右端裁切
- 已修复：窄屏口径左右端地块完整可见。
- 验证口径：`360x800`
- 证据：
  - `E-001-T22-R4-narrow-360x800.png`
  - `E-001-T22-R4-safezone-narrow-360x800.png`

### 3) 去掉地块区“独立框”盒感，背景融合
- 已修复：移动端 V2 农场容器改为与页面背景直接融合，去掉独立框观感边界。
- 主要策略：
  - 窄屏下农场容器横向外扩以消除盒边感；
  - V2 根容器在窄屏下使用 `overflow-visible`，避免边缘硬裁切造成“框住”观感。

## 裁切安全区量测
- 文件：`E-001-T22-R4-safezone-summary.json`
- `390x844`：left/right/bottom 全部 safe，PASS
- `360x800`：left/right/bottom 全部 safe，PASS

## 不回退复核
- [x] Step A R2/R3 背景与留白优化保留
- [x] Step B 三类点击交互保留（空地种植 / 生长看进度 / 成熟收获）

## Artifact 清单
- 对比图：
  - `E-001-T22-compare-mobile.png`
  - `E-001-T22-compare-desktop.png`
- 口径截图：
  - `E-001-T22-R4-mobile-390x844.png`
  - `E-001-T22-R4-narrow-360x800.png`
- 裁切安全区标注：
  - `E-001-T22-R4-safezone-mobile-390x844.png`
  - `E-001-T22-R4-safezone-narrow-360x800.png`
  - `E-001-T22-R4-safezone-summary.json`
- 终版清单：
  - `diff-checklist-final.md`

## Validation
- `npm run build` ✅
- `npm run compare:e001-t22` ✅
- `npm run capture:e001-t22-interactions -- --output-dir=.../20260301-085812Z` ✅
