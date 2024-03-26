import { FC } from 'react';
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
  tasks: Task[];
  selectedDay: Date;
  handleAddNewTaskDoubleClick: (date: Date) => void;
  handleUpdateCompletedTask: (task: Task) => void;
  currentTask: Task;
  handleInputChange: (field: keyof Task, value: string) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
  handleCloseModal: () => void;
  deleteTask: (id: string) => void;
  isEditing: boolean;
  handleTaskDoubleClick: (task: Task) => void;
  isOpen: boolean;
}

export const DayPlans: FC<DayPlansProps> = ({
  tasks,
  selectedDay,
  handleAddNewTaskDoubleClick,
  handleTaskDoubleClick,
  handleUpdateCompletedTask,
  currentTask,
  handleInputChange,
  handleFormSubmit,
  handleCloseModal,
  deleteTask,
  isEditing,
  isOpen,
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
            currentTask={currentTask}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            handleCloseModal={handleCloseModal}
            deleteTask={deleteTask}
            isEditing={isEditing}
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
