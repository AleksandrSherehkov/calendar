import { FC } from 'react';

import useTasksStore from '@/store/zustandStore/useTaskStore';
import { format, getMonth } from 'date-fns';

import {
  CellWrapperStyled,
  CheckCompletedStyled,
  CheckWrapperStyled,
  DayWrapperStyled,
  GridWrapperStyled,
  HolidayStyled,
  RowInCellStyled,
  ShowMoreStyled,
  TaskItemContainerStyled,
  TaskItemStyled,
  TaskTextStyled,
  TasksListStyled,
  WeekWrapperStyled,
} from './CalendarGrid.styled';

interface CalendarGridProps {
  grid: Date[][];

  month: number;
}

export const CalendarGrid: FC<CalendarGridProps> = ({
  grid,

  month,
}) => {
  const tasks = useTasksStore.use.tasks();
  const holidays = useTasksStore.use.holidays();
  const handleShowMoreClick = useTasksStore.use.showMoreTasks();
  const handleUpdateCompletedTask = useTasksStore.use.updateCompletedTask();
  const handleAddNewTaskDoubleClick = useTasksStore.use.addNewTaskDoubleClick();
  const handleTaskDoubleClick = useTasksStore.use.еditTaskDoubleClick();
  return (
    <GridWrapperStyled>
      {grid.map(week => (
        <WeekWrapperStyled key={format(week[0], 'yyyy-MM-dd')}>
          {week.map(day => (
            <CellWrapperStyled
              key={format(day, 'yyyy-MM-dd')}
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
                    <HolidayStyled
                      key={holiday.name}
                      data-title={holiday.localName}
                    >
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
            </CellWrapperStyled>
          ))}
        </WeekWrapperStyled>
      ))}
    </GridWrapperStyled>
  );
};
