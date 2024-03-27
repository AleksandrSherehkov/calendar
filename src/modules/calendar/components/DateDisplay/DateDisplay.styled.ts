import styled from 'styled-components';

export const TextDataStyled = styled.p`
  width: ${props => props.theme.spacing(71)};
  font-size: ${props => props.theme.fontSizes.xl};
  gap: ${props => props.theme.spacing(2)};
`;
