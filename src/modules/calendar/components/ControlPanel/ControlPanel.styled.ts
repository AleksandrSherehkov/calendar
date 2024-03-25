import styled from 'styled-components';

export const ControlPanelWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${props => props.theme.spacing(4)};
`;

export const TextWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${props => props.theme.fontSizes.xl};
  gap: ${props => props.theme.spacing(2)};
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
  gap: ${props => props.theme.spacing(1)};
`;
export const ButtonStyled = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: unset;
  border-radius: ${props => props.theme.radii.xxs};
  background-color: ${props => props.theme.colors.granite};
  padding: 2px 8px;
  color: ${props => props.theme.colors.darkWhite};
  border-top: ${props => props.theme.borders.normal};
  border-top-color: ${props => props.theme.colors.grey};
  border-left: ${props => props.theme.borders.normal};
  border-left-color: ${props => props.theme.colors.darkGrey};
  border-right: ${props => props.theme.borders.normal};
  border-right-color: ${props => props.theme.colors.darkGrey};
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
  transition: all ${props => props.theme.transitions.regular};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.darkGrey};
    color: ${props => props.theme.colors.lightGrey};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    border: ${props => props.theme.borders.normal};
    border-color: ${props => props.theme.colors.lightGrey};
  }
`;

export const TodayButtonStyled = styled(ButtonStyled)`
  font-weight: bold;
`;
