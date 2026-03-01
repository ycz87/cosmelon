# E-001-T22 Step A R2 Diff Checklist (Final)

## Scope
- Task: E-001-T22 Step A R2 (仅本步返工)
- Branch: `feature/e002-t01-pixi-phase0-baseline`
- Compare run: `20260301-043816Z`

## Charles 反馈对应修正

### 1) 中景山丘带同构重做（连续一体层）
- 由“零散漂浮元素”改为连续山丘带：
  - 基底山丘带（整条连续）
  - 中央次层山丘（连续叠层）
  - 一体道路（中央）
  - 清晰栅栏（双横杆 + 立柱）
  - 小屋 + 果树嵌入山丘带（非悬浮）
- 文件：`src/components/farm-v2/FarmPlotBoardV2.tsx`

### 2) 压缩地块区下方留白（定量口径）
- 通过下调地块区 `paddingBottom`：
  - desktop: `clamp(12px, 2vh, 20px)`
  - mobile: `clamp(10px, 1.8vh, 16px)`
- 构图标注结果（见标注图）：
  - desktop 底部空白约 **2.0%**（要求 <= 6%）
  - mobile 底部空白约 **3.0%**（要求 <= 8%）
- 文件：`src/components/farm-v2/FarmPlotBoardV2.tsx`

## 保持不回退项
- [x] 底部重复业务入口条继续移除
- [x] 作物放大与精修继续保留（成熟瓜主体感保持）

## Artifact 清单
- 对比图：
  - `E-001-T22-compare-desktop.png`
  - `E-001-T22-compare-mobile.png`
- 构图标注图：
  - `E-001-T22-composition-annotation-desktop.png`
  - `E-001-T22-composition-annotation-mobile.png`
- 当前截图：
  - `E-001-T22-current-desktop.png`
  - `E-001-T22-current-mobile.png`
- 汇总：`E-001-T22-summary.json`
- 终版清单：`diff-checklist-final.md`

## Validation
- `npm run build` ✅
- `npm run compare:e001-t22` ✅
