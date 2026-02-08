import { useEffect, useRef } from 'react';
import type { TimerPhase, TimerStatus } from '../hooks/useTimer';
import { formatTime } from '../utils/time';

interface TimerProps {
  timeLeft: number;
  phase: TimerPhase;
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onSkip: () => void;
}

export function Timer({ timeLeft, phase, status, onStart, onPause, onResume, onSkip }: TimerProps) {
  const isWork = phase === 'work';
  const totalDuration = isWork ? 25 * 60 : 5 * 60;
  const progress = (totalDuration - timeLeft) / totalDuration;
  const containerRef = useRef<HTMLDivElement>(null);
  const prevStatusRef = useRef<TimerStatus>(status);

  useEffect(() => {
    if (status === 'running' && prevStatusRef.current === 'idle' && containerRef.current) {
      containerRef.current.classList.remove('animate-scale-in');
      void containerRef.current.offsetWidth;
      containerRef.current.classList.add('animate-scale-in');
    }
    prevStatusRef.current = status;
  }, [status]);

  const size = 320;
  const center = size / 2;
  const radius = 136;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // Position of the progress head for the glow dot
  const angle = progress * 2 * Math.PI - Math.PI / 2;
  const headX = center + radius * Math.cos(angle);
  const headY = center + radius * Math.sin(angle);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 sm:gap-6">
      {/* Phase indicator */}
      <div
        className={`text-sm font-medium tracking-widest transition-colors duration-500 ${
          isWork ? 'text-red-400' : 'text-emerald-400'
        }`}
      >
        {isWork ? '🍅 专注时间' : '☕ 休息时间'}
      </div>

      {/* Circular timer */}
      <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] flex items-center justify-center">
        <svg
          className="absolute inset-0"
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            {/* Progress gradient: red → orange (work) / emerald → teal (break) */}
            <linearGradient id="grad-work" gradientUnits="userSpaceOnUse"
              x1={center} y1="0" x2={size} y2={size}>
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <linearGradient id="grad-break" gradientUnits="userSpaceOnUse"
              x1={center} y1="0" x2={size} y2={size}>
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#5eead4" />
            </linearGradient>

            {/* Tinted base ring gradient — gives the ring color even at idle */}
            <linearGradient id="base-work" gradientUnits="userSpaceOnUse"
              x1={center} y1="0" x2={size} y2={size}>
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="base-break" gradientUnits="userSpaceOnUse"
              x1={center} y1="0" x2={size} y2={size}>
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.08" />
            </linearGradient>

            {/* Glow filters for the progress head dot */}
            <filter id="glow-work" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feFlood floodColor="#f97316" floodOpacity="0.9" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-break" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feFlood floodColor="#2dd4bf" floodOpacity="0.9" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Inner radial glow */}
            <radialGradient id="inner-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isWork ? '#ef4444' : '#34d399'} stopOpacity="0.07" />
              <stop offset="60%" stopColor={isWork ? '#ef4444' : '#34d399'} stopOpacity="0.03" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Inner subtle radial glow */}
          <circle cx={center} cy={center} r={radius - 10} fill="url(#inner-glow)" />

          {/* Base ring — tinted with phase color, not plain gray */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${isWork ? 'base-work' : 'base-break'})`}
            strokeWidth="8"
            transform={`rotate(-90 ${center} ${center})`}
          />

          {/* Progress arc — bright gradient */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${isWork ? 'grad-work' : 'grad-break'})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${center} ${center})`}
            className="transition-all duration-1000 ease-linear"
          />

          {/* Glowing dot at the head of the progress arc */}
          {progress > 0.005 && status !== 'idle' && (
            <circle
              cx={headX}
              cy={headY}
              r="5"
              fill={isWork ? '#fb923c' : '#5eead4'}
              filter={`url(#${isWork ? 'glow-work' : 'glow-break'})`}
              className={status === 'running' ? 'animate-glow-dot' : ''}
            />
          )}
        </svg>

        {/* Time display */}
        <span
          className={`text-6xl sm:text-7xl font-timer text-white tracking-tight select-none transition-opacity ${
            status === 'paused' ? 'animate-pulse' : ''
          }`}
          style={{ fontWeight: 300 }}
        >
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 sm:gap-4 h-16">
        {status === 'idle' && (
          <button
            onClick={onStart}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer ${
              isWork
                ? 'bg-gradient-to-br from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400'
                : 'bg-gradient-to-br from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300'
            }`}
            style={{
              boxShadow: isWork
                ? '0 4px 24px rgba(239, 68, 68, 0.35)'
                : '0 4px 24px rgba(52, 211, 153, 0.35)',
            }}
          >
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="ml-0.5">
              <path d="M2 2L18 12L2 22V2Z" fill="white" />
            </svg>
          </button>
        )}

        {status === 'running' && (
          <button
            onClick={onPause}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.14] transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
          >
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <rect x="1" y="1" width="4.5" height="18" rx="1.5" fill="white" fillOpacity="0.9" />
              <rect x="10.5" y="1" width="4.5" height="18" rx="1.5" fill="white" fillOpacity="0.9" />
            </svg>
          </button>
        )}

        {status === 'paused' && (
          <button
            onClick={onResume}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer ${
              isWork
                ? 'bg-gradient-to-br from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400'
                : 'bg-gradient-to-br from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300'
            }`}
            style={{
              boxShadow: isWork
                ? '0 4px 24px rgba(239, 68, 68, 0.35)'
                : '0 4px 24px rgba(52, 211, 153, 0.35)',
            }}
          >
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="ml-0.5">
              <path d="M2 2L18 12L2 22V2Z" fill="white" />
            </svg>
          </button>
        )}

        {status !== 'idle' && (
          <button
            onClick={onSkip}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/60 transition-all duration-200 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2L10 8L2 14V2Z" fill="currentColor" />
              <rect x="11" y="2" width="3" height="12" rx="0.5" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
