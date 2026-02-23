/**
 * SimpleFarmGrid - 7-plot portrait farm scene with centered subject.
 *
 * Reuses PlotCard to keep all plot interactions and state logic unchanged.
 */
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useI18n } from '../../i18n';
import type { ThemeColors } from '../../types';
import type { Plot, StolenRecord, Weather } from '../../types/farm';
import { PlotCard } from '../FarmPage';
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
  skyGlow: string;
  mountainFarTop: string;
  mountainFarBottom: string;
  mountainMidTop: string;
  mountainMidBottom: string;
  hillTop: string;
  hillBottom: string;
  meadowTop: string;
  meadowBottom: string;
  horizonMist: string;
  lineSoft: string;
  groundVignette: string;
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
    skyTop: `color-mix(in oklab, ${theme.bg} 78%, ${theme.breakAccent} 22%)`,
    skyMid: `color-mix(in oklab, ${theme.bg} 70%, ${theme.surface} 30%)`,
    skyBottom: `color-mix(in oklab, ${theme.surface} 78%, ${theme.breakAccentEnd} 22%)`,
    skyGlow: `color-mix(in oklab, ${theme.surface} 34%, transparent)`,
    mountainFarTop: `color-mix(in oklab, ${theme.bg} 74%, ${theme.breakAccent} 26%)`,
    mountainFarBottom: `color-mix(in oklab, ${theme.bg} 84%, ${theme.surface} 16%)`,
    mountainMidTop: `color-mix(in oklab, ${theme.surface} 70%, ${theme.breakAccentEnd} 30%)`,
    mountainMidBottom: `color-mix(in oklab, ${theme.bg} 82%, ${theme.surface} 18%)`,
    hillTop: `color-mix(in oklab, ${theme.surface} 76%, ${theme.accent} 24%)`,
    hillBottom: `color-mix(in oklab, ${theme.bg} 86%, ${theme.surface} 14%)`,
    meadowTop: `color-mix(in oklab, ${theme.surface} 84%, ${theme.accent} 16%)`,
    meadowBottom: `color-mix(in oklab, ${theme.bg} 88%, ${theme.text} 12%)`,
    horizonMist: `color-mix(in oklab, ${theme.text} 18%, transparent)`,
    lineSoft: `color-mix(in oklab, ${theme.text} 24%, transparent)`,
    groundVignette: `color-mix(in oklab, ${theme.textMuted} 24%, transparent)`,
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
  const sceneFrameMaxWidth = sceneWidth + (viewportWidth < MOBILE_BREAKPOINT ? 56 : 88);
  const sceneTopPadding = viewportWidth < MOBILE_BREAKPOINT
    ? Math.round(layout.plotSize * 1.28)
    : Math.round(layout.plotSize * 1.14);
  const sceneBottomPadding = viewportWidth < MOBILE_BREAKPOINT
    ? Math.round(layout.plotSize * 0.56)
    : Math.round(layout.plotSize * 0.5);

  return (
    <div className="relative w-full overflow-visible" onClick={() => onActiveTooltipChange(null)}>
      <div
        className="relative mx-auto w-full overflow-visible"
        style={{ maxWidth: sceneFrameMaxWidth }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[var(--radius-container)]" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${scenePalette.skyTop} 0%, ${scenePalette.skyMid} 44%, ${scenePalette.skyBottom} 70%, ${scenePalette.meadowBottom} 100%)`,
            }}
          />
          <div
            className="absolute left-[-20%] top-[16%] h-[20%] w-[140%] opacity-70"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, ${scenePalette.skyGlow} 0%, transparent 70%)`,
              filter: 'blur(10px)',
            }}
          />
          <div
            className="absolute left-[-18%] top-[34%] h-[20%] w-[136%] opacity-72"
            style={{
              background: `linear-gradient(180deg, ${scenePalette.mountainFarTop} 0%, ${scenePalette.mountainFarBottom} 100%)`,
              borderRadius: '52% 48% 0 0 / 94% 90% 0 0',
              boxShadow: `0 -1px 0 ${scenePalette.lineSoft}`,
              filter: 'blur(0.4px)',
            }}
          />
          <div
            className="absolute left-[-16%] top-[40%] h-[22%] w-[132%] opacity-82"
            style={{
              background: `linear-gradient(180deg, ${scenePalette.mountainMidTop} 0%, ${scenePalette.mountainMidBottom} 100%)`,
              borderRadius: '50% 50% 0 0 / 92% 90% 0 0',
              boxShadow: `0 -1px 0 ${scenePalette.lineSoft}`,
            }}
          />
          <div
            className="absolute left-[-14%] top-[49%] h-[28%] w-[128%] opacity-88"
            style={{
              background: `linear-gradient(180deg, ${scenePalette.hillTop} 0%, ${scenePalette.hillBottom} 100%)`,
              borderRadius: '50% 50% 0 0 / 88% 88% 0 0',
              boxShadow: `0 -1px 0 ${scenePalette.lineSoft}`,
            }}
          />
          <div
            className="absolute left-[-18%] bottom-[-7%] h-[56%] w-[136%]"
            style={{
              background: `linear-gradient(180deg, ${scenePalette.meadowTop} 0%, ${scenePalette.meadowBottom} 100%)`,
              borderRadius: '56% 44% 0 0 / 20% 18% 0 0',
            }}
          />
          <div
            className="absolute inset-x-[-4%] top-[45%] h-[16%]"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${scenePalette.horizonMist} 46%, transparent 100%)`,
              filter: 'blur(2px)',
            }}
          />
          <div
            className="absolute inset-x-[10%] bottom-[5%] h-[17%]"
            style={{
              background: `radial-gradient(ellipse at center, ${scenePalette.groundVignette} 0%, transparent 72%)`,
            }}
          />
        </div>

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
                          borderColor: `${theme.textMuted}88`,
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(0,0,0,0.12) 100%)',
                        }}
                      >
                        <span className="text-2xl leading-none" style={{ color: theme.textMuted }}>🔒</span>
                        <span className="text-[9px] font-medium leading-none" style={{ color: theme.textFaint }}>
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
