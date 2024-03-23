import { FC, useEffect, useState } from 'react';
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
  TaskItemStyled,
  TaskTextStyled,
  TasksListStyled,
  TextWrapperStyled,
  TitleStyled,
  TodayButtonStyled,
  WeekWrapperStyled,
  WraperButtonStyled,
} from './Calendar.styled';
import { Task, getAllTasks } from '../../../../services/api/tasksApi';

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
  const [tasks, setTasks] = useState<Task[]>([]);

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

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllTasks({ month: month + 1, year });
        setTasks(response);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    })();
  }, [year, month]);

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
                <TasksListStyled>
                  {tasks
                    .filter(
                      task =>
                        format(new Date(task.date), 'yyyy-MM-dd') ===
                        format(day, 'yyyy-MM-dd')
                    )
                    .map(task => (
                      <TaskItemStyled key={task._id}>
                        <TaskTextStyled>{task.name} </TaskTextStyled>
                      </TaskItemStyled>
                    ))}
                </TasksListStyled>
              </CellWrapperStyled>
            ))}
          </WeekWrapperStyled>
        ))}
      </GridWrapperStyled>
    </CalendarWrapperStyled>
  );
};
