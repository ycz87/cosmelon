/**
 * SimpleFarmGrid - 7-plot portrait farm scene with centered subject.
 *
 * Reuses PlotCard to keep all plot interactions and state logic unchanged.
 */
import { useEffect, useId, useMemo, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useI18n } from '../../i18n';
import type { ThemeColors } from '../../types';
import type { Plot, StolenRecord, Weather } from '../../types/farm';
import { PlotCard } from '../FarmPage';
import { FarmDecorations } from './FarmDecorations';
import { IsometricPlotShell } from './IsometricPlotShell';

interface SimpleFarmGridProps {
  plots: Plot[];
  weather: Weather | null;
  nowTimestamp: number;
  activeTooltipPlotId: number | null;
  stolenRecordByPlotId?: Map<number, StolenRecord>;
  mutationGunCount: number;
  moonDewCount: number;
  nectarCount: number;
  starTrackerCount: number;
  trapNetCount: number;
  onActiveTooltipChange: (plotId: number | null) => void;
  onPlant: (plotId: number) => void;
  onHarvest: (plotId: number) => void;
  onClear: (plotId: number) => void;
  onUseMutationGun: (plotId: number) => void;
  onUseMoonDew: (plotId: number) => void;
  onUseNectar: (plotId: number) => void;
  onUseStarTracker: (plotId: number) => void;
  onUseTrapNet: (plotId: number) => void;
}

interface GridLayout {
  gap: number;
  plotSize: number;
}

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1024;
const DESKTOP_VIEWPORT_WIDTH = 1024;
const TOTAL_SLOTS = 7;

const MOBILE_LAYOUT: GridLayout = {
  gap: 8,
  plotSize: 92,
};

const TABLET_LAYOUT: GridLayout = {
  gap: 12,
  plotSize: 104,
};

const DESKTOP_LAYOUT: GridLayout = {
  gap: 14,
  plotSize: 120,
};

function getViewportWidth(): number {
  if (typeof window === 'undefined') {
    return DESKTOP_VIEWPORT_WIDTH;
  }
  return window.innerWidth;
}

function getGridLayout(viewportWidth: number): GridLayout {
  if (viewportWidth < MOBILE_BREAKPOINT) {
    return MOBILE_LAYOUT;
  }
  if (viewportWidth < TABLET_BREAKPOINT) {
    return TABLET_LAYOUT;
  }
  return DESKTOP_LAYOUT;
}

interface SlotPlacement {
  column: 1 | 2 | 3;
  row: 1 | 2 | 3 | 4 | 5;
}

interface ScenePalette {
  skyTop: string;
  skyMid: string;
  skyBottom: string;
  sunCore: string;
  sunGlow: string;
  cloudMain: string;
  cloudShade: string;
  ridgeFarTop: string;
  ridgeFarBottom: string;
  ridgeMidTop: string;
  ridgeMidBottom: string;
  hillNearTop: string;
  hillNearBottom: string;
  meadowTop: string;
  meadowBottom: string;
  meadowLight: string;
  horizonHaze: string;
  clusterShadow: string;
}

const PORTRAIT_SLOT_PLACEMENTS: SlotPlacement[] = [
  { column: 2, row: 1 },
  { column: 1, row: 2 },
  { column: 3, row: 2 },
  { column: 2, row: 3 },
  { column: 1, row: 4 },
  { column: 3, row: 4 },
  { column: 2, row: 5 },
];

function buildScenePalette(theme: ThemeColors): ScenePalette {
  return {
    skyTop: `color-mix(in oklab, #72cbff 86%, ${theme.bg} 14%)`,
    skyMid: `color-mix(in oklab, #b6ecff 88%, ${theme.surface} 12%)`,
    skyBottom: `color-mix(in oklab, #e5f9ff 90%, ${theme.surface} 10%)`,
    sunCore: '#ffe279',
    sunGlow: 'rgba(255,226,121,0.58)',
    cloudMain: `color-mix(in oklab, #ffffff 92%, ${theme.surface} 8%)`,
    cloudShade: `color-mix(in oklab, #cde4f0 84%, ${theme.bg} 16%)`,
    ridgeFarTop: `color-mix(in oklab, #c2eca9 86%, ${theme.surface} 14%)`,
    ridgeFarBottom: `color-mix(in oklab, #abde91 84%, ${theme.surface} 16%)`,
    ridgeMidTop: `color-mix(in oklab, #b5e793 88%, ${theme.surface} 12%)`,
    ridgeMidBottom: `color-mix(in oklab, #9bd47c 86%, ${theme.surface} 14%)`,
    hillNearTop: `color-mix(in oklab, #a9e07e 88%, ${theme.surface} 12%)`,
    hillNearBottom: `color-mix(in oklab, #8ec968 86%, ${theme.surface} 14%)`,
    meadowTop: `color-mix(in oklab, #b9eb85 90%, ${theme.surface} 10%)`,
    meadowBottom: `color-mix(in oklab, #95cf63 88%, ${theme.surface} 12%)`,
    meadowLight: 'rgba(235,255,190,0.54)',
    horizonHaze: 'rgba(222,247,255,0.74)',
    clusterShadow: 'rgba(94,145,67,0.34)',
  };
}

export function SimpleFarmGrid({
  plots,
  weather,
  nowTimestamp,
  activeTooltipPlotId,
  stolenRecordByPlotId,
  mutationGunCount,
  moonDewCount,
  nectarCount,
  starTrackerCount,
  trapNetCount,
  onActiveTooltipChange,
  onPlant,
  onHarvest,
  onClear,
  onUseMutationGun,
  onUseMoonDew,
  onUseNectar,
  onUseStarTracker,
  onUseTrapNet,
}: SimpleFarmGridProps) {
  const theme = useTheme();
  const t = useI18n();
  const sceneId = useId().replace(/:/g, '');
  const [viewportWidth, setViewportWidth] = useState<number>(() => getViewportWidth());

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const layout = useMemo(() => getGridLayout(viewportWidth), [viewportWidth]);
  const scenePalette = useMemo(() => buildScenePalette(theme), [theme]);
  const sceneWidth = layout.plotSize * 3 + layout.gap * 2;
  const sceneFrameMaxWidth = sceneWidth + (viewportWidth < MOBILE_BREAKPOINT ? 64 : 102);
  const sceneTopPadding = viewportWidth < MOBILE_BREAKPOINT
    ? Math.round(layout.plotSize * 1.62)
    : Math.round(layout.plotSize * 1.44);
  const sceneBottomPadding = viewportWidth < MOBILE_BREAKPOINT
    ? Math.round(layout.plotSize * 0.64)
    : Math.round(layout.plotSize * 0.56);

  return (
    <div className="relative w-full overflow-visible" onClick={() => onActiveTooltipChange(null)}>
      <div
        className="relative mx-auto w-full overflow-visible"
        style={{ maxWidth: sceneFrameMaxWidth }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[var(--radius-container)]" aria-hidden="true">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1000 1400"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`farm-sky-${sceneId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={scenePalette.skyTop} />
                <stop offset="48%" stopColor={scenePalette.skyMid} />
                <stop offset="68%" stopColor={scenePalette.skyBottom} />
                <stop offset="100%" stopColor={scenePalette.meadowTop} />
              </linearGradient>
              <linearGradient id={`farm-ridge-far-${sceneId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={scenePalette.ridgeFarTop} />
                <stop offset="100%" stopColor={scenePalette.ridgeFarBottom} />
              </linearGradient>
              <linearGradient id={`farm-ridge-mid-${sceneId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={scenePalette.ridgeMidTop} />
                <stop offset="100%" stopColor={scenePalette.ridgeMidBottom} />
              </linearGradient>
              <linearGradient id={`farm-hill-near-${sceneId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={scenePalette.hillNearTop} />
                <stop offset="100%" stopColor={scenePalette.hillNearBottom} />
              </linearGradient>
              <linearGradient id={`farm-meadow-${sceneId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={scenePalette.meadowTop} />
                <stop offset="100%" stopColor={scenePalette.meadowBottom} />
              </linearGradient>
              <radialGradient id={`farm-sun-glow-${sceneId}`} cx="50%" cy="50%" r="62%">
                <stop offset="0%" stopColor={scenePalette.sunGlow} />
                <stop offset="100%" stopColor="rgba(255,226,121,0)" />
              </radialGradient>
              <radialGradient id={`farm-haze-${sceneId}`} cx="50%" cy="50%" r="62%">
                <stop offset="0%" stopColor={scenePalette.horizonHaze} />
                <stop offset="100%" stopColor="rgba(222,247,255,0)" />
              </radialGradient>
            </defs>

            <rect x="0" y="0" width="1000" height="1400" fill={`url(#farm-sky-${sceneId})`} />
            <ellipse cx="500" cy="396" rx="560" ry="126" fill={`url(#farm-haze-${sceneId})`} opacity="0.8" />
            <ellipse cx="128" cy="106" rx="96" ry="96" fill={`url(#farm-sun-glow-${sceneId})`} />
            <g transform="translate(128 106)">
              <circle cx="0" cy="0" r="38" fill={scenePalette.sunCore} />
              <circle cx="-13" cy="-5" r="3.3" fill="#cf7b2e" />
              <circle cx="13" cy="-5" r="3.3" fill="#cf7b2e" />
              <path d="M -11 12 Q 0 21 11 12" stroke="#cf7b2e" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <circle cx="-49" cy="-6" r="5.2" fill={scenePalette.sunCore} />
              <circle cx="50" cy="-8" r="5.2" fill={scenePalette.sunCore} />
              <circle cx="-35" cy="-34" r="5.2" fill={scenePalette.sunCore} />
              <circle cx="35" cy="-34" r="5.2" fill={scenePalette.sunCore} />
              <circle cx="-2" cy="-52" r="5.2" fill={scenePalette.sunCore} />
            </g>

            <g opacity="0.9">
              <g transform="translate(210 118)">
                <ellipse cx="0" cy="0" rx="42" ry="23" fill={scenePalette.cloudMain} />
                <ellipse cx="-29" cy="9" rx="25" ry="15" fill={scenePalette.cloudMain} />
                <ellipse cx="30" cy="10" rx="23" ry="14" fill={scenePalette.cloudMain} />
                <ellipse cx="8" cy="17" rx="36" ry="8" fill={scenePalette.cloudShade} opacity="0.44" />
              </g>
              <g transform="translate(672 134)">
                <ellipse cx="0" cy="0" rx="47" ry="25" fill={scenePalette.cloudMain} />
                <ellipse cx="-34" cy="10" rx="25" ry="15" fill={scenePalette.cloudMain} />
                <ellipse cx="36" cy="11" rx="25" ry="15" fill={scenePalette.cloudMain} />
                <ellipse cx="10" cy="18" rx="40" ry="9" fill={scenePalette.cloudShade} opacity="0.44" />
              </g>
            </g>

            <path
              d="M -90 492 C 78 404 248 436 394 414 C 564 386 722 456 870 420 C 946 402 1020 420 1090 395 L 1090 744 L -90 744 Z"
              fill={`url(#farm-ridge-far-${sceneId})`}
              opacity="0.86"
            />
            <path
              d="M -104 576 C 88 518 238 536 368 514 C 524 486 690 554 846 520 C 938 500 1020 532 1104 504 L 1104 862 L -104 862 Z"
              fill={`url(#farm-ridge-mid-${sceneId})`}
              opacity="0.88"
            />
            <path
              d="M -120 672 C 86 620 252 636 396 614 C 590 582 770 658 930 624 C 1012 608 1066 620 1120 608 L 1120 984 L -120 984 Z"
              fill={`url(#farm-hill-near-${sceneId})`}
              opacity="0.92"
            />
            <path
              d="M -132 786 C 70 734 246 750 406 730 C 592 700 774 782 958 748 C 1028 736 1088 742 1132 736 L 1132 1410 L -132 1410 Z"
              fill={`url(#farm-meadow-${sceneId})`}
            />
            <ellipse cx="542" cy="1008" rx="320" ry="132" fill={scenePalette.meadowLight} opacity="0.42" />
          </svg>

          <div
            className="absolute inset-x-[9%] bottom-[8%] h-[15%]"
            style={{
              background: `radial-gradient(ellipse at center, ${scenePalette.clusterShadow} 0%, transparent 72%)`,
              filter: 'blur(7px)',
            }}
          />
          <span className="absolute left-[11%] top-[63%] h-[5px] w-[5px] rounded-full" style={{ backgroundColor: 'rgba(247,253,211,0.68)' }} />
          <span className="absolute left-[20%] bottom-[28%] h-[4px] w-[4px] rounded-full" style={{ backgroundColor: 'rgba(255,255,232,0.58)' }} />
          <span className="absolute right-[17%] top-[60%] h-[5px] w-[5px] rounded-full" style={{ backgroundColor: 'rgba(247,253,211,0.68)' }} />
          <span className="absolute right-[11%] bottom-[24%] h-[4px] w-[4px] rounded-full" style={{ backgroundColor: 'rgba(255,255,232,0.58)' }} />
        </div>

        <FarmDecorations />

        <div
          className="pointer-events-none absolute inset-x-[20%] bottom-[10%] z-[7] h-[18%]"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(81,124,48,0.24) 0%, rgba(81,124,48,0.08) 46%, transparent 100%)',
            filter: 'blur(4px)',
          }}
        />

        <div
          className="relative z-10 flex justify-center px-3 sm:px-4"
          style={{
            paddingTop: sceneTopPadding,
            paddingBottom: sceneBottomPadding,
          }}
        >
          <div
            className="farm-grid-perspective grid grid-cols-3 justify-items-center"
            style={{
              width: sceneWidth,
              gap: layout.gap,
              gridTemplateColumns: `repeat(3, minmax(0, ${layout.plotSize}px))`,
            }}
          >
            {Array.from({ length: TOTAL_SLOTS }).map((_, slotIndex) => {
              const plot = slotIndex < plots.length ? plots[slotIndex] : null;
              const placement = PORTRAIT_SLOT_PLACEMENTS[slotIndex] ?? PORTRAIT_SLOT_PLACEMENTS[0];

              return (
                <div
                  key={plot ? `plot-simple-${plot.id}` : `plot-locked-${slotIndex}`}
                  className="relative justify-self-center"
                  style={{
                    width: layout.plotSize,
                    gridColumnStart: placement.column,
                    gridRowStart: placement.row,
                  }}
                >
                  <IsometricPlotShell size={layout.plotSize} state={plot ? plot.state : 'locked'}>
                    {plot ? (
                      <PlotCard
                        plot={plot}
                        weather={weather}
                        stolenRecord={stolenRecordByPlotId?.get(plot.id)}
                        nowTimestamp={nowTimestamp}
                        theme={theme}
                        t={t}
                        isTooltipOpen={activeTooltipPlotId === plot.id}
                        onTooltipToggle={() => onActiveTooltipChange(activeTooltipPlotId === plot.id ? null : plot.id)}
                        onPlantClick={() => onPlant(plot.id)}
                        onHarvestClick={() => onHarvest(plot.id)}
                        onClearClick={() => onClear(plot.id)}
                        mutationGunCount={mutationGunCount}
                        onUseMutationGun={() => onUseMutationGun(plot.id)}
                        moonDewCount={moonDewCount}
                        onUseMoonDew={() => onUseMoonDew(plot.id)}
                        nectarCount={nectarCount}
                        onUseNectar={() => onUseNectar(plot.id)}
                        starTrackerCount={starTrackerCount}
                        onUseStarTracker={() => onUseStarTracker(plot.id)}
                        trapNetCount={trapNetCount}
                        onUseTrapNet={() => onUseTrapNet(plot.id)}
                      />
                    ) : (
                      <div
                        className="flex aspect-square w-full flex-col items-center justify-center gap-1 border-2 border-dashed"
                        style={{
                          borderColor: 'rgba(128,159,95,0.58)',
                          background: 'linear-gradient(150deg, rgba(255,255,255,0.34) 0%, rgba(190,228,144,0.48) 100%)',
                        }}
                      >
                        <span className="text-2xl leading-none" style={{ color: '#6f8f56' }}>🔒</span>
                        <span className="text-[9px] font-medium leading-none" style={{ color: '#6f8f56' }}>
                          {t.marketPlotName(slotIndex)}
                        </span>
                      </div>
                    )}
                  </IsometricPlotShell>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
