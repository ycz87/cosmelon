/**
 * ProjectSummary — 项目完成总结页面
 * 展示每个子任务的预计 vs 实际时间对比
 */
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../i18n';
import type { ProjectState } from '../types/project';
import { getGrowthStage, GROWTH_EMOJI } from '../types';

interface Props {
  state: ProjectState;
  onFinish: () => void;
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m${s}s` : `${m}m`;
}

export function ProjectSummary({ state, onFinish }: Props) {
  const theme = useTheme();
  const t = useI18n();

  const totalEstimated = state.tasks.reduce((sum, task) => sum + task.estimatedMinutes * 60, 0);
  const totalActual = state.results.reduce((sum, r) => sum + r.actualSeconds, 0);
  const diff = totalActual - totalEstimated;
  const diffPercent = totalEstimated > 0 ? Math.round((diff / totalEstimated) * 100) : 0;

  const completedTasks = state.results.filter((r) => r.status === 'completed');
  const skippedTasks = state.results.filter((r) => r.status === 'skipped');

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-5 px-4 py-6">
      {/* Header */}
      <div className="text-center">
        <div className="text-3xl mb-2">🎉</div>
        <h2 className="text-lg font-medium" style={{ color: theme.text }}>
          {t.projectComplete}
        </h2>
        <p className="text-sm mt-1" style={{ color: theme.textMuted }}>
          {state.name}
        </p>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center p-3 rounded-xl"
          style={{ backgroundColor: theme.inputBg }}>
          <span className="text-xs" style={{ color: theme.textMuted }}>{t.projectTotalEstimated}</span>
          <span className="text-lg font-medium tabular-nums" style={{ color: theme.text }}>
            {formatDuration(totalEstimated)}
          </span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl"
          style={{ backgroundColor: theme.inputBg }}>
          <span className="text-xs" style={{ color: theme.textMuted }}>{t.projectTotalActual}</span>
          <span className="text-lg font-medium tabular-nums" style={{ color: theme.text }}>
            {formatDuration(totalActual)}
          </span>
        </div>
      </div>

      {/* Diff badge */}
      <div className="text-center">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: diff <= 0 ? '#22c55e20' : '#ef444420',
            color: diff <= 0 ? '#22c55e' : '#ef4444',
          }}>
          {diff <= 0
            ? `⚡ ${t.projectAheadOfSchedule} ${formatDuration(Math.abs(diff))}`
            : `⏰ ${t.projectBehindSchedule} ${formatDuration(diff)} (+${diffPercent}%)`
          }
        </span>
      </div>

      {/* Task breakdown */}
      <div className="flex flex-col gap-1">
        <div className="text-xs font-medium uppercase tracking-wider mb-1"
          style={{ color: theme.textMuted }}>
          {t.projectTaskBreakdown}
        </div>
        {state.results.map((result) => {
          const estimated = result.estimatedMinutes * 60;
          const actual = result.actualSeconds;
          const taskDiff = actual - estimated;
          const emoji = GROWTH_EMOJI[getGrowthStage(Math.round(actual / 60))];
          const barWidth = estimated > 0 ? Math.min(100, (actual / estimated) * 100) : 100;

          return (
            <div key={result.taskId} className="flex flex-col gap-1 px-3 py-2 rounded-lg"
              style={{ backgroundColor: theme.inputBg, opacity: result.status === 'skipped' ? 0.5 : 1 }}>
              <div className="flex items-center gap-2">
                <span className="text-xs">{emoji}</span>
                <span className="flex-1 text-sm truncate"
                  style={{ color: result.status === 'skipped' ? theme.textFaint : theme.text }}>
                  {result.name}
                  {result.status === 'skipped' && (
                    <span className="ml-1 text-xs" style={{ color: theme.textFaint }}>({t.projectSkipped})</span>
                  )}
                </span>
                <span className="text-xs tabular-nums shrink-0" style={{ color: theme.textMuted }}>
                  {formatDuration(actual)} / {result.estimatedMinutes}m
                </span>
              </div>
              {/* Mini bar */}
              <div className="flex items-center gap-2 ml-5">
                <div className="flex-1 h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: `${theme.textFaint}40` }}>
                  <div className="h-full rounded-full transition-all"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: taskDiff <= 0 ? '#22c55e' : taskDiff > estimated * 0.5 ? '#ef4444' : '#f59e0b',
                    }} />
                </div>
                <span className="text-xs tabular-nums w-12 text-right"
                  style={{ color: taskDiff <= 0 ? '#22c55e' : '#ef4444' }}>
                  {taskDiff <= 0 ? '-' : '+'}{formatDuration(Math.abs(taskDiff))}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats row */}
      <div className="flex justify-center gap-4 text-xs" style={{ color: theme.textMuted }}>
        <span>✓ {completedTasks.length} {t.projectCompleted}</span>
        {skippedTasks.length > 0 && <span>⏭ {skippedTasks.length} {t.projectSkipped}</span>}
      </div>

      {/* Done button */}
      <button onClick={onFinish}
        className="w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer"
        style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}>
        {t.projectDone}
      </button>
    </div>
  );
}
