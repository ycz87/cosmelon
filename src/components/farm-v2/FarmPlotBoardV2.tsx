import { useMemo } from 'react';
import type { Plot } from '../../types/farm';
import { FarmPlotTileV2, mapPlotStateToTileState } from './FarmPlotTileV2';

interface FarmPlotBoardV2Props {
  plots: Plot[];
  compactMode?: boolean;
}

const GRID_SIDE = 3;
const TOTAL_PLOTS = GRID_SIDE * GRID_SIDE;

export function FarmPlotBoardV2({ plots, compactMode = false }: FarmPlotBoardV2Props) {
  const displaySlots = useMemo(
    () => Array.from({ length: TOTAL_PLOTS }, (_, index) => plots[index] ?? null),
    [plots],
  );

  const boardWidth = compactMode ? 'min(92vw, 620px)' : 'min(76vw, 640px)';
  const boardGap = compactMode ? 'clamp(8px, 1.2vw, 12px)' : 'clamp(10px, 1vw, 14px)';
  const boardPaddingClass = compactMode
    ? 'pt-[152px] pb-4 sm:pt-16 sm:pb-6'
    : 'pt-12 pb-10 sm:pt-14 sm:pb-12';

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: compactMode ? '100dvh' : 'min(100dvh, 760px)',
        background: 'linear-gradient(180deg, #9bd8f6 0%, #a5e8ff 34%, #9ed07a 74%, #8bbd67 100%)',
      }}
    >
      <div className={`mx-auto flex w-full justify-center px-3 sm:px-4 ${boardPaddingClass}`}>
        <div
          className="grid grid-cols-3"
          data-testid="farm-plot-board-v2"
          style={{
            width: boardWidth,
            gap: boardGap,
          }}
        >
          {displaySlots.map((plot, index) => (
            <div key={`farm-v2-slot-${plot?.id ?? index}`}>
              <FarmPlotTileV2 state={mapPlotStateToTileState(plot)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
