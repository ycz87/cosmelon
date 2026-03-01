import { useMemo } from 'react';
import type { Plot } from '../../types/farm';
import { FarmPlotTileV2, mapPlotStateToTileState } from './FarmPlotTileV2';

type FarmBoardNavTarget = 'shed' | 'collection' | 'lab' | 'market';

interface FarmBoardNavLabels {
  shed: string;
  collection: string;
  lab: string;
  market: string;
}

interface FarmPlotBoardV2Props {
  plots: Plot[];
  compactMode?: boolean;
  todayFocusMinutes: number;
  coinBalance: number;
  plantableSeedCount: number;
  harvestablePlotCount: number;
  navLabels?: FarmBoardNavLabels;
  onNavigate?: (target: FarmBoardNavTarget) => void;
}

const GRID_SIDE = 3;
const TOTAL_PLOTS = GRID_SIDE * GRID_SIDE;
const MOTION_CLASS = 'farm-v2-motion';

const DEFAULT_NAV_LABELS: FarmBoardNavLabels = {
  shed: '瓜棚',
  collection: '图鉴',
  lab: '实验室',
  market: '商城',
};

function FarmHudV2({
  compactMode,
  todayFocusMinutes,
  coinBalance,
  plantableSeedCount,
  harvestablePlotCount,
}: {
  compactMode: boolean;
  todayFocusMinutes: number;
  coinBalance: number;
  plantableSeedCount: number;
  harvestablePlotCount: number;
}) {
  const badgeItems = [
    { icon: '⏱', label: `今日专注 ${todayFocusMinutes}m` },
    { icon: '🪙', label: `瓜币 ${coinBalance.toLocaleString()}` },
    { icon: '🌱', label: `可种 ${plantableSeedCount}` },
    { icon: '🍉', label: `可收 ${harvestablePlotCount}` },
  ];

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40">
      <div
        className="mx-auto flex h-10 w-full items-center justify-center gap-1.5 px-2 sm:h-11 sm:gap-2 sm:px-4"
        style={{
          maxWidth: compactMode ? '100%' : '940px',
          borderBottom: '1px solid rgba(103,146,177,0.2)',
          background: 'linear-gradient(180deg, rgba(171,220,244,0.42) 0%, rgba(171,220,244,0.08) 100%)',
        }}
      >
        {badgeItems.map((badge) => (
          <div
            key={`farm-v2-hud-${badge.label}`}
            className="flex items-center gap-1 rounded-full border px-2 py-[3px] text-[11px] font-semibold sm:px-3 sm:text-xs"
            style={{
              borderColor: '#b17d49',
              color: '#5d3a1f',
              background: 'linear-gradient(180deg, rgba(255,244,216,0.94) 0%, rgba(247,226,188,0.9) 100%)',
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

function FarmBottomBarV2({
  compactMode,
  labels,
  onNavigate,
}: {
  compactMode: boolean;
  labels: FarmBoardNavLabels;
  onNavigate?: (target: FarmBoardNavTarget) => void;
}) {
  const navButtons: Array<{ id: FarmBoardNavTarget; icon: string; label: string }> = [
    { id: 'shed', icon: '🏠', label: labels.shed },
    { id: 'collection', icon: '📖', label: labels.collection },
    { id: 'lab', icon: '🧪', label: labels.lab },
    { id: 'market', icon: '🏪', label: labels.market },
  ];

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
        <div className="grid grid-cols-4 gap-1 px-1.5 py-1.5">
          {navButtons.map((button) => (
            <button
              key={`farm-v2-nav-${button.id}`}
              type="button"
              className="rounded-[8px] border px-1 py-1 text-center text-[10px] font-semibold transition-transform duration-150 active:scale-95 sm:text-xs"
              style={{
                borderColor: '#8f5732',
                color: '#5d3117',
                background: 'linear-gradient(180deg, #f7df99 0%, #f0c46a 100%)',
              }}
              onClick={() => onNavigate?.(button.id)}
            >
              <span className="mr-1">{button.icon}</span>
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CloudCluster({
  top,
  left,
  right,
  width,
  height,
  opacity,
  duration,
  delay,
}: {
  top: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  opacity: number;
  duration: string;
  delay: string;
}) {
  return (
    <div
      className={`absolute z-[8] ${MOTION_CLASS}`}
      style={{
        top,
        left,
        right,
        width,
        height,
        opacity,
        animation: `farmV2CloudDrift ${duration} ease-in-out ${delay} infinite`,
      }}
    >
      <div className="absolute inset-x-[8%] bottom-[6%] top-[32%] rounded-full bg-white/68" />
      <div className="absolute left-[2%] top-[30%] h-[48%] w-[38%] rounded-full bg-white/76" />
      <div className="absolute right-[4%] top-[16%] h-[56%] w-[46%] rounded-full bg-white/78" />
      <div className="absolute left-[32%] top-[2%] h-[54%] w-[40%] rounded-full bg-white/82" />
    </div>
  );
}

function FarmBackdropV2({ compactMode }: { compactMode: boolean }) {
  const skyHeight = compactMode ? '26%' : '25%';
  const middleTop = compactMode ? '26%' : '25%';
  const middleHeight = compactMode ? '15%' : '15%';
  const fieldTop = compactMode ? '41%' : '40%';

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 z-[1]"
        style={{
          height: skyHeight,
          background: 'linear-gradient(180deg, #8bcff2 0%, #b0e5f8 58%, #caeef8 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 z-[2]"
        style={{
          top: middleTop,
          height: middleHeight,
          background:
            'linear-gradient(180deg, rgba(176,215,165,0.66) 0%, rgba(157,198,136,0.76) 100%), radial-gradient(circle at 18% 88%, rgba(118,173,89,0.64) 0%, rgba(0,0,0,0) 54%), radial-gradient(circle at 82% 86%, rgba(109,164,79,0.62) 0%, rgba(0,0,0,0) 54%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[1]"
        style={{
          top: fieldTop,
          background: 'linear-gradient(180deg, #aee39f 0%, #98d374 46%, #89c760 100%)',
        }}
      />

      <div
        className={`absolute z-[6] rounded-full ${MOTION_CLASS}`}
        style={{
          top: compactMode ? '4.8%' : '4.4%',
          right: compactMode ? '11%' : '13%',
          width: compactMode ? '78px' : '96px',
          height: compactMode ? '78px' : '96px',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,243,178,0.2) 0%, rgba(255,209,106,0.34) 48%, rgba(255,179,80,0) 100%)',
          animation: 'farmV2SunHalo 5.6s ease-in-out -0.8s infinite',
        }}
      />
      <div
        className={`absolute z-[7] rounded-full ${MOTION_CLASS}`}
        style={{
          top: compactMode ? '6.6%' : '6.2%',
          right: compactMode ? '13.2%' : '14.8%',
          width: compactMode ? '44px' : '54px',
          height: compactMode ? '44px' : '54px',
          background: 'radial-gradient(circle at 35% 30%, #fff2b0 0%, #ffd56f 60%, #f0a640 100%)',
          boxShadow: '0 0 0 2px rgba(255,215,124,0.34), 0 0 22px rgba(255,202,94,0.46)',
          animation: 'farmV2SunFloat 7.8s ease-in-out -1.2s infinite',
        }}
      />

      <CloudCluster top="3%" left="6%" width="22%" height="10%" opacity={0.88} duration="13s" delay="-0.8s" />
      <CloudCluster top="8%" left="32%" width="20%" height="10%" opacity={0.82} duration="16s" delay="-2.4s" />
      <CloudCluster top="4%" right="6%" width="24%" height="11%" opacity={0.86} duration="14s" delay="-1.8s" />

      <div
        className="absolute z-[4] rounded-full"
        style={{
          left: compactMode ? '-4%' : '2%',
          top: compactMode ? '24%' : '23%',
          width: compactMode ? '48%' : '34%',
          height: compactMode ? '13%' : '11%',
          background: 'radial-gradient(circle at 55% 50%, rgba(153,194,116,0.62) 0%, rgba(110,159,82,0.78) 100%)',
        }}
      />
      <div
        className="absolute z-[4] rounded-full"
        style={{
          right: compactMode ? '-5%' : '4%',
          top: compactMode ? '25%' : '24%',
          width: compactMode ? '44%' : '30%',
          height: compactMode ? '13%' : '10%',
          background: 'radial-gradient(circle at 45% 50%, rgba(155,199,118,0.6) 0%, rgba(113,162,80,0.78) 100%)',
        }}
      />

      <div
        className="absolute z-[5]"
        style={{
          top: compactMode ? '27%' : '26%',
          left: '50%',
          width: compactMode ? '48%' : '34%',
          height: compactMode ? '13%' : '12%',
          transform: 'translateX(-50%)',
          clipPath: 'polygon(45% 0%, 55% 0%, 81% 100%, 19% 100%)',
          background: 'linear-gradient(180deg, rgba(230,202,141,0.78) 0%, rgba(191,145,96,0.78) 100%)',
        }}
      />

      <div
        className="absolute left-[7%] right-[7%] z-[6] rounded-full"
        style={{
          top: compactMode ? '38.8%' : '38%',
          height: compactMode ? '14px' : '16px',
          background: 'linear-gradient(180deg, rgba(207,149,99,0.46) 0%, rgba(167,111,68,0.52) 100%)',
        }}
      />
      <div
        className="absolute left-[8%] right-[8%] z-[7]"
        style={{
          top: compactMode ? '39.5%' : '38.9%',
          height: compactMode ? '6px' : '7px',
          opacity: 0.62,
          background:
            'repeating-linear-gradient(90deg, rgba(126,73,41,0.84) 0px, rgba(126,73,41,0.84) 5px, rgba(0,0,0,0) 5px, rgba(0,0,0,0) 14px)',
        }}
      />

      <div
        className="absolute z-[7] rounded-[12px]"
        style={{
          top: compactMode ? '33.4%' : '32.8%',
          left: '6%',
          width: compactMode ? '48px' : '60px',
          height: compactMode ? '34px' : '42px',
          opacity: 0.78,
          background: 'linear-gradient(180deg, rgba(212,155,104,0.66) 0%, rgba(188,121,75,0.75) 100%)',
          border: '1px solid rgba(136,84,51,0.62)',
        }}
      />
      <div
        className="absolute z-[7] rounded-full"
        style={{
          top: compactMode ? '31.2%' : '30.4%',
          right: '7%',
          width: compactMode ? '70px' : '84px',
          height: compactMode ? '58px' : '68px',
          opacity: 0.76,
          background: 'radial-gradient(circle at 40% 45%, rgba(125,194,88,0.86) 0%, rgba(87,150,63,0.94) 100%)',
        }}
      />

      <div
        className="absolute inset-x-0 z-[2]"
        style={{
          top: compactMode ? '52%' : '50%',
          height: compactMode ? '18%' : '20%',
          background: 'linear-gradient(180deg, rgba(182,223,156,0.5) 0%, rgba(141,199,104,0.44) 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 z-[2]"
        style={{
          top: compactMode ? '62%' : '60%',
          height: compactMode ? '38%' : '40%',
          background:
            'linear-gradient(180deg, rgba(158,212,119,0.3) 0%, rgba(131,194,86,0.5) 100%), repeating-linear-gradient(0deg, rgba(123,182,78,0.08) 0px, rgba(123,182,78,0.08) 22px, rgba(0,0,0,0) 22px, rgba(0,0,0,0) 56px)',
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

export function FarmPlotBoardV2({
  plots,
  compactMode = false,
  todayFocusMinutes,
  coinBalance,
  plantableSeedCount,
  harvestablePlotCount,
  navLabels,
  onNavigate,
}: FarmPlotBoardV2Props) {
  const displaySlots = useMemo(
    () => Array.from({ length: TOTAL_PLOTS }, (_, index) => plots[index] ?? null),
    [plots],
  );

  const boardWidth = compactMode
    ? 'min(96vw, 480px)'
    : 'min(90vw, 860px)';
  const boardGap = compactMode ? 'clamp(6px, 1vw, 9px)' : 'clamp(8px, 0.8vw, 11px)';

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: compactMode ? '100dvh' : 'min(100dvh, 760px)',
        isolation: 'isolate',
        background: 'linear-gradient(180deg, #8dd1f3 0%, #a8e3f8 34%, #b2e8a5 56%, #99d376 78%, #8bc665 100%)',
      }}
    >
      <FarmBackdropV2 compactMode={compactMode} />
      <FarmHudV2
        compactMode={compactMode}
        todayFocusMinutes={todayFocusMinutes}
        coinBalance={coinBalance}
        plantableSeedCount={plantableSeedCount}
        harvestablePlotCount={harvestablePlotCount}
      />

      <div
        className="relative z-20 mx-auto flex w-full justify-center px-0 sm:px-2"
        style={{
          paddingTop: compactMode ? 'clamp(166px, 31vh, 210px)' : 'clamp(150px, 23vh, 206px)',
          paddingBottom: compactMode ? 'clamp(106px, 15vh, 132px)' : 'clamp(104px, 13vh, 132px)',
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
              transform: compactMode
                ? 'perspective(1100px) rotateX(7deg)'
                : 'perspective(1400px) rotateX(8deg)',
              transformOrigin: '50% 28%',
              filter: 'drop-shadow(0 11px 14px rgba(46,72,27,0.24))',
            }}
          >
            {displaySlots.map((plot, index) => (
              <div
                key={`farm-v2-slot-${plot?.id ?? index}`}
                style={{
                  transform: `translateY(${Math.floor(index / GRID_SIDE) * (compactMode ? 1.5 : 2.2)}px)`,
                }}
              >
                <FarmPlotTileV2 state={mapPlotStateToTileState(plot)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <FarmBottomBarV2
        compactMode={compactMode}
        labels={navLabels ?? DEFAULT_NAV_LABELS}
        onNavigate={onNavigate}
      />
    </div>
  );
}
