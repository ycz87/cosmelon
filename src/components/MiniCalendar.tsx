/**
 * MiniCalendar — 月历视图，标记有记录的日期
 */
import { useState, useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';
import { getMonthDays, formatDateKey } from '../utils/stats';

interface MiniCalendarProps {
  recordDates: Set<string>;
  selectedDate: string;
  onSelect: (dateKey: string) => void;
}

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

export function MiniCalendar({ recordDates, selectedDate, onSelect }: MiniCalendarProps) {
  const theme = useTheme();
  const today = formatDateKey(new Date());

  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());

  const days = useMemo(() => getMonthDays(viewYear, viewMonth), [viewYear, viewMonth]);

  // First day offset (Monday = 0)
  const firstDayOfWeek = (days[0].getDay() + 6) % 7; // shift so Mon=0

  const monthLabel = `${viewYear}年${viewMonth + 1}月`;

  const goPrev = () => {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11); }
    else setViewMonth(viewMonth - 1);
  };

  const goNext = () => {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0); }
    else setViewMonth(viewMonth + 1);
  };

  const goToday = () => {
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    onSelect(today);
  };

  return (
    <div className="w-full">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={goPrev} className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
          style={{ color: theme.textMuted, backgroundColor: theme.inputBg }}>
          ‹
        </button>
        <button onClick={goToday} className="text-sm font-medium cursor-pointer transition-colors hover:opacity-70"
          style={{ color: theme.text }}>
          {monthLabel}
        </button>
        <button onClick={goNext} className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
          style={{ color: theme.textMuted, backgroundColor: theme.inputBg }}>
          ›
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[10px] py-0.5" style={{ color: theme.textFaint }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {/* Empty cells for offset */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((date) => {
          const key = formatDateKey(date);
          const hasRecord = recordDates.has(key);
          const isToday = key === today;
          const isSelected = key === selectedDate;
          const isFuture = key > today;

          return (
            <button
              key={key}
              onClick={() => !isFuture && onSelect(key)}
              disabled={isFuture}
              className={`relative w-full aspect-square rounded-lg flex items-center justify-center text-xs transition-all ${
                isFuture ? 'opacity-20 cursor-default' : 'cursor-pointer'
              }`}
              style={{
                backgroundColor: isSelected ? `${theme.accent}25` : 'transparent',
                color: isSelected ? theme.accent : isToday ? theme.accent : theme.text,
                fontWeight: isToday || isSelected ? 600 : 400,
              }}
            >
              {date.getDate()}
              {/* Dot indicator for days with records */}
              {hasRecord && !isSelected && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                />
              )}
              {hasRecord && isSelected && (
                <span
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
