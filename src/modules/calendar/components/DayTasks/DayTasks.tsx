import useTasksStore from '@/store/zustandStore/useTaskStore';
import { ShowMoreStyled, TasksListStyled } from './DayTasks.styled';
import { format } from 'date-fns';
import { FC } from 'react';
import { TaskCheckboxItem } from '../TaskCheckboxItem/TaskCheckboxItem';

interface DayTasksProps {
  day: Date;
}

export const DayTasks: FC<DayTasksProps> = ({ day }) => {
  const tasks = useTasksStore.use.tasks();

  const handleShowMoreClick = useTasksStore.use.showMoreTasks();

  return (
    <TasksListStyled>
      {tasks
        .filter(
          task =>
            format(new Date(task.date), 'yyyy-MM-dd') ===
            format(day, 'yyyy-MM-dd')
        )
        .slice(0, 3)
        .map(task => (
          <TaskCheckboxItem key={task._id} task={task} />
        ))}
      {tasks.filter(
        task =>
          format(new Date(task.date), 'yyyy-MM-dd') ===
          format(day, 'yyyy-MM-dd')
      ).length > 3 && (
        <ShowMoreStyled onClick={() => handleShowMoreClick(day)}>
          показати ще...
        </ShowMoreStyled>
      )}
    </TasksListStyled>
  );
};
