import React, { FC } from 'react';
import { uk } from 'date-fns/locale';

import { format } from 'date-fns';
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
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from '../../heplers/constants';

interface ControlPanelProps {
  monthName: string;
  selectedDate: Date;
  nextDay: () => void;
  previousDay: () => void;
  previousMonth: () => void;
  nextMonth: () => void;
  previousYear: () => void;
  nextYear: () => void;
  resetToToday: () => void;
  displayMode: string;
  setDisplayMode: (mode: string) => void;
}

export const ControlPanel: FC<ControlPanelProps> = ({
  monthName,
  selectedDate,
  nextDay,
  previousDay,
  previousMonth,
  nextMonth,
  previousYear,
  nextYear,
  resetToToday,
  displayMode,
  setDisplayMode,
}) => (
  <ControlPanelWrapperStyled>
    <TextWrapperStyled>
      {displayMode === DISPLAY_MODE_DAY ? (
        <p>{format(selectedDate, 'd MMMM yyyy', { locale: uk })}</p>
      ) : (
        <p>{`${monthName} ${format(selectedDate, 'yyyy', { locale: uk })}`}</p>
      )}
    </TextWrapperStyled>
    <WraperButtonStyled>
      <ButtonModeStyled
        onClick={() => setDisplayMode(DISPLAY_MODE_MONTH)}
        $isActive={displayMode === DISPLAY_MODE_MONTH}
      >
        Місяц
      </ButtonModeStyled>
      <ButtonModeStyled
        onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}
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
