import styled from 'styled-components';

interface CellWrapperStyledProps {
  $isWeekend: boolean;
  $isCurrentMonth: boolean;
}

interface DayWrapperStyledProps {
  $isToday: boolean;
}

export const CalendarWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: ${props => props.theme.borders.normal};
  border-top-color: ${props => props.theme.colors.grey};
  border-left: ${props => props.theme.borders.normal};
  border-left-color: ${props => props.theme.colors.darkGrey};
  border-right: ${props => props.theme.borders.normal};
  border-right-color: ${props => props.theme.colors.darkGrey};
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};

  border-radius: ${props => props.theme.radii.xs};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.primary};
  background-color: ${props => props.theme.colors.black};
`;

export const TitleStyled = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxl};
`;

export const ControlPanelWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${props => props.theme.spacing(4)};
`;

export const TextWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${props => props.theme.fontSizes.xl};
  gap: ${props => props.theme.spacing(2)};
`;
export const NameMonthStyled = styled.p`
  font-weight: bold;
  &::first-letter {
    text-transform: uppercase;
  }
`;

export const WraperButtonStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing(1)};
`;
export const ButtonStyled = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: unset;
  border-radius: ${props => props.theme.radii.xxs};
  background-color: ${props => props.theme.colors.granite};

  padding: 2px 8px;

  color: ${props => props.theme.colors.darkWhite};
`;

export const TodayButtonStyled = styled(ButtonStyled)`
  font-weight: bold;
`;

export const DayWeekWrapperStyled = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: ${props => props.theme.borders.medium};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
`;
export const DayWeeSellStyled = styled.li`
  min-width: ${props => props.theme.spacing(35)};
  text-align: end;
  padding-right: ${props => props.theme.spacing(1.5)};
`;

export const GridWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  background-color: ${props => props.theme.colors.foggyGrey};
  gap: ${props => props.theme.spacing(0.5)};
`;

export const WeekWrapperStyled = styled.ul`
  display: flex;
  gap: ${props => props.theme.spacing(0.5)};
  background-color: ${props => props.theme.colors.foggyGrey};
`;

export const CellWrapperStyled = styled.li<CellWrapperStyledProps>`
  min-width: ${props => props.theme.spacing(35)};
  min-height: ${props => props.theme.spacing(20)};

  background-color: ${({ $isWeekend, theme }) =>
    $isWeekend ? theme.colors.hazeGray : theme.colors.black};
  color: ${({ $isCurrentMonth, theme }) =>
    $isCurrentMonth ? theme.colors.lightGrey : theme.colors.granite};
  padding: ${props => props.theme.spacing(1)};
`;

export const RowInCellStyled = styled.p`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
`;
export const DayWrapperStyled = styled.span<DayWrapperStyledProps>`
  height: ${props => props.theme.spacing(6)};
  width: ${props => props.theme.spacing(6)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isToday, theme }) =>
    $isToday ? theme.colors.red : 'none'};
  border-radius: ${props => props.theme.radii.round};
  border: none;
  cursor: pointer;
`;

export const TasksListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const TaskItemStyled = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
`;

export const TaskTextStyled = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  color: #dddddd;
  cursor: pointer;
`;

export const InputFormStyled = styled.input`
  padding-top: 4px 14px;
  font-size: ${props => props.theme.fontSizes.s};
  width: 100%;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
`;

export const ButtonFormWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 14px;
`;
