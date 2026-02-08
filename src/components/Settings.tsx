/**
 * 设置面板 — 齿轮图标展开，包含所有用户可配置项
 * 计时运行中锁定时长设置，暂停时可修改
 */
import { useState, useRef, useEffect } from 'react';
import type { PomodoroSettings, SoundType, TickType, ThemeId } from '../types';
import { THEMES } from '../types';
import { playNotificationSound, previewTickSound, setAlertVolume, setTickVolume } from '../utils/notification';
import { useTheme } from '../hooks/useTheme';

interface SettingsProps {
  settings: PomodoroSettings;
  onChange: (settings: PomodoroSettings) => void;
  disabled: boolean;
}

/** 数字步进器 — 支持 −/输入/+ 三种操作 */
function NumberStepper({ label, value, onChange, min, max, step = 1, unit = '分钟', disabled }: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step?: number; unit?: string; disabled: boolean;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTheme();

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm" style={{ color: t.textMuted }}>{label}</div>
      <div className={`flex items-center gap-1 ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
        <button onClick={() => onChange(clamp(value - step))}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer text-sm"
          style={{ backgroundColor: t.inputBg, color: t.textMuted }}>−</button>
        <input ref={inputRef} type="number" value={value}
          onChange={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v)) onChange(clamp(v)); }}
          onBlur={() => { if (inputRef.current) { const v = parseInt(inputRef.current.value, 10); if (isNaN(v) || v < min) onChange(min); else if (v > max) onChange(max); } }}
          min={min} max={max}
          className="w-12 h-7 rounded-lg text-center text-sm outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          style={{ backgroundColor: t.inputBg, color: t.text }} />
        <button onClick={() => onChange(clamp(value + step))}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer text-sm"
          style={{ backgroundColor: t.inputBg, color: t.textMuted }}>+</button>
        <span className="text-xs ml-0.5 w-8" style={{ color: t.textFaint }}>{unit}</span>
      </div>
    </div>
  );
}

/** 音量滑块 */
function VolumeSlider({ label, value, onChange }: {
  label: string; value: number; onChange: (v: number) => void;
}) {
  const t = useTheme();
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm shrink-0" style={{ color: t.textMuted }}>{label}</div>
      <div className="flex items-center gap-2 flex-1 max-w-[160px]">
        <input type="range" min={0} max={100} value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="flex-1 h-1 rounded-full appearance-none cursor-pointer accent-current"
          style={{ accentColor: t.accent }} />
        <span className="text-xs w-8 text-right tabular-nums" style={{ color: t.textFaint }}>{value}%</span>
      </div>
    </div>
  );
}

const SOUND_LABELS: Record<SoundType, string> = { chime: '🎵 和弦', bell: '🔔 铃声', nature: '🌿 自然' };
const ALERT_DURATION_OPTIONS = [1, 3, 5, 10];
const TICK_LABELS: Record<TickType, string> = { none: '关闭', classic: '经典钟摆', soft: '轻柔滴答', mechanical: '机械钟表', wooden: '木质钟声' };
const ROUND_OPTIONS = [2, 3, 4, 5, 6];

export function Settings({ settings, onChange, disabled }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const t = useTheme();

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const update = (patch: Partial<PomodoroSettings>) => {
    const next = { ...settings, ...patch };
    onChange(next);
    // 实时更新音量
    if ('alertVolume' in patch) setAlertVolume(next.alertVolume);
    if ('tickVolume' in patch) setTickVolume(next.tickVolume);
  };

  /** 选项按钮样式 */
  const optBtn = (active: boolean) =>
    `px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer ${
      active ? 'font-medium' : ''
    }`;
  const optStyle = (active: boolean) => ({
    backgroundColor: active ? `${t.accent}30` : t.inputBg,
    color: active ? t.accent : t.textMuted,
  });

  return (
    <div className="relative" ref={panelRef}>
      <button onClick={() => setIsOpen(!isOpen)}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer`}
        style={{ color: isOpen ? t.textMuted : t.textFaint }}
        aria-label="设置">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-72 sm:w-80 p-5 rounded-2xl border shadow-2xl z-50 animate-fade-up max-h-[75vh] overflow-y-auto"
          style={{ backgroundColor: t.surface, borderColor: t.textFaint }}>
          <div className="flex flex-col gap-4">
            {disabled && (
              <div className="text-xs" style={{ color: '#fbbf24' }}>⏸ 计时中无法修改，暂停后可调整</div>
            )}

            {/* 时长设置 */}
            <NumberStepper label="专注时长" value={settings.workMinutes}
              onChange={(v) => update({ workMinutes: v })} min={1} max={120} disabled={disabled} />
            <NumberStepper label="短休息" value={settings.shortBreakMinutes}
              onChange={(v) => update({ shortBreakMinutes: v })} min={1} max={30} disabled={disabled} />
            <NumberStepper label="长休息" value={settings.longBreakMinutes}
              onChange={(v) => update({ longBreakMinutes: v })} min={1} max={60} disabled={disabled} />

            <div className="flex items-center justify-between gap-3">
              <div className={`text-sm ${disabled ? 'opacity-40' : ''}`} style={{ color: t.textMuted }}>长休息间隔</div>
              <div className={`flex gap-1 ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
                {ROUND_OPTIONS.map((n) => (
                  <button key={n} onClick={() => update({ pomodorosPerRound: n })}
                    className={optBtn(settings.pomodorosPerRound === n)}
                    style={optStyle(settings.pomodorosPerRound === n)}>{n}</button>
                ))}
              </div>
            </div>

            <div className="border-t" style={{ borderColor: t.textFaint }} />

            {/* 音效设置 */}
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm" style={{ color: t.textMuted }}>提醒音效</div>
              <div className="flex gap-1.5">
                {(Object.keys(SOUND_LABELS) as SoundType[]).map((s) => (
                  <button key={s} onClick={() => { update({ sound: s }); playNotificationSound(s, 1); }}
                    className={optBtn(settings.sound === s)}
                    style={optStyle(settings.sound === s)}>{SOUND_LABELS[s]}</button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="text-sm" style={{ color: t.textMuted }}>提醒时长</div>
              <div className="flex gap-1">
                {ALERT_DURATION_OPTIONS.map((d) => (
                  <button key={d} onClick={() => update({ alertDurationSeconds: d })}
                    className={optBtn(settings.alertDurationSeconds === d)}
                    style={optStyle(settings.alertDurationSeconds === d)}>{d}秒</button>
                ))}
              </div>
            </div>

            <VolumeSlider label="提醒音量" value={settings.alertVolume}
              onChange={(v) => update({ alertVolume: v })} />

            <div className="border-t" style={{ borderColor: t.textFaint }} />

            {/* 背景音设置 */}
            <div className="flex flex-col gap-2">
              <div className="text-sm" style={{ color: t.textMuted }}>专注背景音</div>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(TICK_LABELS) as TickType[]).map((tt) => (
                  <button key={tt} onClick={() => { update({ tickSound: tt }); previewTickSound(tt); }}
                    className={optBtn(settings.tickSound === tt)}
                    style={optStyle(settings.tickSound === tt)}>{TICK_LABELS[tt]}</button>
                ))}
              </div>
            </div>

            {settings.tickSound !== 'none' && (
              <VolumeSlider label="背景音量" value={settings.tickVolume}
                onChange={(v) => update({ tickVolume: v })} />
            )}

            <div className="border-t" style={{ borderColor: t.textFaint }} />

            {/* 主题选择 */}
            <div className="flex flex-col gap-2">
              <div className="text-sm" style={{ color: t.textMuted }}>主题</div>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(THEMES) as ThemeId[]).map((id) => (
                  <button key={id} onClick={() => update({ theme: id })}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
                    style={{
                      backgroundColor: settings.theme === id ? `${THEMES[id].colors.accent}30` : t.inputBg,
                      color: settings.theme === id ? THEMES[id].colors.accent : t.textMuted,
                    }}>
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: THEMES[id].colors.accent }} />
                    {THEMES[id].name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
