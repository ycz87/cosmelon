/**
 * ProjectMode — 项目计时模式主容器
 * setup → 复用番茄钟 Timer 计时 → summary
 */
import type { UseProjectTimerReturn } from '../hooks/useProjectTimer';
import { ProjectSetup } from './ProjectSetup';
import { ProjectSummary } from './ProjectSummary';

interface Props {
  project: UseProjectTimerReturn;
  onSwitchToPomodoro: () => void;
}

export function ProjectMode({ project, onSwitchToPomodoro }: Props) {
  const { state } = project;

  // No active project — show setup
  if (!state || state.phase === 'setup') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <ProjectSetup
          onStart={(name, tasks) => {
            project.createProject(name, tasks);
            setTimeout(() => project.startProject(), 50);
          }}
          onCancel={onSwitchToPomodoro}
        />
      </div>
    );
  }

  // Summary
  if (state.phase === 'summary') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full overflow-y-auto">
        <ProjectSummary
          state={state}
          onFinish={() => {
            project.finishProject();
            onSwitchToPomodoro();
          }}
        />
      </div>
    );
  }

  // Execution phases (running/break/overtime/paused) are handled by App.tsx
  // using the Timer component. 'exited' phase is handled by ProjectExitModal in App.tsx.
  return null;
}
