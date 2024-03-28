import styled, { css } from 'styled-components';

interface ButtonModeProps {
  $variant?: string;
  $isActive?: boolean;
}

export const ButtonStyled = styled.button<ButtonModeProps>`
  display: flex;
  justify-content: center;
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
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.darkGrey};
    color: ${props => props.theme.colors.lightGrey};
    box-shadow: ${props => props.theme.shadows.primary};
  }

  &:focus {
    outline: none;
    border: ${props => props.theme.borders.normal};
    border-color: ${props => props.theme.colors.lightGrey};
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    css`
      border: ${theme.borders.normal};
      border-color: ${theme.colors.lightGrey};
    `}

  ${({ $variant }) =>
    $variant === 'dayArrow' &&
    css`
      transform: rotate(90deg);
      justify-content: center;
      align-items: center;
      width: ${props => props.theme.spacing(6.5)};
    `}
     ${({ $variant }) =>
    $variant === 'todayData' &&
    css`
      width: ${props => props.theme.spacing(54)};
    `}
`;
