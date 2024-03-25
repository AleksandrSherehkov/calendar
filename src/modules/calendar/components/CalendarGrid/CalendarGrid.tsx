import { FC } from 'react';

import { format, getMonth } from 'date-fns';
import { Task } from '../../../../shared/types/definitions';
import {
  CellWrapperStyled,
  CheckCompletedStyled,
  CheckWrapperStyled,
  DayWrapperStyled,
  GridWrapperStyled,
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
  tasks: Task[];
  month: number;
  handleShowMoreClick: (date: Date) => void;
  handleAddNewTaskDoubleClick: (date: Date) => void;
  handleTaskDoubleClick: (task: Task) => void;
  handleUpdateCompletedTask: (task: Task) => void;
}

export const CalendarGrid: FC<CalendarGridProps> = ({
  grid,
  tasks,
  month,
  handleShowMoreClick,
  handleAddNewTaskDoubleClick,
  handleTaskDoubleClick,
  handleUpdateCompletedTask,
}) => {
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
