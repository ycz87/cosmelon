/**
 * ProjectExecution — 项目执行视图
 * 显示当前任务计时 + 任务列表进度 + 操作按钮
 */
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../i18n';
import type { ProjectState, ProjectTask } from '../types/project';
import { getGrowthStage, GROWTH_EMOJI } from '../types';

interface Props {
  state: ProjectState;
  onPause: () => void;
  onResume: () => void;
  onComplete: () => void;
  onSkip: () => void;
  onContinueOvertime: () => void;
  onInsertTask: (afterIndex: number, task: ProjectTask) => void;
  onRemoveTask: (index: number) => void;
  onAbandon: () => void;
}

function formatTime(seconds: number): string {
  const abs = Math.abs(seconds);
  const m = Math.floor(abs / 60);
  const s = abs % 60;
  const sign = seconds < 0 ? '-' : '';
  return `${sign}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function ProjectExecution({
  state, onPause, onResume, onComplete, onSkip,
  onContinueOvertime, onInsertTask, onRemoveTask, onAbandon,
}: Props) {
  const theme = useTheme();
  const t = useI18n();
  const [showInsert, setShowInsert] = useState(false);
  const [insertName, setInsertName] = useState('');
  const [insertMinutes, setInsertMinutes] = useState(25);
  const [confirmAbandon, setConfirmAbandon] = useState(false);

  const currentTask = state.tasks[state.currentTaskIndex];
  const isRunning = state.phase === 'running';
  const isPaused = state.phase === 'paused';
  const isBreak = state.phase === 'break';
  const isOvertime = state.phase === 'overtime';

  // Progress
  const completedCount = state.results.length;
  const totalCount = state.tasks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Timer display
  const displayTime = isBreak
    ? formatTime(state.timeLeft)
    : isOvertime
      ? formatTime(state.elapsedSeconds)
      : formatTime(state.timeLeft);

  // Current task elapsed for growth stage
  const currentElapsedMinutes = Math.floor(state.elapsedSeconds / 60);
  const currentGrowthEmoji = GROWTH_EMOJI[getGrowthStage(currentElapsedMinutes)];

  const handleInsert = () => {
    if (!insertName.trim()) return;
    const task: ProjectTask = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: insertName.trim(),
      estimatedMinutes: insertMinutes,
      breakMinutes: 5,
    };
    onInsertTask(state.currentTaskIndex, task);
    setInsertName('');
    setInsertMinutes(25);
    setShowInsert(false);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-4 px-4">
      {/* Project name + progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium truncate" style={{ color: theme.text }}>
            📋 {state.name}
          </span>
          <span className="text-xs shrink-0" style={{ color: theme.textMuted }}>
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: theme.inputBg }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%`, backgroundColor: theme.accent }} />
        </div>
      </div>

      {/* Current task / break display */}
      <div className="flex flex-col items-center gap-3 py-6">
        {isBreak ? (
          <>
            <span className="text-2xl">☕</span>
            <span className="text-sm" style={{ color: theme.textMuted }}>{t.projectBreakTime}</span>
          </>
        ) : (
          <>
            <span className="text-sm" style={{ color: theme.textMuted }}>
              {t.projectCurrentTask} {state.currentTaskIndex + 1}/{totalCount}
            </span>
            <span className="text-base font-medium" style={{ color: theme.text }}>
              {currentTask?.name}
            </span>
            {isOvertime && (
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: '#ef444420', color: '#ef4444' }}>
                ⏰ {t.projectOvertime}
              </span>
            )}
          </>
        )}

        {/* Timer */}
        <div className={`text-5xl font-light tabular-nums tracking-tight ${isOvertime ? 'animate-pulse' : ''}`}
          style={{ color: isOvertime ? '#ef4444' : isBreak ? theme.breakAccent : theme.accent }}>
          {isOvertime && '+'}{displayTime}
        </div>

        {!isBreak && (
          <div className="text-xs" style={{ color: theme.textFaint }}>
            {t.projectEstimated}: {currentTask?.estimatedMinutes}{t.minutes}
            {' · '}{currentGrowthEmoji}
          </div>
        )}
      </div>

      {/* Overtime prompt */}
      {isOvertime && (
        <div className="flex gap-3">
          <button onClick={onContinueOvertime}
            className="flex-1 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
            style={{ backgroundColor: theme.inputBg, color: theme.textMuted }}>
            {t.projectContinue}
          </button>
          <button onClick={onComplete}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
            style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}>
            ✓ {t.projectMarkDone}
          </button>
        </div>
      )}

      {/* Control buttons */}
      {!isOvertime && (
        <div className="flex gap-3">
          {(isRunning || isBreak) && (
            <button onClick={onPause}
              className="flex-1 py-2.5 rounded-xl text-sm transition-all cursor-pointer"
              style={{ backgroundColor: theme.inputBg, color: theme.textMuted }}>
              ⏸ {t.projectPause}
            </button>
          )}
          {isPaused && (
            <button onClick={onResume}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
              style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}>
              ▶ {t.projectResume}
            </button>
          )}
          {(isRunning || isPaused) && !isBreak && (
            <>
              <button onClick={onComplete}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
                style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}>
                ✓ {t.projectMarkDone}
              </button>
              <button onClick={onSkip}
                className="py-2.5 px-3 rounded-xl text-sm transition-all cursor-pointer"
                style={{ backgroundColor: theme.inputBg, color: theme.textFaint }}>
                ⏭
              </button>
            </>
          )}
        </div>
      )}

      {/* Task list */}
      <div className="flex flex-col gap-1 mt-2">
        <div className="text-xs font-medium uppercase tracking-wider mb-1"
          style={{ color: theme.textMuted }}>
          {t.projectTaskList}
        </div>
        {state.tasks.map((task, index) => {
          const result = state.results.find((r) => r.taskId === task.id);
          const isCurrent = index === state.currentTaskIndex && !result;
          const isFuture = index > state.currentTaskIndex && !result;
          const actualMin = result ? Math.round(result.actualSeconds / 60) : null;
          const emoji = result
            ? GROWTH_EMOJI[getGrowthStage(Math.round(result.actualSeconds / 60))]
            : isCurrent ? '▶' : '○';

          return (
            <div key={task.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: isCurrent ? `${theme.accent}08` : 'transparent',
                opacity: result?.status === 'skipped' ? 0.4 : 1,
              }}>
              <span className="text-xs w-5 text-center shrink-0">{emoji}</span>
              <span className={`flex-1 text-sm truncate ${result ? 'line-through' : ''}`}
                style={{ color: isCurrent ? theme.text : result ? theme.textFaint : theme.textMuted }}>
                {task.name}
              </span>
              <span className="text-xs shrink-0 tabular-nums" style={{ color: theme.textFaint }}>
                {result
                  ? `${actualMin}/${task.estimatedMinutes}${t.minutes}`
                  : `${task.estimatedMinutes}${t.minutes}`
                }
              </span>
              {isFuture && (
                <button onClick={() => onRemoveTask(index)}
                  className="w-5 h-5 rounded flex items-center justify-center text-xs cursor-pointer"
                  style={{ color: theme.textFaint }}>✕</button>
              )}
            </div>
          );
        })}
      </div>

      {/* Insert task */}
      {!isBreak && (
        <div>
          {showInsert ? (
            <div className="flex flex-col gap-2 p-3 rounded-xl" style={{ backgroundColor: theme.inputBg }}>
              <input
                type="text"
                value={insertName}
                onChange={(e) => setInsertName(e.target.value)}
                placeholder={t.projectTaskPlaceholder}
                className="px-2 py-1.5 rounded-lg text-sm outline-none bg-transparent"
                style={{ color: theme.text }}
                autoFocus
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={insertMinutes}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10);
                    if (!isNaN(v) && v > 0 && v <= 240) setInsertMinutes(v);
                  }}
                  className="w-16 px-2 py-1 rounded-lg text-xs text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{ backgroundColor: theme.surface, color: theme.text }}
                />
                <span className="text-xs" style={{ color: theme.textFaint }}>{t.minutes}</span>
                <div className="flex-1" />
                <button onClick={() => setShowInsert(false)}
                  className="px-2 py-1 rounded-lg text-xs cursor-pointer"
                  style={{ color: theme.textMuted }}>{t.projectCancel}</button>
                <button onClick={handleInsert}
                  className="px-3 py-1 rounded-lg text-xs font-medium cursor-pointer"
                  style={{ backgroundColor: `${theme.accent}20`, color: theme.accent }}>
                  {t.projectInsert}
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowInsert(true)}
              className="w-full py-1.5 text-xs transition-all cursor-pointer"
              style={{ color: theme.textFaint }}>
              + {t.projectInsertTask}
            </button>
          )}
        </div>
      )}

      {/* Abandon */}
      <div className="flex justify-center pt-2 pb-4">
        {confirmAbandon ? (
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: '#ef4444' }}>{t.projectAbandonConfirm}</span>
            <button onClick={() => { onAbandon(); setConfirmAbandon(false); }}
              className="px-3 py-1 rounded-lg text-xs font-medium cursor-pointer"
              style={{ backgroundColor: '#ef444420', color: '#ef4444' }}>
              {t.projectAbandonYes}
            </button>
            <button onClick={() => setConfirmAbandon(false)}
              className="px-3 py-1 rounded-lg text-xs cursor-pointer"
              style={{ color: theme.textMuted }}>
              {t.projectCancel}
            </button>
          </div>
        ) : (
          <button onClick={() => setConfirmAbandon(true)}
            className="text-xs cursor-pointer transition-colors"
            style={{ color: theme.textFaint }}>
            {t.projectAbandon}
          </button>
        )}
      </div>
    </div>
  );
}
