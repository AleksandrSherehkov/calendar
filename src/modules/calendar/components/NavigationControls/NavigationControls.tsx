import { uk } from 'date-fns/locale';
import { format } from 'date-fns';

import useTasksStore from '@/store/zustandStore/useTaskStore';

import { DISPLAY_MODE_DAY } from '../../constants/constants';

import { Button } from '@/shared/components/Button/Button';

import { WraperButtonStyled } from '../ModeToggle/ModeToggle.styled';
import { WrapperDayButtonStyled } from './NavigationControls.styled';

export const NavigationControls = () => {
  const nextDay = useTasksStore.use.nextDay();
  const previousDay = useTasksStore.use.previousDay();
  const previousMonth = useTasksStore.use.previousMonth();
  const nextMonth = useTasksStore.use.nextMonth();
  const previousYear = useTasksStore.use.previousYear();
  const nextYear = useTasksStore.use.nextYear();
  const displayMode = useTasksStore.use.displayMode();
  const selectedDate = useTasksStore.use.selectedDate();

  const resetToToday = useTasksStore.use.resetToToday();

  return (
    <WraperButtonStyled>
      <Button onClick={previousYear} text="«" />
      <Button onClick={previousMonth} text="‹" />

      <WrapperDayButtonStyled>
        {displayMode === DISPLAY_MODE_DAY && (
          <Button onClick={nextDay} text="‹" variant="dayArrow" />
        )}
        <Button
          onClick={resetToToday}
          text={format(
            displayMode === DISPLAY_MODE_DAY ? selectedDate : new Date(),
            'EEEE, d MMMM',
            { locale: uk }
          )}
          variant="todayData"
        />

        {displayMode === DISPLAY_MODE_DAY && (
          <Button onClick={previousDay} text="›" variant="dayArrow" />
        )}
      </WrapperDayButtonStyled>
      <Button onClick={nextMonth} text="›" />
      <Button onClick={nextYear} text="»" />
    </WraperButtonStyled>
  );
};
