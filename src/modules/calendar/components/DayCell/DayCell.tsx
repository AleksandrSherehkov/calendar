import useTasksStore from '@/store/zustandStore/useTaskStore';

import { FC } from 'react';
import {
  CellItemStyled,
  CheckCompletedStyled,
  CheckWrapperStyled,
  DayWrapperStyled,
  HolidayStyled,
  RowInCellStyled,
  ShowMoreStyled,
  TaskItemContainerStyled,
  TaskItemStyled,
  TaskTextStyled,
  TasksListStyled,
} from './DayCell.styled';
import { format, getMonth } from 'date-fns';

interface DayCellPrors {
  day: Date;
}

export const DayCell: FC<DayCellPrors> = ({ day }) => {
  const tasks = useTasksStore.use.tasks();
  const holidays = useTasksStore.use.holidays();
  const handleShowMoreClick = useTasksStore.use.showMoreTasks();
  const handleUpdateCompletedTask = useTasksStore.use.updateCompletedTask();
  const handleAddNewTaskDoubleClick = useTasksStore.use.addNewTaskDoubleClick();
  const handleTaskDoubleClick = useTasksStore.use.еditTaskDoubleClick();
  const selectedDate = useTasksStore.use.selectedDate();
  const month = getMonth(selectedDate);
  return (
    <CellItemStyled
      $isWeekend={day.getDay() === 6 || day.getDay() === 0}
      $isCurrentMonth={getMonth(day) === month}
    >
      <RowInCellStyled>
        {holidays
          .filter(
            holiday =>
              format(new Date(holiday.date), 'yyyy-MM-dd') ===
              format(day, 'yyyy-MM-dd')
          )
          .map(holiday => (
            <HolidayStyled key={holiday.name} data-title={holiday.localName}>
              {holiday.localName}
            </HolidayStyled>
          ))}
        <DayWrapperStyled
          onDoubleClick={() => handleAddNewTaskDoubleClick(day)}
          $isToday={day.toDateString() === new Date().toDateString()}
        >
          {format(day, 'd')}
        </DayWrapperStyled>
      </RowInCellStyled>
      <TasksListStyled>
        {tasks
          .filter(
            task =>
              format(new Date(task.date), 'yyyy-MM-dd') ===
              format(day, 'yyyy-MM-dd')
          )
          .slice(0, 3)
          .map(task => (
            <TaskItemStyled key={task._id}>
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
    </CellItemStyled>
  );
};
