import { FC } from 'react';
import useTasksStore from '@/store/zustandStore/useTaskStore';
import { Task } from '../../../../shared/types/definitions';
import { format } from 'date-fns';
import {
  AddIconButton,
  ContainerFormStyled,
  ContainerWraperStyled,
  NoTaskStyled,
  TaskListStyled,
} from './DayPlan';
import {} from '../../../calendar/components/CalendarGrid/CalendarGrid.styled';
import { TaskForm } from '../../../taskForm/components/TaskForm/TaskForm';
import { DailyTask } from '../DailyTask/DailyTask';

interface DayPlansProps {
  handleInputChange: (field: keyof Task, value: string) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
}

export const DayPlans: FC<DayPlansProps> = ({
  handleInputChange,
  handleFormSubmit,
}) => {
  const tasks = useTasksStore.use.tasks();
  const selectedDay = useTasksStore.use.selectedDate();
  const handleAddNewTaskDoubleClick = useTasksStore.use.addNewTaskDoubleClick();

  const isOpen = useTasksStore.use.isModalOpen();

  const tasksForSelectedDay = tasks.filter(
    task =>
      format(new Date(task.date), 'yyyy-MM-dd') ===
      format(selectedDay, 'yyyy-MM-dd')
  );

  return (
    <ContainerWraperStyled>
      <TaskListStyled>
        {tasksForSelectedDay.map(task => (
          <DailyTask key={task._id} task={task} />
        ))}
      </TaskListStyled>
      <ContainerFormStyled $isOpen={isOpen}>
        {isOpen ? (
          <TaskForm
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
        ) : (
          <>
            <AddIconButton
              size={45}
              onClick={() => handleAddNewTaskDoubleClick(selectedDay)}
            />
            <NoTaskStyled size={150} />
          </>
        )}
      </ContainerFormStyled>
    </ContainerWraperStyled>
  );
};
