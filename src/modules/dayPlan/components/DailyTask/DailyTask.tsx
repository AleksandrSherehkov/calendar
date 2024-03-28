import { FC } from 'react';
import useTasksStore from '@/store/zustandStore/useTaskStore';

import {
  CheckCompletedStyled,
  TaskItemStyled,
  TaskTextStyled,
} from './DailyTask.Styled';
import { Task } from '@/shared/types/definitions';
interface DailyTask {
  task: Task;
}
export const DailyTask: FC<DailyTask> = ({ task }) => {
  const handleUpdateCompletedTask = useTasksStore.use.updateCompletedTask();

  const handleTaskDoubleClick = useTasksStore.use.еditTaskDoubleClick();
  return (
    <TaskItemStyled>
      <CheckCompletedStyled
        onClick={() => handleUpdateCompletedTask(task)}
        $isCompleted={task.completed}
      />
      <TaskTextStyled
        data-tooltip="Подвійний клік щоб редагувати, або видалити"
        $isCompleted={task.completed}
        onClick={() => handleTaskDoubleClick(task)}
      >
        {task.name}
      </TaskTextStyled>
    </TaskItemStyled>
  );
};
