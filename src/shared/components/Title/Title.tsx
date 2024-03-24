import { FC } from 'react';
import { TitleStyled } from './Title.styled';

interface TitleProps {
  text: string;
  variant?: string;
}
export const Title: FC<TitleProps> = ({ text, variant = 'primary' }) => {
  return <TitleStyled $variant={variant}>{text}</TitleStyled>;
};
