import styled from 'styled-components';

export const DayWeekWrapperStyled = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: ${props => props.theme.borders.medium};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
`;
export const DayWeeSellStyled = styled.li`
  min-width: ${props => props.theme.spacing(45)};
  text-align: end;
  padding-right: ${props => props.theme.spacing(1.5)};
`;
