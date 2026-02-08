/**
 * ModeSwitch — 番茄钟 / 项目模式切换
 */
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../i18n';
import type { AppMode } from '../types/project';

interface Props {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
  disabled?: boolean;
}

export function ModeSwitch({ mode, onChange, disabled }: Props) {
  const theme = useTheme();
  const t = useI18n();

  return (
    <div className="flex items-center rounded-full p-0.5 gap-0.5"
      style={{ backgroundColor: theme.inputBg }}>
      <button
        onClick={() => !disabled && onChange('pomodoro')}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
        style={{
          backgroundColor: mode === 'pomodoro' ? `${theme.accent}25` : 'transparent',
          color: mode === 'pomodoro' ? theme.accent : theme.textMuted,
        }}
      >
        🍉 {t.modePomodoro}
      </button>
      <button
        onClick={() => !disabled && onChange('project')}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
        style={{
          backgroundColor: mode === 'project' ? `${theme.accent}25` : 'transparent',
          color: mode === 'project' ? theme.accent : theme.textMuted,
        }}
      >
        📋 {t.modeProject}
      </button>
    </div>
  );
}
