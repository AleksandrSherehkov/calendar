import { TbCalendarSearch } from 'react-icons/tb';
import styled from 'styled-components';

export const WrapperSearchStyled = styled.div`
  display: flex;

  align-items: center;
  width: 20%;
  margin-bottom: ${props => props.theme.spacing(5)};
`;

export const InputFormStyled = styled.input`
  width: 100%;
  padding: 4px 4px;
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
