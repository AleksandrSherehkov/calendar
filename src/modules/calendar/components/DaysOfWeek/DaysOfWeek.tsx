import { DAYS_OF_WEEK } from '../../constants/dataConstants';

import { DayWeeSellStyled, DayWeekWrapperStyled } from './DaysOfWeek.styled';

export const DaysOfWeek = () => {
  return (
    <DayWeekWrapperStyled>
      {DAYS_OF_WEEK.map(day => (
        <DayWeeSellStyled key={day}>{day}</DayWeeSellStyled>
      ))}
    </DayWeekWrapperStyled>
  );
};
