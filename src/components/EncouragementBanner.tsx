/**
 * EncouragementBanner — Smart encouragement text based on today's focus data.
 *
 * Displays context-aware motivational text that replaces static titles.
 * Rules (highest priority first):
 *   1. Yesterday comparison (if today count > 0 and yesterday count > 0)
 *   2. Count-based encouragement (1st, 2nd, 3rd, 4th+)
 *   3. Empty state (no records today)
 * Streak suffix appended when streak ≥ 2.
 *
 * v0.6.0: Initial implementation.
 */
import { useMemo } from 'react';
import type { PomodoroRecord } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../i18n';
import { getTodayKey } from '../utils/time';
import { getStreak } from '../utils/stats';

interface EncouragementBannerProps {
  todayRecords: PomodoroRecord[];
  allRecords: PomodoroRecord[];
}

/** Deterministic-ish pick: use today's date + count as seed so it doesn't flicker on re-render */
function pick<T>(arr: readonly T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

export function EncouragementBanner({ todayRecords, allRecords }: EncouragementBannerProps) {
  const theme = useTheme();
  const t = useI18n();

  const { text, streakText } = useMemo(() => {
    const todayCount = todayRecords.length;
    const streak = getStreak(allRecords);

    // Yesterday's count
    const yesterdayKey = (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    })();
    const yesterdayCount = allRecords.filter((r) => r.date === yesterdayKey).length;

    // Seed for deterministic random pick (changes daily + per count)
    const todayKey = getTodayKey();
    const seed = todayKey.split('-').reduce((a, b) => a + Number(b), 0) + todayCount;

    let msg: string;

    if (todayCount === 0) {
      // Empty state
      msg = pick(t.encourageEmpty, seed);
    } else if (todayCount > 0 && yesterdayCount > 0 && todayCount > yesterdayCount) {
      // Beat yesterday
      msg = t.encourageBeatYesterday(todayCount, todayCount - yesterdayCount);
    } else if (todayCount > 0 && yesterdayCount > 0 && todayCount === yesterdayCount) {
      // Tied with yesterday
      msg = t.encourageTiedYesterday(todayCount);
    } else if (todayCount === 1) {
      msg = pick(t.encourageFirst, seed);
    } else if (todayCount === 2) {
      msg = pick(t.encourageSecond, seed);
    } else if (todayCount === 3) {
      msg = pick(t.encourageThird, seed);
    } else {
      // 4+
      msg = pick(t.encourageMany, seed).replace('{n}', String(todayCount));
    }

    // Streak suffix
    let sText = '';
    if (streak.current >= 7) {
      sText = t.streakLong(streak.current);
    } else if (streak.current >= 3) {
      sText = t.streakMedium(streak.current);
    } else if (streak.current >= 2) {
      sText = t.streakShort(streak.current);
    }

    return { text: msg, streakText: sText };
  }, [todayRecords, allRecords, t]);

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="text-xs tracking-wider font-medium text-center leading-relaxed"
        style={{ color: theme.textMuted }}
      >
        {text}
      </div>
      {streakText && (
        <div
          className="text-xs font-medium"
          style={{ color: theme.accent }}
        >
          {streakText}
        </div>
      )}
    </div>
  );
}
