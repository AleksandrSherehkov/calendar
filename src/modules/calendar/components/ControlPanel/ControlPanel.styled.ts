import styled from 'styled-components';

export const ControlPanelWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${props => props.theme.spacing(4)};
`;
