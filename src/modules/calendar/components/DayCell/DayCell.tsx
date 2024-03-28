import useTasksStore from '@/store/zustandStore/useTaskStore';

import { FC } from 'react';
import { CellItemStyled } from './DayCell.styled';
import { getMonth } from 'date-fns';
import { DayHeader } from '../DayHeader/DayHeader';
import { DayTasks } from '../DayTasks/DayTasks';

interface DayCellPrors {
  day: Date;
}

export const DayCell: FC<DayCellPrors> = ({ day }) => {
  const selectedDate = useTasksStore.use.selectedDate();
  const month = getMonth(selectedDate);
  return (
    <CellItemStyled
      $isWeekend={day.getDay() === 6 || day.getDay() === 0}
      $isCurrentMonth={getMonth(day) === month}
    >
      <DayHeader day={day} />
      <DayTasks day={day} />
    </CellItemStyled>
  );
};
