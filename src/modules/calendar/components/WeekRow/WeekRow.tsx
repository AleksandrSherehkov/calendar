import { WeeksListStyled } from './WeekRow.styled';
import { format } from 'date-fns';
import { FC } from 'react';
import { DayCell } from '../DayCell/DayCell';

interface WeekRowProps {
  week: Date[];
}

export const WeekRow: FC<WeekRowProps> = ({ week }) => {
  return (
    <WeeksListStyled>
      {week.map(day => (
        <DayCell key={format(day, 'yyyy-MM-dd')} day={day} />
      ))}
    </WeeksListStyled>
  );
};
