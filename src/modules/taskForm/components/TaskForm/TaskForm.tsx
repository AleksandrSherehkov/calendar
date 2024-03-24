import React, { FC } from 'react';

import { Task } from '../../../../shared/types/definitions';
import {
  ButtonFormStyled,
  ButtonFormWrapperStyled,
  FormStyled,
  InputFormStyled,
  TextAreaStyled,
} from './TaskForm.styled';
import { Title } from '../../../../shared/components/Title/Title';

interface TaskFormProps {
  currentTask: Task;
  handleInputChange: (field: keyof Task, value: string) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
  handleCloseModal: () => void;
  deleteTask: (id: string) => void;

  isEditing: boolean;
}

export const TaskForm: FC<TaskFormProps> = ({
  currentTask,
  handleInputChange,
  handleFormSubmit,
  handleCloseModal,
  deleteTask,
  isEditing,
}) => {
  return (
    <FormStyled onSubmit={handleFormSubmit}>
      <Title text={isEditing ? 'Edit Task' : 'Add Task'} variant="form" />
      <InputFormStyled
        type="text"
        name="taskName"
        value={currentTask.name}
        onChange={e => handleInputChange('name', e.target.value)}
        placeholder="Назва"
      />
      <TextAreaStyled
        name="taskDiscription"
        value={currentTask.description}
        onChange={e => handleInputChange('description', e.target.value)}
        placeholder="Опис"
        rows={6}
      />

      <ButtonFormWrapperStyled>
        <ButtonFormStyled type="button" onClick={handleCloseModal}>
          Cancel
        </ButtonFormStyled>
        <ButtonFormStyled type="submit">
          {isEditing ? 'Edit' : 'Add'}
        </ButtonFormStyled>
        {isEditing && currentTask._id && (
          <ButtonFormStyled
            type="button"
            onClick={() => currentTask._id && deleteTask(currentTask._id)}
          >
            Delete
          </ButtonFormStyled>
        )}
      </ButtonFormWrapperStyled>
    </FormStyled>
  );
};
