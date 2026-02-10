/**
 * Project Timer types — 项目计时模式
 */

/** 单个子任务定义 */
export interface ProjectTask {
  id: string;
  name: string;
  estimatedMinutes: number;   // 预计时间（分钟）
  breakMinutes: number;       // 该任务后的休息时间
}

/** 子任务执行记录 */
export interface ProjectTaskResult {
  taskId: string;
  name: string;
  estimatedMinutes: number;
  actualSeconds: number;      // 实际用时（秒）
  status: 'completed' | 'skipped' | 'abandoned' | 'overtime-continued';
  completedAt: string;        // ISO timestamp
  /** If this task was revisited via goToPreviousTask, the seconds already recorded before */
  previousSeconds?: number;
}

/** 项目执行状态 */
export type ProjectPhase = 'setup' | 'running' | 'break' | 'overtime' | 'paused' | 'exited' | 'summary';

/** 项目运行时状态（持久化到 localStorage 用于中断恢复） */
export interface ProjectState {
  id: string;
  name: string;
  tasks: ProjectTask[];
  results: ProjectTaskResult[];
  currentTaskIndex: number;
  phase: ProjectPhase;
  /** Phase before pausing — used to resume correctly */
  pausedFrom?: 'running' | 'break' | 'overtime';
  /** Seconds left on current countdown (task or break) */
  timeLeft: number;
  /** Seconds elapsed on current task (for overtime tracking) */
  elapsedSeconds: number;
  /** Timestamp when timer was last ticked — for recovery delta calc */
  lastTickAt: string;
  startedAt: string;
  /** When revisiting a previous task, the seconds already recorded in the first attempt.
   *  Used to calculate incremental time for rewards/stats. */
  revisitPreviousSeconds?: number;
}

/** 完成的项目记录（存入历史） */
export interface ProjectRecord {
  id: string;
  name: string;
  tasks: ProjectTaskResult[];
  totalEstimatedSeconds: number;
  totalActualSeconds: number;
  startedAt: string;
  completedAt: string;
  date: string;               // YYYY-MM-DD
}

/** App-level mode */
export type AppMode = 'pomodoro' | 'project';
