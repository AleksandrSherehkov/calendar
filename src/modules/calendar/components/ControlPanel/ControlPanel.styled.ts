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
`;

export const TodayButtonStyled = styled(ButtonStyled)`
  font-weight: bold;
`;
