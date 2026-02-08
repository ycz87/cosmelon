export interface PomodoroRecord {
  id: string;
  task: string;
  completedAt: string; // ISO string
  date: string; // YYYY-MM-DD
}

export type SoundType = 'chime' | 'bell' | 'nature';

export interface PomodoroSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  pomodorosPerRound: number;
  sound: SoundType;
}

export const DEFAULT_SETTINGS: PomodoroSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  pomodorosPerRound: 4,
  sound: 'chime',
};
