import { FC, useState } from 'react';
import {
  format,
  getMonth,
  getYear,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  addYears,
  addDays,
} from 'date-fns';
import { uk } from 'date-fns/locale';
import {
  ButtonStyled,
  CalendarWrapperStyled,
  CellWrapperStyled,
  ControlPanelWrapperStyled,
  DayWeeSellStyled,
  DayWeekWrapperStyled,
  DayWrapperStyled,
  GridWrapperStyled,
  NameMonthStyled,
  RowInCellStyled,
  TextWrapperStyled,
  TitleStyled,
  TodayButtonStyled,
  WeekWrapperStyled,
  WraperButtonStyled,
} from './Calendar.styled';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const monthsInNominativeCase = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

const generateCalendarGrid = (year: number, month: number) => {
  const start = startOfWeek(startOfMonth(new Date(year, month)), {
    weekStartsOn: 1,
  });
  const end = endOfWeek(addDays(endOfMonth(new Date(year, month)), 1), {
    weekStartsOn: 1,
  });
  const days = eachDayOfInterval({ start, end });

  const totalDays = 42;
  const daysToAdd = totalDays - days.length;
  for (let i = 0; i < daysToAdd; i++) {
    days.push(addDays(end, i + 1));
  }

  let week: Date[] = [];
  const grid: Date[][] = [];

  days.forEach((day, index) => {
    week.push(day);
    if ((index + 1) % 7 === 0) {
      grid.push(week);
      week = [];
    }
  });

  return grid;
};

export const Calendar: FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = getYear(selectedDate);
  const month = getMonth(selectedDate);
  const grid = generateCalendarGrid(year, month);
  const monthName = monthsInNominativeCase[getMonth(selectedDate)];

  const previousMonth = () =>
    setSelectedDate(current => addMonths(current, -1));
  const nextMonth = () => setSelectedDate(current => addMonths(current, 1));
  const previousYear = () => setSelectedDate(current => addYears(current, -1));
  const nextYear = () => setSelectedDate(current => addYears(current, 1));
  const resetToToday = () => setSelectedDate(new Date());

  return (
    <CalendarWrapperStyled>
      <TitleStyled>Календар</TitleStyled>
      <ControlPanelWrapperStyled>
        <TextWrapperStyled>
          <NameMonthStyled>{monthName}</NameMonthStyled>
          <p>{format(selectedDate, 'yyyy', { locale: uk })}</p>
        </TextWrapperStyled>
        <WraperButtonStyled>
          <ButtonStyled onClick={previousYear}>«</ButtonStyled>
          <ButtonStyled onClick={previousMonth}>‹</ButtonStyled>
          <TodayButtonStyled onClick={resetToToday}>
            {format(new Date(), 'EEEE, d MMMM', { locale: uk })}
          </TodayButtonStyled>
          <ButtonStyled onClick={nextMonth}>›</ButtonStyled>
          <ButtonStyled onClick={nextYear}>»</ButtonStyled>
        </WraperButtonStyled>
      </ControlPanelWrapperStyled>
      <DayWeekWrapperStyled>
        {daysOfWeek.map(day => (
          <DayWeeSellStyled key={day}>{day}</DayWeeSellStyled>
        ))}
      </DayWeekWrapperStyled>
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
                    $isToday={day.toDateString() === new Date().toDateString()}
                  >
                    {format(day, 'd')}
                  </DayWrapperStyled>
                </RowInCellStyled>
              </CellWrapperStyled>
            ))}
          </WeekWrapperStyled>
        ))}
      </GridWrapperStyled>
    </CalendarWrapperStyled>
  );
};
