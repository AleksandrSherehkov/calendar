import styled from 'styled-components';
import { TbCalendarSearch } from 'react-icons/tb';

export const CalendarWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  box-shadow: ${props => props.theme.shadows.primary};
  background-color: ${props => props.theme.colors.black};
`;

export const WrapperSearchStyled = styled.div`
  display: flex;

  align-items: center;
  width: 20%;
  margin-bottom: 20px;
`;

export const InputFormStyled = styled.input`
  width: 100%;
  padding: 4px 0;
  border: unset;

  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;

  font-size: ${props => props.theme.fontSizes.xs};
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
`;

export const SearchIconStyled = styled(TbCalendarSearch)`
  stroke: ${props => props.theme.colors.granite};
`;
