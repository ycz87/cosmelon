/**
 * BarChart — 纯 SVG 柱状图，显示每天的专注时长
 */
import { useTheme } from '../hooks/useTheme';
import { getWeekdayShort } from '../utils/stats';

interface BarChartProps {
  data: { date: string; minutes: number }[];
  height?: number;
}

export function BarChart({ data, height = 140 }: BarChartProps) {
  const theme = useTheme();
  const maxMinutes = Math.max(...data.map((d) => d.minutes), 1);
  const barWidth = Math.min(28, Math.floor(280 / data.length) - 4);
  const chartWidth = data.length * (barWidth + 4);
  const padding = { top: 10, bottom: 28, left: 0, right: 0 };
  const barAreaHeight = height - padding.top - padding.bottom;

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${chartWidth} ${height}`}
      className="overflow-visible"
    >
      {/* Bars */}
      {data.map((d, i) => {
        const barHeight = maxMinutes > 0 ? (d.minutes / maxMinutes) * barAreaHeight : 0;
        const x = i * (barWidth + 4) + 2;
        const y = padding.top + barAreaHeight - barHeight;
        const isToday = i === data.length - 1;
        const weekday = getWeekdayShort(d.date);
        const dayNum = d.date.split('-')[2];

        return (
          <g key={d.date}>
            {/* Bar background */}
            <rect
              x={x} y={padding.top}
              width={barWidth} height={barAreaHeight}
              rx={barWidth / 4}
              fill={theme.inputBg}
            />
            {/* Bar fill */}
            {d.minutes > 0 && (
              <rect
                x={x} y={y}
                width={barWidth} height={Math.max(barHeight, 2)}
                rx={barWidth / 4}
                fill={isToday ? theme.accent : `${theme.accent}99`}
              >
                <animate
                  attributeName="height"
                  from="0"
                  to={Math.max(barHeight, 2)}
                  dur="0.5s"
                  begin={`${i * 0.03}s`}
                  fill="freeze"
                />
                <animate
                  attributeName="y"
                  from={padding.top + barAreaHeight}
                  to={y}
                  dur="0.5s"
                  begin={`${i * 0.03}s`}
                  fill="freeze"
                />
              </rect>
            )}
            {/* Minutes label on top */}
            {d.minutes > 0 && (
              <text
                x={x + barWidth / 2} y={y - 4}
                textAnchor="middle"
                fontSize="8"
                fill={theme.textFaint}
              >
                {d.minutes}
              </text>
            )}
            {/* Day label */}
            <text
              x={x + barWidth / 2}
              y={height - 4}
              textAnchor="middle"
              fontSize="9"
              fill={isToday ? theme.accent : theme.textFaint}
              fontWeight={isToday ? 600 : 400}
            >
              {data.length <= 7 ? weekday : dayNum}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
