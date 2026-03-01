# E-001-T22 Step A R7 Diff Checklist (Final)

## Scope
- Task: E-001-T22 Step A R7（仅修中景断层）
- Branch: `feature/e002-t01-pixi-phase0-baseline`
- Artifact run: `20260301-234038Z`

## 本轮唯一代码改动
- File: `src/components/farm-v2/FarmPlotBoardV2.tsx`
- 变更：仅修复移动端（`useTightBackdrop`）天空与山丘层拼接断层。
  - 调整天空层高度：`27% -> 35%`（tight mobile）
  - 调整天空渐变末端颜色：改为在底部过渡到山丘起始色 `#d1ebc7`
- 目的：消除“庄园与天空之间横向缺口/色带断层”，保持连续自然过渡。

## 验收核对（390/360 首屏）
- 390x844：断层带消除，拼接连续；`bottomGap=15.0px`（R6 下移成果保持）
- 360x800：断层带消除，拼接连续；`bottomGap=18.3px`（无裁切，R6 成果保持）

## 不回退复核
- [x] R4 裁切修复保持
- [x] R4 外框融合保持
- [x] R5 位置语义保持
- [x] R6 九宫格下移成果保持
- [x] Step B 三类点击交互保持

## Artifact 清单
- 390/360 对比图：
  - `E-001-T22-R7-compare-mobile-390x844.png`
  - `E-001-T22-R7-compare-narrow-360x800.png`
- 断层修复标注图：
  - `E-001-T22-R7-seam-annotation-mobile-390x844.png`
  - `E-001-T22-R7-seam-annotation-narrow-360x800.png`
- 当前截图：
  - `E-001-T22-R7-current-mobile-390x844.png`
  - `E-001-T22-R7-current-narrow-360x800.png`
- 汇总：
  - `E-001-T22-R7-seam-summary.json`
- 终版清单：
  - `diff-checklist-final.md`

## Validation
- `npm run build` ✅
