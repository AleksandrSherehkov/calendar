import styled from 'styled-components';

export const BackdropStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.modalGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.radii.xs};
`;

export const ModalWrapperStyled = styled.div`
  width: ${props => props.theme.spacing(50)};
  padding: 20px 0 6px 0;

  position: relative;
  border-radius: ${props => props.theme.radii.xs};
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.lightGrey};
  border-top: ${props => props.theme.borders.normal};
  border-top-color: ${props => props.theme.colors.grey};
  border-left: ${props => props.theme.borders.normal};
  border-left-color: ${props => props.theme.colors.darkGrey};
  border-right: ${props => props.theme.borders.normal};
  border-right-color: ${props => props.theme.colors.darkGrey};
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
  border-radius: ${props => props.theme.radii.xs};
  overflow: hidden;
`;

export const CloseButtonStyled = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing(0.5)};
  right: ${props => props.theme.spacing(0.5)};
  cursor: pointer;
  color: ${props => props.theme.colors.granite};
  transition: color ${props => props.theme.transitions.regular};
  &:hover {
    color: ${props => props.theme.colors.darkWhite};
  }
`;
