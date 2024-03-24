import styled from 'styled-components';

interface CellWrapperStyledProps {
  $isWeekend: boolean;
  $isCurrentMonth: boolean;
}

interface DayWrapperStyledProps {
  $isToday: boolean;
}

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
