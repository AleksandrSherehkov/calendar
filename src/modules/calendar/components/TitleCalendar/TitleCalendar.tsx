import { FC } from 'react';

interface TitleCalendarProps {
  text: string;
}
export const TitleCalendar: FC<TitleCalendarProps> = ({ text }) => {
  return <h1>{text}</h1>;
};
