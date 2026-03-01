import { useMemo } from 'react';
import type { Plot } from '../../types/farm';
import { FarmPlotTileV2, mapPlotStateToTileState } from './FarmPlotTileV2';

interface FarmPlotBoardV2Props {
  plots: Plot[];
  compactMode?: boolean;
}

const GRID_SIDE = 3;
const TOTAL_PLOTS = GRID_SIDE * GRID_SIDE;

function FarmHudV2({ compactMode }: { compactMode: boolean }) {
  const badgeItems = [
    { icon: '🏅', label: compactMode ? 'Lv12' : 'Level 12' },
    { icon: '🪙', label: '1,580' },
    { icon: '💎', label: '75' },
    { icon: '❤️', label: compactMode ? '4' : 'Life 4' },
  ];

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40">
      <div
        className="mx-auto flex h-10 w-full items-center justify-center gap-1.5 px-2 sm:h-11 sm:gap-2 sm:px-4"
        style={{
          maxWidth: compactMode ? '100%' : '920px',
          borderBottom: '1px solid rgba(103,146,177,0.22)',
          background: 'linear-gradient(180deg, rgba(166,219,245,0.34) 0%, rgba(166,219,245,0.04) 100%)',
        }}
      >
        {badgeItems.map((badge) => (
          <div
            key={`farm-v2-hud-${badge.label}`}
            className="flex items-center gap-1 rounded-full border px-2 py-[3px] text-[11px] font-semibold sm:px-3 sm:text-xs"
            style={{
              borderColor: '#b17d49',
              color: '#5d3a1f',
              background: 'linear-gradient(180deg, rgba(255,244,216,0.93) 0%, rgba(247,226,188,0.9) 100%)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.34) inset',
            }}
          >
            <span>{badge.icon}</span>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FarmBottomBarV2({ compactMode }: { compactMode: boolean }) {
  const toolButtons = [
    { icon: '💧', label: 'Water' },
    { icon: '🌱', label: 'Seed' },
    { icon: '🧤', label: 'Care' },
    { icon: '🧺', label: 'Bag' },
  ];
  const navButtons = ['Shop', 'Bag', 'Tasks', 'Social'];

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 px-2 pb-2 sm:px-4 sm:pb-3">
      <div
        className="mx-auto overflow-hidden rounded-[14px] border-[2px]"
        style={{
          width: compactMode ? 'min(96vw, 420px)' : 'min(72vw, 620px)',
          borderColor: '#8f5a34',
          background: 'linear-gradient(180deg, #d89c67 0%, #c07845 100%)',
          boxShadow: '0 -1px 0 rgba(255,255,255,0.24) inset, 0 3px 12px rgba(47,27,12,0.2)',
        }}
      >
        <div
          className="flex items-center justify-center gap-1.5 px-2 py-2 sm:gap-2"
          style={{
            borderBottom: '2px solid rgba(126,74,42,0.58)',
            background: 'linear-gradient(180deg, rgba(247,209,156,0.46) 0%, rgba(221,155,101,0.3) 100%)',
          }}
        >
          {toolButtons.map((button) => (
            <div
              key={`farm-v2-tool-${button.label}`}
              className="grid h-9 w-9 place-items-center rounded-[10px] border text-xs sm:h-10 sm:w-10"
              style={{
                borderColor: '#9b6037',
                color: '#5a361a',
                background: 'linear-gradient(180deg, #f7e8c4 0%, #edd2a2 100%)',
              }}
            >
              <span>{button.icon}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1 px-1.5 py-1.5">
          {navButtons.map((label, index) => (
            <div
              key={`farm-v2-nav-${label}`}
              className="rounded-[8px] border px-1 py-1 text-center text-[10px] font-semibold sm:text-xs"
              style={{
                borderColor: '#8f5732',
                color: index === 0 ? '#5d3117' : '#6f4829',
                background: index === 0
                  ? 'linear-gradient(180deg, #f7df99 0%, #f0c46a 100%)'
                  : 'linear-gradient(180deg, #f0ce9f 0%, #dfae75 100%)',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FarmBackdropV2({ compactMode }: { compactMode: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -top-3 left-[7%] h-9 w-20 rounded-full bg-white/60" />
      <div className="absolute top-4 left-[14%] h-7 w-16 rounded-full bg-white/76" />
      <div className="absolute top-5 right-[10%] h-9 w-20 rounded-full bg-white/70" />
      <div className="absolute top-1 right-[16%] h-6 w-14 rounded-full bg-white/52" />

      <div
        className="absolute rounded-full"
        style={{
          top: compactMode ? '16%' : '14%',
          right: compactMode ? '18%' : '20%',
          width: compactMode ? '58px' : '72px',
          height: compactMode ? '58px' : '72px',
          background: 'radial-gradient(circle at 35% 35%, #ffe79a 0%, #f8c35a 64%, #e39a3f 100%)',
          boxShadow: '0 0 0 10px rgba(248,212,118,0.14)',
        }}
      />

      <div
        className="absolute inset-x-0"
        style={{
          top: compactMode ? '26%' : '24%',
          height: compactMode ? '20%' : '18%',
          background:
            'linear-gradient(180deg, rgba(177,213,152,0.46) 0%, rgba(142,192,112,0.38) 100%), radial-gradient(circle at 18% 86%, rgba(110,168,83,0.42) 0%, rgba(0,0,0,0) 48%), radial-gradient(circle at 80% 90%, rgba(98,154,74,0.38) 0%, rgba(0,0,0,0) 50%)',
        }}
      />

      <div
        className="absolute left-[6%] right-[6%] z-[3] rounded-full"
        style={{
          top: compactMode ? '41.5%' : '39%',
          height: compactMode ? '14px' : '16px',
          background: 'linear-gradient(180deg, rgba(206,151,102,0.42) 0%, rgba(167,112,70,0.5) 100%)',
        }}
      />
      <div
        className="absolute left-[8%] right-[8%] z-[4]"
        style={{
          top: compactMode ? '42.1%' : '39.7%',
          height: compactMode ? '6px' : '7px',
          opacity: 0.6,
          background:
            'repeating-linear-gradient(90deg, rgba(128,75,43,0.84) 0px, rgba(128,75,43,0.84) 5px, rgba(0,0,0,0) 5px, rgba(0,0,0,0) 14px)',
        }}
      />

      <div
        className="absolute z-[2] rounded-[12px]"
        style={{
          top: compactMode ? '35.5%' : '33%',
          left: '6%',
          width: compactMode ? '48px' : '60px',
          height: compactMode ? '34px' : '42px',
          opacity: 0.78,
          background: 'linear-gradient(180deg, rgba(211,154,104,0.66) 0%, rgba(187,121,75,0.75) 100%)',
          border: '1px solid rgba(136,84,51,0.62)',
        }}
      />
      <div
        className="absolute z-[2] rounded-full"
        style={{
          top: compactMode ? '33%' : '30%',
          right: '7%',
          width: compactMode ? '68px' : '82px',
          height: compactMode ? '56px' : '66px',
          opacity: 0.76,
          background: 'radial-gradient(circle at 40% 45%, rgba(124,191,86,0.86) 0%, rgba(88,151,64,0.94) 100%)',
        }}
      />

      <div
        className="absolute inset-x-0"
        style={{
          top: compactMode ? '44%' : '41.2%',
          height: compactMode ? '24%' : '22%',
          background: 'linear-gradient(180deg, rgba(181,222,155,0.5) 0%, rgba(141,199,104,0.44) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0"
        style={{
          top: compactMode ? '55%' : '52%',
          height: compactMode ? '45%' : '48%',
          background:
            'linear-gradient(180deg, rgba(157,211,118,0.28) 0%, rgba(130,194,86,0.46) 100%), repeating-linear-gradient(0deg, rgba(124,184,79,0.08) 0px, rgba(124,184,79,0.08) 22px, rgba(0,0,0,0) 22px, rgba(0,0,0,0) 56px)',
        }}
      />
    </div>
  );
}

function FarmBoardSceneDecorV2({ compactMode }: { compactMode: boolean }) {
  return (
    <>
      <div
        className="pointer-events-none absolute z-0 rounded-[12px] border"
        style={{
          top: compactMode ? '10px' : '2px',
          left: compactMode ? '-10px' : '-32px',
          width: compactMode ? '50px' : '62px',
          height: compactMode ? '36px' : '42px',
          opacity: 0.72,
          borderColor: 'rgba(131,81,48,0.62)',
          background: 'linear-gradient(180deg, rgba(243,211,158,0.72) 0%, rgba(206,149,99,0.78) 100%)',
        }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: compactMode ? '-15px' : '-18px',
            width: compactMode ? '34px' : '42px',
            height: compactMode ? '18px' : '22px',
            clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
            background: 'linear-gradient(180deg, rgba(204,121,80,0.85) 0%, rgba(165,77,45,0.88) 100%)',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: compactMode ? '-8px' : '-12px',
          right: compactMode ? '-10px' : '-30px',
          width: compactMode ? '56px' : '66px',
          height: compactMode ? '56px' : '66px',
          opacity: 0.78,
        }}
      >
        <div
          className="absolute bottom-0 left-1/2 h-4 w-2 -translate-x-1/2 rounded-full"
          style={{ backgroundColor: '#7c5635' }}
        />
        <div className="absolute left-0 top-2 h-7 w-7 rounded-full bg-[#85c364]" />
        <div className="absolute right-0 top-3 h-7 w-7 rounded-full bg-[#78b856]" />
        <div className="absolute left-[12px] top-[18px] h-8 w-8 rounded-full bg-[#69a54a]" />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 z-10 h-10 -translate-x-1/2 rounded-[999px]"
        style={{
          bottom: compactMode ? '-18px' : '-20px',
          width: compactMode ? 'calc(100% + 40px)' : 'calc(100% + 120px)',
          background: 'radial-gradient(circle at center, rgba(88,128,54,0.58) 0%, rgba(88,128,54,0.2) 56%, rgba(88,128,54,0) 100%)',
        }}
      />
    </>
  );
}

export function FarmPlotBoardV2({ plots, compactMode = false }: FarmPlotBoardV2Props) {
  const displaySlots = useMemo(
    () => Array.from({ length: TOTAL_PLOTS }, (_, index) => plots[index] ?? null),
    [plots],
  );

  const boardWidth = compactMode
    ? 'min(100vw, calc(100dvh - 260px), 446px)'
    : 'min(90vw, 820px)';
  const boardGap = compactMode ? 'clamp(6px, 1vw, 9px)' : 'clamp(8px, 0.85vw, 11px)';

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: compactMode ? '100dvh' : 'min(100dvh, 760px)',
        background: 'linear-gradient(180deg, #9bd8f6 0%, #a5e8ff 34%, #9ed07a 74%, #8bbd67 100%)',
      }}
    >
      <FarmBackdropV2 compactMode={compactMode} />
      <FarmHudV2 compactMode={compactMode} />

      <div
        className="relative z-20 mx-auto flex w-full justify-center px-0 sm:px-2"
        style={{
          paddingTop: compactMode ? 'clamp(146px, 30vh, 184px)' : 'clamp(92px, 15vh, 136px)',
          paddingBottom: compactMode ? 'clamp(100px, 14vh, 124px)' : 'clamp(104px, 13vh, 132px)',
        }}
      >
        <div className="relative" style={{ width: boardWidth }}>
          <FarmBoardSceneDecorV2 compactMode={compactMode} />
          <div
            className="relative z-20 grid grid-cols-3"
            data-testid="farm-plot-board-v2"
            style={{
              width: '100%',
              gap: boardGap,
              filter: 'drop-shadow(0 10px 12px rgba(46,72,27,0.24))',
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

      <FarmBottomBarV2 compactMode={compactMode} />
    </div>
  );
}
