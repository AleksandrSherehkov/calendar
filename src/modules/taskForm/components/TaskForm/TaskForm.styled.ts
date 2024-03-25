import styled from 'styled-components';

export const FormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${props => props.theme.spacing(4)};
  gap: ${props => props.theme.spacing(2)};
`;

export const InputFormStyled = styled.input`
  width: 100%;
  padding: 4px 0;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
`;

export const TextAreaStyled = styled.textarea`
  width: 100%;
  padding: 4px 0;
  font-size: ${props => props.theme.fontSizes.s};
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
  resize: none;
`;

export const ButtonFormWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 14px;
  gap: ${props => props.theme.spacing(5)};
`;

export const ButtonFormStyled = styled.button`
  display: flex;
  justify-content: space-between;
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
