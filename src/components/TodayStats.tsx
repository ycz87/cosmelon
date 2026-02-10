import type { PomodoroRecord } from '../types';
import { getGrowthStage } from '../types';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../i18n';
import { GrowthIcon } from './GrowthIcon';

interface TodayStatsProps {
  records: PomodoroRecord[];
  idle?: boolean;
  /** Hide the title — EncouragementBanner replaces it */
  hideTitle?: boolean;
}

export function TodayStats({ records, idle, hideTitle }: TodayStatsProps) {
  const theme = useTheme();
  const t = useI18n();

  if (records.length === 0) return null;

  const totalMinutes = records.reduce((sum, r) => sum + (r.durationMinutes || 25), 0);
  const timeStr = t.formatMinutes(totalMinutes);

  // Show growth icons (max 12 visible, then +N)
  const maxVisible = 12;
  const visibleRecords = records.slice(0, maxVisible);
  const overflow = records.length - maxVisible;

  return (
    <div className="flex flex-col items-center gap-3">
      {!hideTitle && (
        <div className="text-xs tracking-wider font-medium uppercase"
          style={{ color: theme.textMuted }}>
          {t.todayHarvest}
        </div>
      )}
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {visibleRecords.map((record, i) => {
          const stage = getGrowthStage(record.durationMinutes || 25);
          return (
            <span
              key={record.id}
              className={`animate-bounce-in ${idle ? 'animate-breathe' : ''}`}
              style={{ animationDelay: `${i * 60}ms` }}
              title={`${record.task || t.unnamed} · ${t.formatMinutes(record.durationMinutes || 25)}`}
            >
              <GrowthIcon stage={stage} size={20} />
            </span>
          );
        })}
        {overflow > 0 && (
          <span className="text-sm font-medium ml-1" style={{ color: theme.textMuted }}>
            +{overflow}
          </span>
        )}
      </div>
      <div className="text-xs" style={{ color: theme.textFaint }}>
        {t.totalFocus(timeStr)}
      </div>
    </div>
  );
}
