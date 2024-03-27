import { FC } from 'react';
import useTasksStore from '@/store/zustandStore/useTaskStore';
import { Task } from '../../../shared/types/definitions';
import { format } from 'date-fns';
import {
  AddIconButton,
  ContainerFormStyled,
  ContainerWraperStyled,
  NoTaskStyled,
  TaskItemStyled,
  TaskListWrapper,
} from './DayPlan';
import {
  CheckCompletedStyled,
  TaskTextStyled,
} from '../../calendar/components/CalendarGrid/CalendarGrid.styled';
import { TaskForm } from '../../taskForm/components/TaskForm/TaskForm';

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
  const handleUpdateCompletedTask = useTasksStore.use.updateCompletedTask();

  const handleTaskDoubleClick = useTasksStore.use.еditTaskDoubleClick();
  const isOpen = useTasksStore.use.isModalOpen();

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
            <TaskTextStyled
              data-tooltip="Подвійний клік щоб редагувати, або видалити"
              $isCompleted={task.completed}
              onClick={() => handleTaskDoubleClick(task)}
            >
              {task.name}
            </TaskTextStyled>
          </TaskItemStyled>
        ))}
      </TaskListWrapper>
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
