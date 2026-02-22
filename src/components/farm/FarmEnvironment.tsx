/**
 * FarmEnvironment - Full-screen farm background.
 *
 * Renders a cartoon sky/grass scene with decorative SVG elements
 * and applies optional weather overlays.
 */
import type { Weather } from '../../types/farm';

interface FarmEnvironmentProps {
  weather?: Weather | null;
}

const SUN_RAY_ANGLES = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324] as const;

const CLOUD_POSITIONS = [
  { left: '30%', top: '20%' },
  { left: '60%', top: '15%' },
  { left: '80%', top: '25%' },
  { left: '45%', top: '30%' },
] as const;

const GRASS_BLADE_PATHS = [
  { left: '8%', top: '68%', d: 'M9 28 Q8 16 3 4' },
  { left: '18%', top: '74%', d: 'M9 28 Q12 17 15 5' },
  { left: '34%', top: '71%', d: 'M9 28 Q6 18 4 6' },
  { left: '49%', top: '78%', d: 'M9 28 Q9 15 13 4' },
  { left: '63%', top: '73%', d: 'M9 28 Q7 17 5 5' },
  { left: '78%', top: '76%', d: 'M9 28 Q12 17 14 6' },
  { left: '90%', top: '70%', d: 'M9 28 Q8 16 6 5' },
] as const;

function getWeatherOverlay(weather: Weather | null | undefined): string | null {
  if (weather === 'sunny') {
    return 'radial-gradient(circle at 80% 14%, rgba(255,247,204,0.36) 0%, rgba(255,247,204,0) 38%)';
  }
  if (weather === 'cloudy') {
    return 'linear-gradient(to bottom, rgba(120,136,150,0.26) 0%, rgba(120,136,150,0.08) 44%, rgba(74,103,74,0.12) 100%)';
  }
  if (weather === 'rainy') {
    return 'linear-gradient(to bottom, rgba(36,67,99,0.34) 0%, rgba(36,67,99,0.16) 45%, rgba(24,56,40,0.22) 100%), repeating-linear-gradient(105deg, rgba(255,255,255,0.14) 0px, rgba(255,255,255,0.14) 1px, rgba(255,255,255,0) 4px, rgba(255,255,255,0) 12px)';
  }
  if (weather === 'night') {
    return 'linear-gradient(to bottom, rgba(5,20,44,0.3) 0%, rgba(10,30,58,0.2) 44%, rgba(20,48,40,0.25) 100%)';
  }
  if (weather === 'rainbow') {
    return 'radial-gradient(circle at 22% 18%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 34%), linear-gradient(112deg, rgba(255,0,0,0.2) 0%, rgba(255,127,0,0.2) 16%, rgba(255,255,0,0.18) 32%, rgba(0,255,0,0.16) 48%, rgba(0,127,255,0.16) 64%, rgba(0,0,255,0.16) 80%, rgba(139,0,255,0.2) 100%)';
  }
  if (weather === 'snowy') {
    return 'linear-gradient(to bottom, rgba(208,227,255,0.35) 0%, rgba(228,240,255,0.24) 45%, rgba(226,242,232,0.26) 100%), radial-gradient(circle at 26% 16%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 34%)';
  }
  if (weather === 'stormy') {
    return 'linear-gradient(to bottom, rgba(18,24,42,0.7) 0%, rgba(24,30,46,0.46) 40%, rgba(18,35,30,0.48) 100%), radial-gradient(circle at 78% 18%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 30%)';
  }
  return null;
}

export function FarmEnvironment({ weather = null }: FarmEnvironmentProps) {
  const weatherOverlay = getWeatherOverlay(weather);

  return (
    <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden" aria-hidden="true">
      <div
        className="absolute left-0 top-0 h-[56%] w-full"
        style={{
          background: 'linear-gradient(to bottom, #B8E6F5 0%, #E8F8FC 100%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-[46%] w-full"
        style={{
          background: 'linear-gradient(to bottom, #D4ED6E 0%, #B8D84E 100%)',
        }}
      />

      <svg
        className="absolute left-0 top-[43%] h-[20%] min-h-[96px] w-full"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
      >
        <path
          d="M0 136 C180 88 340 90 500 122 C660 154 820 148 980 116 C1140 84 1280 92 1440 128 L1440 180 L0 180 Z"
          fill="#D4ED6E"
        />
      </svg>

      <svg
        className="absolute h-[70px] w-[70px]"
        style={{ left: '15%', top: '15%' }}
        viewBox="0 0 70 70"
      >
        {SUN_RAY_ANGLES.map((angle) => {
          const radian = (angle * Math.PI) / 180;
          const x1 = 35 + Math.cos(radian) * 23;
          const y1 = 35 + Math.sin(radian) * 23;
          const x2 = 35 + Math.cos(radian) * 31;
          const y2 = 35 + Math.sin(radian) * 31;
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FFA500"
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="35" cy="35" r="18" fill="#FFD93D" stroke="#FFA500" strokeWidth="3" />
        <circle cx="29" cy="31.5" r="2.2" fill="#6B4F00" />
        <circle cx="41" cy="31.5" r="2.2" fill="#6B4F00" />
        <path d="M27 40 Q35 47 43 40" stroke="#6B4F00" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>

      {CLOUD_POSITIONS.map((cloud, index) => (
        <svg
          key={`${cloud.left}-${cloud.top}`}
          className="absolute h-[32px] w-[50px]"
          style={{ left: cloud.left, top: cloud.top, opacity: index === 3 ? 0.9 : 1 }}
          viewBox="0 0 100 64"
        >
          <circle cx="30" cy="40" r="16" fill="#FFFFFF" />
          <circle cx="48" cy="28" r="20" fill="#FFFFFF" />
          <circle cx="66" cy="37" r="17" fill="#FFFFFF" />
          <circle cx="82" cy="42" r="12" fill="#FFFFFF" />
          <path
            d="M16 45 C14 33 24 24 34 25 C38 16 45 11 54 11 C64 11 72 17 75 26 C84 24 93 30 94 40 C98 42 100 45 100 50 C100 56 94 61 86 61 H22 C12 61 6 55 6 48 C6 46 10 44 16 45 Z"
            fill="none"
            stroke="#E0E0E0"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}

      {GRASS_BLADE_PATHS.map((blade) => (
        <svg
          key={`${blade.left}-${blade.top}`}
          className="absolute h-[30px] w-[18px]"
          style={{ left: blade.left, top: blade.top }}
          viewBox="0 0 18 30"
        >
          <path d={blade.d} stroke="#7CB342" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </svg>
      ))}

      {weatherOverlay && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: weatherOverlay,
          }}
        />
      )}
    </div>
  );
}
