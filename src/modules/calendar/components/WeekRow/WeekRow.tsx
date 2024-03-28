import { FC } from 'react';
import { format } from 'date-fns';

import { DayCell } from '../DayCell/DayCell';

import { WeeksListStyled } from './WeekRow.styled';

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
