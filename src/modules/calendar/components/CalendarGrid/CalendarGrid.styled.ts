import styled from 'styled-components';

export const GridWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  background-color: ${props => props.theme.colors.foggyGrey};
  gap: ${props => props.theme.spacing(0.5)};
`;
