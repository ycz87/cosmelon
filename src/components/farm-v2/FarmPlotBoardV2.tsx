import { useMemo } from 'react';
import type { Plot } from '../../types/farm';

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

  const tileSize = compactMode ? 'min(26vw, 120px)' : 'min(23vw, 132px)';
  const boardGap = compactMode ? 10 : 12;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #9bd8f6 0%, #a5e8ff 32%, #9ed07a 74%, #8bbd67 100%)' }}
    >
      <div className="mx-auto w-full px-3 pb-6 pt-4 sm:px-4">
        <div
          className="mx-auto grid grid-cols-3"
          data-testid="farm-plot-board-v2"
          style={{
            width: `calc(${tileSize} * 3 + ${boardGap * 2}px)`,
            gap: `${boardGap}px`,
          }}
        >
          {displaySlots.map((plot, index) => (
            <div
              key={`farm-v2-slot-${plot?.id ?? index}`}
              className="relative overflow-hidden rounded-[14px] border-[2.5px]"
              style={{
                width: tileSize,
                aspectRatio: '1 / 1',
                borderColor: '#7f4b2f',
                background: 'linear-gradient(160deg, #9b603c 0%, #77472f 100%)',
                boxShadow: '0 2px 0 rgba(66,40,27,0.32)',
              }}
            >
              <div
                className="absolute inset-[7px] rounded-[10px] border-2"
                style={{
                  borderColor: '#5f3624',
                  backgroundColor: '#7a4b33',
                }}
              >
                <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-[2px] p-[3px]">
                  {Array.from({ length: 9 }).map((_, cellIndex) => (
                    <span
                      key={`farm-v2-cell-${index}-${cellIndex}`}
                      className="rounded-[3px]"
                      style={{
                        backgroundColor: '#6e402d',
                        boxShadow: 'inset 0 1px 0 rgba(255,209,152,0.16)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
