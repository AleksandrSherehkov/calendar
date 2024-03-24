import React, { FC } from 'react';

import { format, getMonth } from 'date-fns';
import { Task } from '../../../../shared/types/definitions';
import {
  CellWrapperStyled,
  DayWrapperStyled,
  GridWrapperStyled,
  RowInCellStyled,
  TaskItemStyled,
  TaskTextStyled,
  TasksListStyled,
  WeekWrapperStyled,
} from './CalendarGrid.styled';

interface CalendarGridProps {
  grid: Date[][];
  tasks: Task[];
  handleAddNewTaskDoubleClick: (date: Date) => void;
  handleTaskDoubleClick: (task: Task) => void;
}

export const CalendarGrid: FC<CalendarGridProps> = ({
  grid,
  tasks,
  handleAddNewTaskDoubleClick,
  handleTaskDoubleClick,
}) => {
  return (
    <GridWrapperStyled>
      {grid.map(week => (
        <WeekWrapperStyled key={format(week[0], 'yyyy-MM-dd')}>
          {week.map(day => (
            <CellWrapperStyled
              key={format(day, 'yyyy-MM-dd')}
              $isWeekend={day.getDay() === 6 || day.getDay() === 0}
              $isCurrentMonth={getMonth(day) === getMonth(week[0])}
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
                  .map(task => (
                    <TaskItemStyled key={task._id}>
                      <TaskTextStyled
                        onDoubleClick={() => handleTaskDoubleClick(task)}
                      >
                        {task.name}
                      </TaskTextStyled>
                    </TaskItemStyled>
                  ))}
              </TasksListStyled>
            </CellWrapperStyled>
          ))}
        </WeekWrapperStyled>
      ))}
    </GridWrapperStyled>
  );
};
