import styled from 'styled-components';

export const WeeksListStyled = styled.ul`
  display: flex;
  gap: ${props => props.theme.spacing(0.5)};
  background-color: ${props => props.theme.colors.foggyGrey};
`;
