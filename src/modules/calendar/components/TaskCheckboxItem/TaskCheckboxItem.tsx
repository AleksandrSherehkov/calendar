import useTasksStore from '@/store/zustandStore/useTaskStore';

import {
  CheckCompletedStyled,
  CheckWrapperStyled,
  TaskItemContainerStyled,
  TaskItemStyled,
  TaskTextStyled,
} from './TaskCheckboxItem.styled';
import { Task } from '@/shared/types/definitions';
import { FC } from 'react';

interface TaskCheckboxItemProps {
  task: Task;
}

export const TaskCheckboxItem: FC<TaskCheckboxItemProps> = ({ task }) => {
  const handleUpdateCompletedTask = useTasksStore.use.updateCompletedTask();
  const handleTaskDoubleClick = useTasksStore.use.еditTaskDoubleClick();

  return (
    <TaskItemStyled>
      <CheckWrapperStyled>
        <CheckCompletedStyled
          onClick={() => handleUpdateCompletedTask(task)}
          $isCompleted={task.completed}
        />
      </CheckWrapperStyled>

      <TaskItemContainerStyled>
        <TaskTextStyled
          onDoubleClick={() => handleTaskDoubleClick(task)}
          $isCompleted={task.completed}
        >
          {task.name}
        </TaskTextStyled>
      </TaskItemContainerStyled>
    </TaskItemStyled>
  );
};
