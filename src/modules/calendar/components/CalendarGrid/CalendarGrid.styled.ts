import styled from 'styled-components';
import { PiCheckFatDuotone } from 'react-icons/pi';

interface CellWrapperStyledProps {
  $isWeekend: boolean;
  $isCurrentMonth: boolean;
}

interface DayWrapperStyledProps {
  $isToday: boolean;
}

interface CheckCompletedStyledProps {
  $isCompleted?: boolean;
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
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing(1)};
  width: ${props => props.theme.spacing(45)};
  min-height: ${props => props.theme.spacing(28.5)};

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
  position: relative;
  height: ${props => props.theme.spacing(6.5)};
  width: ${props => props.theme.spacing(6.5)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isToday, theme }) =>
    $isToday ? theme.colors.red : 'none'};
  border-radius: ${props => props.theme.radii.round};
  border: none;
  cursor: pointer;

  transition: all ${props => props.theme.transitions.regular};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.darkGrey};
    color: ${props => props.theme.colors.lightGrey};

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:hover::after {
    content: 'Подвійний клік, щоб додати нову';
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: ${props => props.theme.radii.xxs};
    padding: 4px 8px;
    font-size: 0.75em;
    z-index: 1;
    display: block;
  }
`;

export const TasksListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${props => props.theme.spacing(1)};
`;

export const TaskItemStyled = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing(1)};
  width: 100%;
`;

export const CheckWrapperStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover::after {
    content: 'Клік для зміни статусу';
    position: absolute;
    bottom: 150%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 0.75em;
    z-index: 2;
    display: block;
  }
`;
export const CheckCompletedStyled = styled(
  PiCheckFatDuotone
)<CheckCompletedStyledProps>`
  flex-shrink: 0;
  background-color: ${props => props.theme.colors.darkGrey};
  fill: ${({ $isCompleted, theme }) =>
    $isCompleted ? theme.colors.red : theme.colors.green};

  cursor: pointer;
  border-top: ${props => props.theme.borders.normal};
  border-top-color: ${props => props.theme.colors.grey};
  border-left: ${props => props.theme.borders.normal};
  border-left-color: ${props => props.theme.colors.darkGrey};
  border-right: ${props => props.theme.borders.normal};
  border-right-color: ${props => props.theme.colors.darkGrey};
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};

  transition: all ${props => props.theme.transitions.regular};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.darkGrey};
    color: ${props => props.theme.colors.lightGrey};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.primary};
  }

  &:focus {
    outline: none;
    border: ${props => props.theme.borders.normal};
    border-color: ${props => props.theme.colors.lightGrey};
  }
`;

export const TaskItemContainerStyled = styled.div`
  flex: 1;
  position: relative;
  width: 88%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover::after {
    content: 'Подвійний клік щоб редагувати, або видалити';
    position: absolute;
    bottom: 150%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: ${props => props.theme.radii.xxs};
    padding: 4px 8px;
    font-size: 0.75em;
    z-index: 1;
    display: block;
    size: 0.75rem;
  }
`;

export const TaskTextStyled = styled.p<CheckCompletedStyledProps>`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${props => props.theme.colors.lightGrey};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.xs};
  text-decoration: ${({ $isCompleted }) =>
    $isCompleted ? 'line-through red' : 'normal'};
  padding: 0 4px;

  background-color: ${props => props.theme.colors.foggyGrey};
  border-top: ${props => props.theme.borders.normal};
  border-top-color: ${props => props.theme.colors.grey};
  border-left: ${props => props.theme.borders.normal};
  border-left-color: ${props => props.theme.colors.darkGrey};
  border-right: ${props => props.theme.borders.normal};
  border-right-color: ${props => props.theme.colors.darkGrey};
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};

  transition: all ${props => props.theme.transitions.regular};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.darkGrey};
    color: ${props => props.theme.colors.lightGrey};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.primary};
  }

  &:focus {
    outline: none;
    border: ${props => props.theme.borders.normal};
    border-color: ${props => props.theme.colors.lightGrey};
  }
`;

export const ShowMoreStyled = styled(TaskTextStyled)`
  font-style: italic;
  text-decoration: none;
`;
