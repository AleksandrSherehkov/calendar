import { DayWeeSellStyled, DayWeekWrapperStyled } from './DaysOfWeek.styled';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

export const DaysOfWeek = () => {
  return (
    <DayWeekWrapperStyled>
      {daysOfWeek.map(day => (
        <DayWeeSellStyled key={day}>{day}</DayWeeSellStyled>
      ))}
    </DayWeekWrapperStyled>
  );
};
