import styled from 'styled-components';

interface CellWrapperStyledProps {
  $isWeekend: boolean;
  $isCurrentMonth: boolean;
}

export const CellItemStyled = styled.li<CellWrapperStyledProps>`
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
