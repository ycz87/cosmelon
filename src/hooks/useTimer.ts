/**
 * useTimer — Pomodoro timer state machine
 *
 * Manages a simple work → break → work → break infinite cycle.
 * No long-break / round system (removed in v0.4).
 *
 * State machine:
 *   idle ──start──▶ running ──pause──▶ paused ──resume──▶ running
 *     ▲                │                                      │
 *     └── abandon ─────┘                                      │
 *     └──────────── timeLeft=0 (auto or idle) ────────────────┘
 *
 * The `generation` counter forces the setInterval effect to restart
 * whenever the timer transitions (start/resume/phase-change with auto-start).
 * Without it, auto-start after phase change wouldn't create a new interval
 * because `status` stays 'running'.
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import type { PomodoroSettings } from '../types';

/** Timer phase: 'work' = focus session, 'break' = rest period */
export type TimerPhase = 'work' | 'break';

/** Timer status: 'idle' = not started, 'running' = counting down, 'paused' = frozen */
export type TimerStatus = 'idle' | 'running' | 'paused';

interface UseTimerOptions {
  settings: PomodoroSettings;
  /** Called when a phase completes naturally (timeLeft reaches 0) */
  onComplete: (phase: TimerPhase) => void;
  /** Called when user manually completes (✓) during work — receives elapsed seconds */
  onSkipWork: (elapsedSeconds: number) => void;
}

interface UseTimerReturn {
  timeLeft: number;
  phase: TimerPhase;
  status: TimerStatus;
  /** True while the celebration animation is playing after work completion */
  celebrating: boolean;
  celebrationStage: TimerPhase | null;
  dismissCelebration: () => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  /** Manual complete: records partial work or skips break */
  skip: () => void;
  /** Abandon current session without recording (resets to idle) */
  abandon: () => void;
  reset: () => void;
}

/** Get the duration in seconds for a given phase */
function getDuration(phase: TimerPhase, settings: PomodoroSettings): number {
  return phase === 'work'
    ? settings.workMinutes * 60
    : settings.shortBreakMinutes * 60;
}

export function useTimer({ settings, onComplete, onSkipWork }: UseTimerOptions): UseTimerReturn {
  const [phase, setPhase] = useState<TimerPhase>('work');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(settings.workMinutes * 60);
  const [celebrating, setCelebrating] = useState(false);
  const [celebrationStage, setCelebrationStage] = useState<TimerPhase | null>(null);
  const [generation, setGeneration] = useState(0);
  // Refs to avoid stale closures in effects/callbacks.
  // These always point to the latest callback/settings without causing re-renders.
  const onCompleteRef = useRef(onComplete);
  const onSkipWorkRef = useRef(onSkipWork);
  const settingsRef = useRef(settings);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);
  useEffect(() => { onSkipWorkRef.current = onSkipWork; }, [onSkipWork]);
  useEffect(() => { settingsRef.current = settings; }, [settings]);

  // Sync timeLeft with settings when idle (user changed work/break duration in settings)
  useEffect(() => {
    if (status === 'idle') {
      setTimeLeft(getDuration(phase, settings));
    }
  }, [settings, status, phase]);

  // Core countdown interval — ticks every 1s while running.
  // Depends on `generation` to force restart on phase transitions with auto-start.
  useEffect(() => {
    if (status !== 'running') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status, generation]);

  // Phase completion handler — triggers when timeLeft hits 0 during running.
  // Transitions to next phase, fires celebration for work completion,
  // and respects auto-start settings.
  useEffect(() => {
    if (timeLeft === 0 && status === 'running') {
      try {
        const completedPhase = phase;
        const s = settingsRef.current;

        // Simple cycle: work → break → work → break
        const nextPhase: TimerPhase = completedPhase === 'work' ? 'break' : 'work';

        if (completedPhase === 'work') {
          setCelebrating(true);
          setCelebrationStage(completedPhase);
        }

        setPhase(nextPhase);
        setTimeLeft(getDuration(nextPhase, s));

        // Auto-start logic
        const shouldAutoStart = completedPhase === 'work'
          ? s.autoStartBreak
          : s.autoStartWork;

        if (shouldAutoStart) {
          setGeneration((g) => g + 1);
        } else {
          setStatus('idle');
        }

        onCompleteRef.current(completedPhase);
      } catch (err) {
        console.error('[useTimer] phase completion error:', err);
      }
    }
  }, [timeLeft, status, phase]);

  const start = useCallback(() => {
    setGeneration((g) => g + 1);
    setStatus('running');
  }, []);

  const pause = useCallback(() => {
    setStatus('paused');
  }, []);

  const resume = useCallback(() => {
    setGeneration((g) => g + 1);
    setStatus('running');
  }, []);

  /**
   * Skip (manual complete): during work, records elapsed time via onSkipWork;
   * during break, just advances to next phase.
   * Respects autoStartBreak / autoStartWork settings.
   */
  const skip = useCallback(() => {
    const s = settingsRef.current;

    if (phase === 'work') {
      const totalSeconds = getDuration('work', s);
      const elapsedSeconds = totalSeconds - timeLeft;
      if (elapsedSeconds > 0) {
        onSkipWorkRef.current(elapsedSeconds);
      }
    }

    const nextPhase: TimerPhase = phase === 'work' ? 'break' : 'work';
    setPhase(nextPhase);
    setTimeLeft(getDuration(nextPhase, s));

    // Respect auto-start settings
    const shouldAutoStart = phase === 'work'
      ? s.autoStartBreak
      : s.autoStartWork;

    if (shouldAutoStart) {
      setGeneration((g) => g + 1);
      setStatus('running');
    } else {
      setStatus('idle');
    }
  }, [phase, timeLeft]);

  const abandon = useCallback(() => {
    const s = settingsRef.current;
    setTimeLeft(getDuration(phase, s));
    setStatus('idle');
    setCelebrating(false);
    setCelebrationStage(null);
  }, [phase]);

  const reset = useCallback(() => {
    setPhase('work');
    setTimeLeft(settingsRef.current.workMinutes * 60);
    setStatus('idle');
    setCelebrating(false);
    setCelebrationStage(null);
  }, []);

  const dismissCelebration = useCallback(() => {
    setCelebrating(false);
    setCelebrationStage(null);
  }, []);

  return { timeLeft, phase, status, celebrating, celebrationStage, dismissCelebration, start, pause, resume, skip, abandon, reset };
}
