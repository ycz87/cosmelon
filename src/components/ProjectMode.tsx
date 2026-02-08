/**
 * ProjectMode — 项目计时模式主容器
 * 根据项目状态显示：设置 → 执行 → 总结
 */
import type { UseProjectTimerReturn } from '../hooks/useProjectTimer';
import { ProjectSetup } from './ProjectSetup';
import { ProjectExecution } from './ProjectExecution';
import { ProjectSummary } from './ProjectSummary';

interface Props {
  project: UseProjectTimerReturn;
  onSwitchToPomodoro: () => void;
}

export function ProjectMode({ project, onSwitchToPomodoro }: Props) {
  const { state } = project;

  // No active project — show setup
  if (!state || state.phase === 'setup') {
    if (state && state.phase === 'setup' && state.tasks.length > 0) {
      // Project created but not started — show setup with pre-filled data
      // For simplicity, we treat this as a fresh setup
    }
    return (
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <ProjectSetup
          onStart={(name, tasks) => {
            project.createProject(name, tasks);
            // Auto-start after creation
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

  // Execution (running / paused / break / overtime)
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full overflow-y-auto">
      <ProjectExecution
        state={state}
        onPause={project.pause}
        onResume={project.resume}
        onComplete={project.completeCurrentTask}
        onSkip={project.skipCurrentTask}
        onContinueOvertime={project.continueOvertime}
        onInsertTask={project.insertTask}
        onRemoveTask={project.removeTask}
        onAbandon={project.abandonProject}
      />
    </div>
  );
}
