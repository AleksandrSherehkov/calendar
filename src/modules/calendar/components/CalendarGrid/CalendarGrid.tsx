import useTasksStore from '@/store/zustandStore/useTaskStore';
import { format, getMonth, getYear } from 'date-fns';

import { GridWrapperStyled } from './CalendarGrid.styled';
import { generateCalendarGrid } from '../../ultils/generateCalendarGrid ';
import { WeekRow } from '../WeekRow/WeekRow';

export const CalendarGrid = () => {
  const selectedDate = useTasksStore.use.selectedDate();
  const year = getYear(selectedDate);
  const month = getMonth(selectedDate);
  const grid = generateCalendarGrid(year, month);

  return (
    <GridWrapperStyled>
      {grid.map(week => (
        <WeekRow key={format(week[0], 'yyyy-MM-dd')} week={week} />
      ))}
    </GridWrapperStyled>
  );
};
