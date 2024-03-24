import styled, { css } from 'styled-components';
interface TitleProps {
  $variant?: string;
}

export const TitleStyled = styled.h1<TitleProps>`
  font-size: ${props => props.theme.fontSizes.l};
  ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      font-size: ${props => props.theme.fontSizes.xxl};
    `}

  ${({ $variant }) =>
    $variant === 'form' &&
    css`
      font-size: ${props => props.theme.fontSizes.m};
      text-align: center;
    `}
`;
