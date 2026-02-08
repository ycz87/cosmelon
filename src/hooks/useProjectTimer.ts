/**
 * useProjectTimer — 项目计时模式核心逻辑
 *
 * 管理项目的创建、执行、暂停、恢复、跳过、插入子任务等。
 * 状态持久化到 localStorage 以支持中断恢复。
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  ProjectTask, ProjectTaskResult, ProjectState, ProjectRecord, ProjectPhase,
} from '../types/project';
import { getTodayKey } from '../utils/time';

const STORAGE_KEY = 'pomodoro-project-state';

// ─── Persistence helpers ───

function saveState(state: ProjectState | null): void {
  try {
    if (state) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch { /* storage full */ }
}

function loadState(): ProjectState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ProjectState;
  } catch {
    return null;
  }
}

// ─── Hook ───

export interface UseProjectTimerReturn {
  /** Current project state (null = no active project) */
  state: ProjectState | null;
  /** Is there a saved project that can be recovered? */
  hasSavedProject: boolean;

  // Setup
  createProject: (name: string, tasks: ProjectTask[]) => void;
  recoverProject: () => void;
  discardSavedProject: () => void;

  // Execution
  startProject: () => void;
  pause: () => void;
  resume: () => void;

  // Task actions
  completeCurrentTask: () => void;
  skipCurrentTask: () => void;
  /** Continue timing after overtime prompt */
  continueOvertime: () => void;

  // Mid-execution edits
  insertTask: (afterIndex: number, task: ProjectTask) => void;
  removeTask: (index: number) => void;
  reorderTasks: (fromIndex: number, toIndex: number) => void;

  // Finish
  finishProject: () => ProjectRecord;
  abandonProject: () => void;
}

export function useProjectTimer(
  onTaskComplete: (result: ProjectTaskResult) => void,
  onProjectComplete: (record: ProjectRecord) => void,
): UseProjectTimerReturn {
  const [state, setState] = useState<ProjectState | null>(null);
  const [hasSavedProject, setHasSavedProject] = useState(false);
  const onTaskCompleteRef = useRef(onTaskComplete);
  const onProjectCompleteRef = useRef(onProjectComplete);

  useEffect(() => { onTaskCompleteRef.current = onTaskComplete; }, [onTaskComplete]);
  useEffect(() => { onProjectCompleteRef.current = onProjectComplete; }, [onProjectComplete]);

  // Check for saved project on mount
  useEffect(() => {
    const saved = loadState();
    if (saved && saved.phase !== 'setup' && saved.phase !== 'summary') {
      setHasSavedProject(true);
    }
  }, []);

  // Persist state changes
  useEffect(() => {
    if (state) {
      saveState(state);
    }
  }, [state]);

  // ─── Timer tick ───
  useEffect(() => {
    if (!state) return;
    if (state.phase !== 'running' && state.phase !== 'break' && state.phase !== 'overtime') return;

    const interval = setInterval(() => {
      setState((prev) => {
        if (!prev) return prev;

        const now = new Date().toISOString();

        if (prev.phase === 'running') {
          const newElapsed = prev.elapsedSeconds + 1;
          const newTimeLeft = prev.timeLeft - 1;

          if (newTimeLeft <= 0) {
            // Time's up — enter overtime prompt
            return { ...prev, timeLeft: 0, elapsedSeconds: newElapsed, phase: 'overtime', lastTickAt: now };
          }
          return { ...prev, timeLeft: newTimeLeft, elapsedSeconds: newElapsed, lastTickAt: now };
        }

        if (prev.phase === 'overtime') {
          // Keep counting up
          return { ...prev, elapsedSeconds: prev.elapsedSeconds + 1, lastTickAt: now };
        }

        if (prev.phase === 'break') {
          const newTimeLeft = prev.timeLeft - 1;
          if (newTimeLeft <= 0) {
            // Break over — advance to next task
            const nextIndex = prev.currentTaskIndex + 1;
            if (nextIndex >= prev.tasks.length) {
              // All tasks done
              return { ...prev, timeLeft: 0, phase: 'summary', lastTickAt: now };
            }
            const nextTask = prev.tasks[nextIndex];
            return {
              ...prev,
              currentTaskIndex: nextIndex,
              timeLeft: nextTask.estimatedMinutes * 60,
              elapsedSeconds: 0,
              phase: 'running',
              lastTickAt: now,
            };
          }
          return { ...prev, timeLeft: newTimeLeft, lastTickAt: now };
        }

        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state?.phase]);

  // ─── Setup ───

  const createProject = useCallback((name: string, tasks: ProjectTask[]) => {
    const newState: ProjectState = {
      id: Date.now().toString(),
      name,
      tasks,
      results: [],
      currentTaskIndex: 0,
      phase: 'setup',
      timeLeft: tasks[0]?.estimatedMinutes * 60 || 0,
      elapsedSeconds: 0,
      lastTickAt: new Date().toISOString(),
      startedAt: '',
    };
    setState(newState);
    setHasSavedProject(false);
  }, []);

  const recoverProject = useCallback(() => {
    const saved = loadState();
    if (!saved) return;

    // Calculate time delta for recovery
    if (saved.phase === 'running' || saved.phase === 'break' || saved.phase === 'overtime') {
      const elapsed = Math.floor((Date.now() - new Date(saved.lastTickAt).getTime()) / 1000);

      if (saved.phase === 'running') {
        saved.elapsedSeconds += elapsed;
        saved.timeLeft = Math.max(0, saved.timeLeft - elapsed);
        if (saved.timeLeft <= 0) {
          saved.phase = 'overtime';
        }
      } else if (saved.phase === 'break') {
        saved.timeLeft = Math.max(0, saved.timeLeft - elapsed);
        if (saved.timeLeft <= 0) {
          // Break was over — advance to next task
          const nextIndex = saved.currentTaskIndex + 1;
          if (nextIndex >= saved.tasks.length) {
            saved.phase = 'summary';
          } else {
            saved.currentTaskIndex = nextIndex;
            saved.timeLeft = saved.tasks[nextIndex].estimatedMinutes * 60;
            saved.elapsedSeconds = 0;
            saved.phase = 'running';
          }
        }
      } else if (saved.phase === 'overtime') {
        saved.elapsedSeconds += elapsed;
      }

      // Pause after recovery so user can see the state
      if (saved.phase === 'running' || saved.phase === 'overtime') {
        saved.phase = 'paused';
      }
    }

    saved.lastTickAt = new Date().toISOString();
    setState(saved);
    setHasSavedProject(false);
  }, []);

  const discardSavedProject = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedProject(false);
  }, []);

  // ─── Execution ───

  const startProject = useCallback(() => {
    setState((prev) => {
      if (!prev || prev.tasks.length === 0) return prev;
      const firstTask = prev.tasks[0];
      return {
        ...prev,
        phase: 'running',
        currentTaskIndex: 0,
        timeLeft: firstTask.estimatedMinutes * 60,
        elapsedSeconds: 0,
        startedAt: new Date().toISOString(),
        lastTickAt: new Date().toISOString(),
      };
    });
  }, []);

  const pause = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      if (prev.phase === 'running' || prev.phase === 'break' || prev.phase === 'overtime') {
        return { ...prev, phase: 'paused', lastTickAt: new Date().toISOString() };
      }
      return prev;
    });
  }, []);

  const resume = useCallback(() => {
    setState((prev) => {
      if (!prev || prev.phase !== 'paused') return prev;
      // Determine what phase to resume to
      const isBreak = prev.results.length > prev.currentTaskIndex; // current task already completed = we're in break
      let resumePhase: ProjectPhase;
      if (isBreak) {
        resumePhase = 'break';
      } else if (prev.timeLeft <= 0) {
        resumePhase = 'overtime';
      } else {
        resumePhase = 'running';
      }
      return { ...prev, phase: resumePhase, lastTickAt: new Date().toISOString() };
    });
  }, []);

  // ─── Task actions ───

  const recordTaskResult = useCallback((prev: ProjectState, status: 'completed' | 'skipped'): ProjectState => {
    const task = prev.tasks[prev.currentTaskIndex];
    const result: ProjectTaskResult = {
      taskId: task.id,
      name: task.name,
      estimatedMinutes: task.estimatedMinutes,
      actualSeconds: prev.elapsedSeconds,
      status,
      completedAt: new Date().toISOString(),
    };

    onTaskCompleteRef.current(result);

    const newResults = [...prev.results, result];
    const nextIndex = prev.currentTaskIndex + 1;

    // Check if this was the last task
    if (nextIndex >= prev.tasks.length) {
      return {
        ...prev,
        results: newResults,
        phase: 'summary',
        timeLeft: 0,
        lastTickAt: new Date().toISOString(),
      };
    }

    // Enter break
    return {
      ...prev,
      results: newResults,
      phase: 'break',
      timeLeft: task.breakMinutes * 60,
      lastTickAt: new Date().toISOString(),
    };
  }, []);

  const completeCurrentTask = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      return recordTaskResult(prev, 'completed');
    });
  }, [recordTaskResult]);

  const skipCurrentTask = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      return recordTaskResult(prev, 'skipped');
    });
  }, [recordTaskResult]);

  const continueOvertime = useCallback(() => {
    setState((prev) => {
      if (!prev || prev.phase !== 'overtime') return prev;
      return { ...prev, phase: 'running', lastTickAt: new Date().toISOString() };
    });
  }, []);

  // ─── Mid-execution edits ───

  const insertTask = useCallback((afterIndex: number, task: ProjectTask) => {
    setState((prev) => {
      if (!prev) return prev;
      const newTasks = [...prev.tasks];
      newTasks.splice(afterIndex + 1, 0, task);
      return { ...prev, tasks: newTasks };
    });
  }, []);

  const removeTask = useCallback((index: number) => {
    setState((prev) => {
      if (!prev) return prev;
      // Can't remove current running task
      if (index === prev.currentTaskIndex && prev.phase !== 'setup') return prev;
      const newTasks = prev.tasks.filter((_, i) => i !== index);
      // Adjust currentTaskIndex if needed
      let newIndex = prev.currentTaskIndex;
      if (index < prev.currentTaskIndex) {
        newIndex = Math.max(0, newIndex - 1);
      }
      return { ...prev, tasks: newTasks, currentTaskIndex: newIndex };
    });
  }, []);

  const reorderTasks = useCallback((fromIndex: number, toIndex: number) => {
    setState((prev) => {
      if (!prev) return prev;
      // Only allow reordering future tasks (after current)
      if (prev.phase !== 'setup') {
        if (fromIndex <= prev.currentTaskIndex || toIndex <= prev.currentTaskIndex) return prev;
      }
      const newTasks = [...prev.tasks];
      const [moved] = newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, moved);
      return { ...prev, tasks: newTasks };
    });
  }, []);

  // ─── Finish ───

  const finishProject = useCallback((): ProjectRecord => {
    if (!state) throw new Error('No active project');
    const record: ProjectRecord = {
      id: state.id,
      name: state.name,
      tasks: state.results,
      totalEstimatedSeconds: state.tasks.reduce((sum, t) => sum + t.estimatedMinutes * 60, 0),
      totalActualSeconds: state.results.reduce((sum, r) => sum + r.actualSeconds, 0),
      startedAt: state.startedAt,
      completedAt: new Date().toISOString(),
      date: getTodayKey(),
    };
    onProjectCompleteRef.current(record);
    localStorage.removeItem(STORAGE_KEY);
    setState(null);
    return record;
  }, [state]);

  const abandonProject = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState(null);
  }, []);

  return {
    state,
    hasSavedProject,
    createProject,
    recoverProject,
    discardSavedProject,
    startProject,
    pause,
    resume,
    completeCurrentTask,
    skipCurrentTask,
    continueOvertime,
    insertTask,
    removeTask,
    reorderTasks,
    finishProject,
    abandonProject,
  };
}
