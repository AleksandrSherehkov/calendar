import styled from 'styled-components';

export const CalendarWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${props => props.theme.spacing(1.5)};
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
