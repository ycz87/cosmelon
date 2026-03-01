import { useMemo } from 'react';
import type { Plot } from '../../types/farm';
import { FarmPlotTileV2, mapPlotStateToTileState } from './FarmPlotTileV2';

interface FarmPlotBoardV2Props {
  plots: Plot[];
  compactMode?: boolean;
  todayFocusMinutes: number;
  coinBalance: number;
  plantableSeedCount: number;
  harvestablePlotCount: number;
}

const GRID_SIDE = 3;
const TOTAL_PLOTS = GRID_SIDE * GRID_SIDE;
const MOTION_CLASS = 'farm-v2-motion';

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
          borderBottom: '1px solid rgba(100,145,175,0.22)',
          background: 'linear-gradient(180deg, rgba(167,217,242,0.42) 0%, rgba(167,217,242,0.08) 100%)',
        }}
      >
        {badgeItems.map((badge) => (
          <div
            key={`farm-v2-hud-${badge.label}`}
            className="flex items-center gap-1 rounded-full border px-2 py-[3px] text-[11px] font-semibold sm:px-3 sm:text-xs"
            style={{
              borderColor: '#b57d4a',
              color: '#5d3a1f',
              background: 'linear-gradient(180deg, rgba(255,244,216,0.95) 0%, rgba(247,226,188,0.9) 100%)',
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
      <div className="absolute inset-x-[8%] bottom-[6%] top-[32%] rounded-full bg-white/70" />
      <div className="absolute left-[2%] top-[30%] h-[48%] w-[38%] rounded-full bg-white/78" />
      <div className="absolute right-[4%] top-[16%] h-[56%] w-[46%] rounded-full bg-white/82" />
      <div className="absolute left-[32%] top-[2%] h-[54%] w-[40%] rounded-full bg-white/84" />
    </div>
  );
}

function FruitTree({
  left,
  right,
  top,
  scale = 1,
}: {
  left?: string;
  right?: string;
  top: string;
  scale?: number;
}) {
  const wrapperStyle = {
    left,
    right,
    top,
    width: `${62 * scale}px`,
    height: `${70 * scale}px`,
  };

  return (
    <div className="absolute z-[7]" style={wrapperStyle}>
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 rounded-full"
        style={{
          width: `${8 * scale}px`,
          height: `${28 * scale}px`,
          background: 'linear-gradient(180deg, #93613e 0%, #74482d 100%)',
        }}
      />
      <div
        className="absolute left-[8%] top-[16%] rounded-full"
        style={{
          width: `${30 * scale}px`,
          height: `${26 * scale}px`,
          background: 'radial-gradient(circle at 35% 30%, #98d26e 0%, #72b84f 100%)',
        }}
      />
      <div
        className="absolute right-[8%] top-[18%] rounded-full"
        style={{
          width: `${28 * scale}px`,
          height: `${24 * scale}px`,
          background: 'radial-gradient(circle at 30% 30%, #93cd67 0%, #6ab148 100%)',
        }}
      />
      <div
        className="absolute left-[26%] top-0 rounded-full"
        style={{
          width: `${30 * scale}px`,
          height: `${26 * scale}px`,
          background: 'radial-gradient(circle at 40% 30%, #9bda70 0%, #74bd52 100%)',
        }}
      />
      <div
        className="absolute"
        style={{ left: `${13 * scale}px`, top: `${18 * scale}px`, width: `${7 * scale}px`, height: `${7 * scale}px`, borderRadius: '999px', backgroundColor: '#ffbe55' }}
      />
      <div
        className="absolute"
        style={{ left: `${36 * scale}px`, top: `${12 * scale}px`, width: `${7 * scale}px`, height: `${7 * scale}px`, borderRadius: '999px', backgroundColor: '#ffbe55' }}
      />
      <div
        className="absolute"
        style={{ left: `${28 * scale}px`, top: `${28 * scale}px`, width: `${7 * scale}px`, height: `${7 * scale}px`, borderRadius: '999px', backgroundColor: '#ffbe55' }}
      />
    </div>
  );
}

function Cottage({ left, top }: { left: string; top: string }) {
  return (
    <div className="absolute z-[7]" style={{ left, top, width: '58px', height: '54px' }}>
      <div
        className="absolute left-1/2 top-0 h-[20px] w-[40px] -translate-x-1/2"
        style={{
          clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
          background: 'linear-gradient(180deg, #cb7f53 0%, #a85f38 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 h-[34px] w-[44px] -translate-x-1/2 rounded-[7px]"
        style={{ background: 'linear-gradient(180deg, #efd6ae 0%, #ddb682 100%)', border: '1px solid rgba(135,86,54,0.55)' }}
      />
      <div className="absolute bottom-[2px] left-1/2 h-[16px] w-[10px] -translate-x-1/2 rounded-[4px] bg-[#9a663f]" />
      <div className="absolute left-[13px] top-[24px] h-[8px] w-[8px] rounded-[3px] bg-[#a8d8f7]" />
      <div className="absolute right-[13px] top-[24px] h-[8px] w-[8px] rounded-[3px] bg-[#a8d8f7]" />
    </div>
  );
}

function FarmBackdropV2({ compactMode }: { compactMode: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Sky layer */}
      <div
        className="absolute inset-x-0 top-0 z-[1]"
        style={{
          height: compactMode ? '28%' : '27%',
          background: 'linear-gradient(180deg, #8fd4f6 0%, #b9e8fa 64%, #d8f3fb 100%)',
        }}
      />

      {/* Midground layer */}
      <div
        className="absolute inset-x-0 z-[2]"
        style={{
          top: compactMode ? '28%' : '27%',
          height: compactMode ? '16%' : '16%',
          background: 'linear-gradient(180deg, #cde9c5 0%, #b6dca6 40%, #9fcb87 100%)',
        }}
      />

      {/* Grass field layer */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1]"
        style={{
          top: compactMode ? '44%' : '43%',
          background: 'linear-gradient(180deg, #a9df91 0%, #96d171 45%, #89c761 100%)',
        }}
      />

      <div
        className={`absolute z-[6] rounded-full ${MOTION_CLASS}`}
        style={{
          top: compactMode ? '5%' : '4.5%',
          right: compactMode ? '12%' : '14%',
          width: compactMode ? '84px' : '98px',
          height: compactMode ? '84px' : '98px',
          background: 'radial-gradient(circle at 50% 50%, rgba(255,243,178,0.2) 0%, rgba(255,209,106,0.34) 48%, rgba(255,179,80,0) 100%)',
          animation: 'farmV2SunHalo 5.6s ease-in-out -0.8s infinite',
        }}
      />
      <div
        className={`absolute z-[7] rounded-full ${MOTION_CLASS}`}
        style={{
          top: compactMode ? '7.2%' : '6.8%',
          right: compactMode ? '14.4%' : '16%',
          width: compactMode ? '46px' : '56px',
          height: compactMode ? '46px' : '56px',
          background: 'radial-gradient(circle at 35% 30%, #fff2b0 0%, #ffd56f 60%, #f0a640 100%)',
          boxShadow: '0 0 0 2px rgba(255,215,124,0.34), 0 0 22px rgba(255,202,94,0.46)',
          animation: 'farmV2SunFloat 7.8s ease-in-out -1.2s infinite',
        }}
      />

      <CloudCluster top="3%" left="6%" width="22%" height="10%" opacity={0.9} duration="13s" delay="-0.8s" />
      <CloudCluster top="8%" left="34%" width="20%" height="10%" opacity={0.84} duration="16s" delay="-2.4s" />
      <CloudCluster top="4%" right="6%" width="24%" height="11%" opacity={0.88} duration="14s" delay="-1.8s" />

      <div
        className="absolute z-[4] rounded-full"
        style={{
          left: compactMode ? '-6%' : '0%',
          top: compactMode ? '29%' : '28%',
          width: compactMode ? '50%' : '38%',
          height: compactMode ? '15%' : '14%',
          background: 'radial-gradient(circle at 55% 50%, rgba(151,199,117,0.76) 0%, rgba(112,165,82,0.86) 100%)',
        }}
      />
      <div
        className="absolute z-[4] rounded-full"
        style={{
          right: compactMode ? '-5%' : '3%',
          top: compactMode ? '30%' : '29%',
          width: compactMode ? '45%' : '32%',
          height: compactMode ? '14%' : '13%',
          background: 'radial-gradient(circle at 45% 50%, rgba(153,201,119,0.74) 0%, rgba(113,164,80,0.86) 100%)',
        }}
      />

      <div
        className="absolute z-[5]"
        style={{
          top: compactMode ? '31%' : '30.2%',
          left: '50%',
          width: compactMode ? '42%' : '30%',
          height: compactMode ? '12%' : '11%',
          transform: 'translateX(-50%)',
          clipPath: 'polygon(46% 0%, 54% 0%, 80% 100%, 20% 100%)',
          background: 'linear-gradient(180deg, rgba(231,206,148,0.78) 0%, rgba(193,148,100,0.8) 100%)',
        }}
      />

      <Cottage left={compactMode ? '2.5%' : '8%'} top={compactMode ? '31%' : '30.6%'} />
      <FruitTree left={compactMode ? '74%' : '79%'} top={compactMode ? '30%' : '29.5%'} scale={compactMode ? 0.84 : 0.96} />
      <FruitTree left={compactMode ? '84%' : '86%'} top={compactMode ? '31.2%' : '31%'} scale={compactMode ? 0.7 : 0.8} />

      <div
        className="absolute left-[8%] right-[8%] z-[7]"
        style={{
          top: compactMode ? '41.2%' : '40.2%',
          height: compactMode ? '7px' : '8px',
          opacity: 0.66,
          background:
            'repeating-linear-gradient(90deg, rgba(126,73,41,0.86) 0px, rgba(126,73,41,0.86) 5px, rgba(0,0,0,0) 5px, rgba(0,0,0,0) 14px)',
        }}
      />

      <div
        className="absolute inset-x-0 z-[2]"
        style={{
          top: compactMode ? '56%' : '54%',
          height: compactMode ? '44%' : '46%',
          background:
            'linear-gradient(180deg, rgba(161,215,124,0.34) 0%, rgba(130,194,86,0.54) 100%), repeating-linear-gradient(0deg, rgba(123,182,78,0.08) 0px, rgba(123,182,78,0.08) 22px, rgba(0,0,0,0) 22px, rgba(0,0,0,0) 56px)',
        }}
      />
    </div>
  );
}

function FarmBoardSceneDecorV2({ compactMode }: { compactMode: boolean }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 z-10 h-10 -translate-x-1/2 rounded-[999px]"
      style={{
        bottom: compactMode ? '-18px' : '-20px',
        width: compactMode ? 'calc(100% + 56px)' : 'calc(100% + 140px)',
        background: 'radial-gradient(circle at center, rgba(83,128,55,0.58) 0%, rgba(88,128,54,0.22) 56%, rgba(88,128,54,0) 100%)',
      }}
    />
  );
}

export function FarmPlotBoardV2({
  plots,
  compactMode = false,
  todayFocusMinutes,
  coinBalance,
  plantableSeedCount,
  harvestablePlotCount,
}: FarmPlotBoardV2Props) {
  const displaySlots = useMemo(
    () => Array.from({ length: TOTAL_PLOTS }, (_, index) => plots[index] ?? null),
    [plots],
  );

  const boardWidth = compactMode
    ? 'min(96vw, 500px)'
    : 'min(92vw, 900px)';
  const boardGap = compactMode ? 'clamp(6px, 1vw, 9px)' : 'clamp(8px, 0.8vw, 11px)';

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: compactMode ? '100dvh' : 'min(100dvh, 760px)',
        isolation: 'isolate',
        background: 'linear-gradient(180deg, #90d6f6 0%, #bdeafd 38%, #b4e8a6 58%, #9ad577 80%, #8cc764 100%)',
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
          paddingTop: compactMode ? 'clamp(168px, 31vh, 214px)' : 'clamp(146px, 22vh, 200px)',
          paddingBottom: compactMode ? 'clamp(34px, 5vh, 56px)' : 'clamp(42px, 6vh, 70px)',
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
                  transform: `translateY(${Math.floor(index / GRID_SIDE) * (compactMode ? 2.4 : 3.2)}px)`,
                }}
              >
                <FarmPlotTileV2 state={mapPlotStateToTileState(plot)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
