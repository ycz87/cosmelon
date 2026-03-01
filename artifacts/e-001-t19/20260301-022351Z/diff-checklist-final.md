# E-001-T19 R2 Diff Checklist (Final)

## Scope
- Task: E-001-T19 (rework R2, visual isomorphism priority)
- Branch: `feature/e002-t01-pixi-phase0-baseline`
- Compare run: `20260301-022351Z`

## Implemented changes
1. **Farm tab ambient continuity (remove black separation feeling)**
   - Farm tab now forces a sky-blue page background so header and scene stay visually continuous.
   - File: `src/App.tsx`

2. **Sub-tab bar and spacing softened for V2 default entry**
   - Added a gentler top spacing/background mode when V2 board is active and not in compact review shell.
   - Reduced top padding around sub-tabs and farm scene for tighter first-screen composition.
   - File: `src/components/FarmPage.tsx`

3. **9-grid board footprint increased (desktop)**
   - Expanded board width from `min(86vw,760px)` to `min(90vw,820px)`.
   - Slightly tightened board gaps and reduced top/bottom paddings to push the 9 plots more into first visual focus.
   - File: `src/components/farm-v2/FarmPlotBoardV2.tsx`

## Acceptance check mapping (E-001-T19)
- [x] Red boxed info strip remains removed.
- [x] Left-right board margins are further narrowed vs R1 baseline.
- [x] Desktop/mobile both keep 3x3 board as first visual focus with readable tiles.
- [x] Entry route remains unchanged: `Farm -> Plots` defaults to V2.

## Artifacts
- `E-001-T19-current-desktop.png`
- `E-001-T19-current-mobile.png`
- `E-001-T19-compare-desktop.png`
- `E-001-T19-compare-mobile.png`
- `E-001-T19-summary.json`

## Validation
- `npm run build` ✅
- `npm run compare:e001-t19` ✅
