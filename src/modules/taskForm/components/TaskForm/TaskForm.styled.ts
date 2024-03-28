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
  padding: 4px 4px;
  border: unset;

  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;

  font-size: ${props => props.theme.fontSizes.xs};
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
`;

export const TextAreaStyled = styled.textarea`
  width: 100%;
  padding: 4px 4px;
  font-size: ${props => props.theme.fontSizes.s};
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
  resize: none;

  font-size: ${props => props.theme.fontSizes.xs};
`;

export const ButtonFormWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 14px;
  gap: ${props => props.theme.spacing(5)};
`;
