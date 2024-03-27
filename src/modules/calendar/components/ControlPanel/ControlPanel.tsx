import { uk } from 'date-fns/locale';
import useTasksStore from '@/store/zustandStore/useTaskStore';

import { format, getMonth } from 'date-fns';
import {
  ButtonDayStyled,
  ButtonModeStyled,
  ButtonStyled,
  ControlPanelWrapperStyled,
  TextWrapperStyled,
  TodayButtonStyled,
  WraperButtonStyled,
  WrapperDayButtonStyled,
} from './ControlPanel.styled';
import {
  DISPLAY_MODE_DAY,
  DISPLAY_MODE_MONTH,
} from '../../constants/constants';
import { MONTHS_IN_NOMINATIVE_CASE } from '../../constants/dataConstants';

export const ControlPanel = () => {
  const displayMode = useTasksStore.use.displayMode();
  const setDisplayMode = useTasksStore.use.setDisplayMode();
  const selectedDate = useTasksStore.use.selectedDate();
  const nextDay = useTasksStore.use.nextDay();
  const previousDay = useTasksStore.use.previousDay();
  const previousMonth = useTasksStore.use.previousMonth();
  const nextMonth = useTasksStore.use.nextMonth();
  const previousYear = useTasksStore.use.previousYear();
  const nextYear = useTasksStore.use.nextYear();
  const resetToToday = useTasksStore.use.resetToToday();
  const month = getMonth(selectedDate);
  const monthName = MONTHS_IN_NOMINATIVE_CASE[month];

  const handleMonthMode = () => {
    resetToToday();
    setDisplayMode(DISPLAY_MODE_MONTH);
  };

  const handleDayMode = () => {
    resetToToday();
    setDisplayMode(DISPLAY_MODE_DAY);
  };
  return (
    <ControlPanelWrapperStyled>
      <TextWrapperStyled>
        {displayMode === DISPLAY_MODE_DAY ? (
          <p>{format(selectedDate, 'd MMMM yyyy', { locale: uk })}</p>
        ) : (
          <p>{`${monthName} ${format(selectedDate, 'yyyy', {
            locale: uk,
          })}`}</p>
        )}
      </TextWrapperStyled>
      <WraperButtonStyled>
        <ButtonModeStyled
          onClick={handleMonthMode}
          $isActive={displayMode === DISPLAY_MODE_MONTH}
        >
          Місяц
        </ButtonModeStyled>
        <ButtonModeStyled
          onClick={handleDayMode}
          $isActive={displayMode === DISPLAY_MODE_DAY}
        >
          День
        </ButtonModeStyled>
      </WraperButtonStyled>

      <WraperButtonStyled>
        <ButtonStyled onClick={previousYear}>«</ButtonStyled>
        <ButtonStyled onClick={previousMonth}>‹</ButtonStyled>
        <WrapperDayButtonStyled>
          {displayMode === DISPLAY_MODE_DAY && (
            <ButtonDayStyled onClick={nextDay}>‹</ButtonDayStyled>
          )}

          <TodayButtonStyled onClick={resetToToday}>
            {format(
              displayMode === DISPLAY_MODE_DAY ? selectedDate : new Date(),
              'EEEE, d MMMM',
              { locale: uk }
            )}
          </TodayButtonStyled>
          {displayMode === DISPLAY_MODE_DAY && (
            <ButtonDayStyled onClick={previousDay}>›</ButtonDayStyled>
          )}
        </WrapperDayButtonStyled>
        <ButtonStyled onClick={nextMonth}>›</ButtonStyled>
        <ButtonStyled onClick={nextYear}>»</ButtonStyled>
      </WraperButtonStyled>
    </ControlPanelWrapperStyled>
  );
};
