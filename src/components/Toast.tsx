/**
 * Toast — 轻量级提示组件
 *
 * fade-in / fade-out 动画，3500ms 自动消失。
 * 适配 5 套主题（Dark/Light/Forest/Ocean/Warm）。
 *
 * v0.9.0: 健康提醒 toast，选择 >25min 时显示。
 */
import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

interface ToastProps {
  message: string;
  /** 自动消失时间（ms），默认 3500 */
  duration?: number;
  /** 消失后回调 */
  onDone: () => void;
}

export function Toast({ message, duration = 3500, onDone }: ToastProps) {
  const theme = useTheme();
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const fadeOutAt = duration - 400;
    const t1 = setTimeout(() => setPhase('out'), fadeOutAt);
    const t2 = setTimeout(onDone, duration);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [duration, onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="text-sm font-medium px-4 py-2 rounded-xl pointer-events-none select-none"
      style={{
        backgroundColor: `${theme.surface}ee`,
        color: theme.textMuted,
        border: `1px solid ${theme.border}`,
        boxShadow: `0 2px 12px ${theme.accent}18`,
        opacity: phase === 'in' ? 1 : 0,
        transform: phase === 'in' ? 'translateY(0)' : 'translateY(-4px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
        maxWidth: '90vw',
        textAlign: 'center' as const,
      }}
    >
      {message}
    </div>
  );
}
