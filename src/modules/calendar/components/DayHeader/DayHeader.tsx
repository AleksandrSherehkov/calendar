import { format } from 'date-fns';

import useTasksStore from '@/store/zustandStore/useTaskStore';

import {
  DayWrapperStyled,
  HolidayStyled,
  RowInCellStyled,
} from './DayHeader.styled';
import { FC } from 'react';

interface DayHeaderProps {
  day: Date;
}

export const DayHeader: FC<DayHeaderProps> = ({ day }) => {
  const holidays = useTasksStore.use.holidays();
  const handleAddNewTaskDoubleClick = useTasksStore.use.addNewTaskDoubleClick();
  return (
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
  );
};
