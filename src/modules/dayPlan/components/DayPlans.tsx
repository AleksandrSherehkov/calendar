import { FC } from 'react';
import { Task } from '../../../shared/types/definitions';
import { format } from 'date-fns';
import {
  ContainerFormStyled,
  ContainerWraperStyled,
  TaskItemStyled,
  TaskListWrapper,
} from './DayPlan';
import {
  CheckCompletedStyled,
  TaskTextStyled,
} from '../../calendar/components/CalendarGrid/CalendarGrid.styled';

interface DayPlansProps {
  tasks: Task[];
  selectedDay: Date;
  handleUpdateCompletedTask: (task: Task) => void;
}

export const DayPlans: FC<DayPlansProps> = ({
  tasks,
  selectedDay,
  handleUpdateCompletedTask,
}) => {
  const tasksForSelectedDay = tasks.filter(
    task =>
      format(new Date(task.date), 'yyyy-MM-dd') ===
      format(selectedDay, 'yyyy-MM-dd')
  );
  return (
    <ContainerWraperStyled>
      <TaskListWrapper>
        {tasksForSelectedDay.map(task => (
          <TaskItemStyled key={task._id}>
            <CheckCompletedStyled
              onClick={() => handleUpdateCompletedTask(task)}
              $isCompleted={task.completed}
            />
            <TaskTextStyled $isCompleted={task.completed}>
              {task.name}
            </TaskTextStyled>
          </TaskItemStyled>
        ))}
      </TaskListWrapper>
      <ContainerFormStyled>FORM</ContainerFormStyled>
    </ContainerWraperStyled>
  );
};
