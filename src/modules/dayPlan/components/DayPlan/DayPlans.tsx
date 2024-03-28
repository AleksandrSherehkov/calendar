import useTasksStore from '@/store/zustandStore/useTaskStore';

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

export const DayPlans = () => {
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
          <TaskForm />
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
