import styled from 'styled-components';

export const BackdropStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;

export const ModalWrapperStyled = styled.div`
  width: 200px;
  padding: 20px 0 6px 0;

  position: relative;
  border-radius: 6px;
  background-color: #1e1f21;
  color: #dddddd;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 1px solid #464648;
  border-radius: 8px;
  overflow: hidden;
`;

export const CloseButtonStyled = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  cursor: pointer;
  color: #555759;
  transition: color 0.3s ease;
  &:hover {
    color: #f5f7fa;
  }
`;
