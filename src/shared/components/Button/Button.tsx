import { FC } from 'react';
import { ButtonStyled } from './Button.styled';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: JSX.Element;
  variant?: string;
  disabled?: boolean;
  isActive?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  text,
  type = 'button',
  icon = null,
  variant,
  disabled = false,
  isActive = false,
}) => {
  return (
    <ButtonStyled
      onClick={onClick}
      disabled={disabled}
      type={type}
      $variant={variant}
      $isActive={isActive}
    >
      {icon && <span>{icon}</span>}
      {text}
    </ButtonStyled>
  );
};
