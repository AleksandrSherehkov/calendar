import React, { FC } from 'react';
import { uk } from 'date-fns/locale';

import { format } from 'date-fns';
import {
  ButtonStyled,
  ControlPanelWrapperStyled,
  NameMonthStyled,
  TextWrapperStyled,
  TodayButtonStyled,
  WraperButtonStyled,
} from './ControlPanel.styled';

type ControlPanelProps = {
  monthName: string;
  selectedDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  previousYear: () => void;
  nextYear: () => void;
  resetToToday: () => void;
};

export const ControlPanel: FC<ControlPanelProps> = ({
  monthName,
  selectedDate,
  previousMonth,
  nextMonth,
  previousYear,
  nextYear,
  resetToToday,
}) => (
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
);
