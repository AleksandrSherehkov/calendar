import styled from 'styled-components';

export const FormStyled = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export const InputFormStyled = styled.input`
  padding-top: 4px 14px;
  font-size: ${props => props.theme.fontSizes.s};
  width: 100%;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: ${props => props.theme.borders.normal};
  border-bottom-color: ${props => props.theme.colors.darkGrey};
`;

export const ButtonFormWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 14px;
`;
