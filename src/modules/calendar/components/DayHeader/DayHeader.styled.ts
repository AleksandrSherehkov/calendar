import styled from 'styled-components';

interface DayWrapperStyledProps {
  $isToday: boolean;
}

export const RowInCellStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
`;

export const HolidayStyled = styled.p`
  width: 84%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${props => props.theme.colors.red};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.xs};

  &:hover::after {
    content: attr(data-title);
    position: absolute;
    width: max-content;
    bottom: 100%;
    left: 0;
    transform: translateX(-50%);
    padding: 4px 8px;
    background: ${props => props.theme.colors.red};
    color: white;
    border-radius: 4px;
    font-size: 0.75rem;
    z-index: 10;
    white-space: nowrap;
    text-align: center;
  }
`;

export const DayWrapperStyled = styled.span<DayWrapperStyledProps>`
  position: relative;
  height: ${props => props.theme.spacing(6.5)};
  width: ${props => props.theme.spacing(6.5)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $isToday, theme }) =>
    $isToday ? theme.colors.red : 'none'};
  border-radius: ${props => props.theme.radii.round};
  border: none;
  cursor: pointer;

  transition: all ${props => props.theme.transitions.regular};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.darkGrey};
    color: ${props => props.theme.colors.lightGrey};

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:hover::after {
    content: 'Подвійний клік, щоб додати нову';
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: ${props => props.theme.radii.xxs};
    padding: 4px 8px;
    font-size: 0.75em;
    z-index: 1;
    display: block;
  }
`;
