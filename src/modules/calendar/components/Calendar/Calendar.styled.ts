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
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 1px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888888;
  background-color: #1e1f21;
`;

export const TitleStyled = styled.h1`
  border-color: #2a2b20;
  height: 36px;
`;

export const ControlPanelWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
`;

export const TextWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 32px;
  gap: 8px;
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
  gap: 4px;
`;
export const ButtonStyled = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: unset;
  border-radius: 4px;
  background-color: #565759;

  padding: 2px 8px;

  color: #e6e6e6;
`;

export const TodayButtonStyled = styled(ButtonStyled)`
  font-weight: bold;
`;

export const DayWeekWrapperStyled = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 2px solid #464648;
`;
export const DayWeeSellStyled = styled.li`
  min-width: 140px;
  text-align: end;
  padding-right: 6px;
`;

export const GridWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  background-color: #404040;
  gap: 2px;
`;

export const WeekWrapperStyled = styled.ul`
  display: flex;
  gap: 2px;
  background-color: #404040;
`;

export const CellWrapperStyled = styled.li<CellWrapperStyledProps>`
  min-width: 140px;
  min-height: 80px;

  background-color: ${({ $isWeekend }) => ($isWeekend ? '#272829' : '#1e1f21')};
  color: ${({ $isCurrentMonth }) => ($isCurrentMonth ? '#dddddd' : '#555759')};
  padding: 4px;
`;

export const RowInCellStyled = styled.p`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
`;
export const DayWrapperStyled = styled.span<DayWrapperStyledProps>`
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isToday }) => ($isToday ? '#f00' : 'none')};
  border-radius: 50%;
  border: none;
`;
