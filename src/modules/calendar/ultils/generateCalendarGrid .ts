import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export const generateCalendarGrid = (year: number, month: number) => {
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
