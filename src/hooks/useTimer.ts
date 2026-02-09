import { useState, useEffect, useCallback, useRef } from 'react';
import type { PomodoroSettings } from '../types';

export type TimerPhase = 'work' | 'break';
export type TimerStatus = 'idle' | 'running' | 'paused';

interface UseTimerOptions {
  settings: PomodoroSettings;
  onComplete: (phase: TimerPhase) => void;
  onSkipWork: (elapsedSeconds: number) => void;
}

interface UseTimerReturn {
  timeLeft: number;
  phase: TimerPhase;
  status: TimerStatus;
  celebrating: boolean;
  celebrationStage: TimerPhase | null;
  dismissCelebration: () => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  skip: () => void;
  abandon: () => void;
  reset: () => void;
}

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
  const onCompleteRef = useRef(onComplete);
  const onSkipWorkRef = useRef(onSkipWork);
  const settingsRef = useRef(settings);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);
  useEffect(() => { onSkipWorkRef.current = onSkipWork; }, [onSkipWork]);
  useEffect(() => { settingsRef.current = settings; }, [settings]);

  // Update timeLeft when settings change and timer is idle
  useEffect(() => {
    if (status === 'idle') {
      setTimeLeft(getDuration(phase, settings));
    }
  }, [settings, status, phase]);

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

  // Handle timer completion
  useEffect(() => {
    if (timeLeft === 0 && status === 'running') {
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
    setStatus('idle');
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
