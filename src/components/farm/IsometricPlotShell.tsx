/**
 * IsometricPlotShell - 2.5D wrapper for farm plots.
 *
 * Draws a diamond top, side thickness, and a ground shadow while keeping
 * a free content layer for PlotCard interactions and tooltips.
 */
import { useId } from 'react';
import type { ReactNode } from 'react';
import type { Plot } from '../../types/farm';

type PlotShellState = Plot['state'] | 'locked';

interface PlotShellPalette {
  topLight: string;
  topDark: string;
  leftLight: string;
  leftDark: string;
  rightLight: string;
  rightDark: string;
  edge: string;
  highlight: string;
  shadow: string;
}

interface IsometricPlotShellProps {
  size: number;
  state: PlotShellState;
  children: ReactNode;
}

const PALETTES: Record<PlotShellState, PlotShellPalette> = {
  empty: {
    topLight: '#E8C58E',
    topDark: '#D8AA73',
    leftLight: '#C28F57',
    leftDark: '#A67543',
    rightLight: '#BA854F',
    rightDark: '#9E6D3E',
    edge: '#896038',
    highlight: 'rgba(255,255,255,0.44)',
    shadow: 'rgba(78,52,27,0.2)',
  },
  growing: {
    topLight: '#E7CB92',
    topDark: '#D2AD6D',
    leftLight: '#BE9256',
    leftDark: '#A57A45',
    rightLight: '#B58A50',
    rightDark: '#9B733F',
    edge: '#88633A',
    highlight: 'rgba(236,255,214,0.4)',
    shadow: 'rgba(74,50,28,0.2)',
  },
  mature: {
    topLight: '#EDC68C',
    topDark: '#CC9858',
    leftLight: '#B68245',
    leftDark: '#956636',
    rightLight: '#A9773D',
    rightDark: '#8C5D31',
    edge: '#7D5630',
    highlight: 'rgba(255,237,177,0.42)',
    shadow: 'rgba(76,49,26,0.24)',
  },
  withered: {
    topLight: '#C7B39A',
    topDark: '#A38D74',
    leftLight: '#927E69',
    leftDark: '#776250',
    rightLight: '#887460',
    rightDark: '#6E5A49',
    edge: '#665443',
    highlight: 'rgba(255,255,255,0.28)',
    shadow: 'rgba(60,47,35,0.22)',
  },
  stolen: {
    topLight: '#C98378',
    topDark: '#A25B53',
    leftLight: '#9A4D46',
    leftDark: '#7D3A35',
    rightLight: '#8F4841',
    rightDark: '#71332E',
    edge: '#6A2F2A',
    highlight: 'rgba(255,213,205,0.32)',
    shadow: 'rgba(74,30,26,0.3)',
  },
  locked: {
    topLight: '#D1BC9F',
    topDark: '#B59D80',
    leftLight: '#A3896D',
    leftDark: '#876F56',
    rightLight: '#987F64',
    rightDark: '#7B664E',
    edge: '#6E5B46',
    highlight: 'rgba(255,255,255,0.3)',
    shadow: 'rgba(70,56,42,0.2)',
  },
};

export function IsometricPlotShell({ size, state, children }: IsometricPlotShellProps) {
  const gradientId = useId().replace(/:/g, '');
  const palette = PALETTES[state];

  const topHeight = Math.round(size * 0.62);
  const halfTopHeight = topHeight / 2;
  const depth = Math.max(9, Math.round(size * 0.17));
  const shadowPad = Math.max(12, Math.round(size * 0.18));
  const shellHeight = topHeight + depth + shadowPad;

  const contentWidth = Math.round(size * 0.68);
  const contentTop = Math.round(topHeight * 0.1);

  const shadowWidth = Math.round(size * 0.88);
  const shadowHeight = Math.max(9, Math.round(size * 0.14));

  const topPoints = `${size / 2},0 ${size},${halfTopHeight} ${size / 2},${topHeight} 0,${halfTopHeight}`;
  const leftPoints = `0,${halfTopHeight} ${size / 2},${topHeight} ${size / 2},${topHeight + depth} 0,${halfTopHeight + depth}`;
  const rightPoints = `${size},${halfTopHeight} ${size / 2},${topHeight} ${size / 2},${topHeight + depth} ${size},${halfTopHeight + depth}`;

  return (
    <div className="relative overflow-visible" style={{ width: size, height: shellHeight }}>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${size} ${shellHeight}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`top-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.topLight} />
            <stop offset="100%" stopColor={palette.topDark} />
          </linearGradient>
          <linearGradient id={`left-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.leftLight} />
            <stop offset="100%" stopColor={palette.leftDark} />
          </linearGradient>
          <linearGradient id={`right-${gradientId}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={palette.rightLight} />
            <stop offset="100%" stopColor={palette.rightDark} />
          </linearGradient>
          <radialGradient id={`shine-${gradientId}`} cx="50%" cy="24%" r="76%">
            <stop offset="0%" stopColor={palette.highlight} />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id={`shadow-${gradientId}`} x="-24%" y="-100%" width="148%" height="270%">
            <feGaussianBlur stdDeviation={Math.max(1.2, size * 0.013)} />
          </filter>
        </defs>

        <ellipse
          cx={size / 2}
          cy={topHeight + depth + shadowHeight * 0.5}
          rx={shadowWidth / 2}
          ry={shadowHeight / 2}
          fill={palette.shadow}
          filter={`url(#shadow-${gradientId})`}
        />

        <polygon points={leftPoints} fill={`url(#left-${gradientId})`} />
        <polygon points={rightPoints} fill={`url(#right-${gradientId})`} />

        <polygon
          points={topPoints}
          fill={`url(#top-${gradientId})`}
          stroke={palette.edge}
          strokeWidth={Math.max(1.2, size * 0.014)}
          strokeLinejoin="round"
        />
        <polygon points={topPoints} fill={`url(#shine-${gradientId})`} opacity="0.52" />
        <polyline
          points={`0,${halfTopHeight} ${size / 2},0 ${size},${halfTopHeight}`}
          stroke={palette.highlight}
          strokeWidth={Math.max(0.9, size * 0.008)}
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div
        className="absolute left-1/2 z-20 -translate-x-1/2 overflow-visible"
        style={{ top: contentTop, width: contentWidth }}
      >
        {children}
      </div>
    </div>
  );
}
