import styled from 'styled-components';

import { BiTaskX } from 'react-icons/bi';
import { BsPlusSquareFill } from 'react-icons/bs';

interface ContainerFormStyledProps {
  $isOpen: boolean;
}

export const ContainerWraperStyled = styled.div`
  display: flex;
  min-width: ${props => props.theme.spacing(318)};
  min-height: ${props => props.theme.spacing(178.5)};
`;

export const TaskListStyled = styled('ul')`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${props => props.theme.spacing(2)};
  padding: ${props => props.theme.spacing(4)};
`;

export const ContainerFormStyled = styled.div<ContainerFormStyledProps>`
  padding: ${({ $isOpen, theme }) => ($isOpen ? 0 : theme.spacing(4))};
  min-width: 434px;
  flex: 1;
  flex-direction: column;
  display: flex;

  background-color: ${props => props.theme.colors.hazeGray};
`;

export const AddIconButton = styled(BsPlusSquareFill)`
  display: flex;
  align-self: flex-start;
  fill: ${props => props.theme.colors.granite};
  color: ${props => props.theme.colors.lightGrey};
  cursor: pointer;
  border-radius: ${props => props.theme.radii.xs};
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
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.primary};
  }

  &:focus {
    outline: none;
    border: ${props => props.theme.borders.normal};
    border-color: ${props => props.theme.colors.lightGrey};
  }
`;

export const NoTaskStyled = styled(BiTaskX)`
  display: flex;
  align-self: center;
  fill: ${props => props.theme.colors.lightGrey};
  margin-top: 50%;
  opacity: ${props => props.theme.opacities.dark};
`;
