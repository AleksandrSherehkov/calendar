import styled from 'styled-components';

export const WraperButtonStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${props => props.theme.spacing(1)};
`;
