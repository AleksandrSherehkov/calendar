import styled from 'styled-components';
import { TaskTextStyled } from '../TaskCheckboxItem/TaskCheckboxItem.styled';

export const TasksListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${props => props.theme.spacing(1)};
`;

export const ShowMoreStyled = styled(TaskTextStyled)`
  font-style: italic;
  text-decoration: none;
`;
