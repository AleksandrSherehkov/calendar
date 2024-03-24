import React, { FC } from 'react';

import { Task } from '../../../../shared/types/definitions';
import {
  ButtonFormWrapperStyled,
  FormStyled,
  InputFormStyled,
} from './TaskForm.styled';

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
      <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>
      <InputFormStyled
        type="text"
        name="taskName"
        value={currentTask.name}
        onChange={e => handleInputChange('name', e.target.value)}
        placeholder="Назва"
      />
      <InputFormStyled
        type="text"
        name="taskDiscription"
        value={currentTask.description}
        onChange={e => handleInputChange('description', e.target.value)}
        placeholder="Опис"
      />

      <ButtonFormWrapperStyled>
        <button type="button" onClick={handleCloseModal}>
          Cancel
        </button>
        <button type="submit">{isEditing ? 'Edit' : 'Add'}</button>
        {isEditing && currentTask._id && (
          <button
            type="button"
            onClick={() => currentTask._id && deleteTask(currentTask._id)}
          >
            Delete
          </button>
        )}
      </ButtonFormWrapperStyled>
    </FormStyled>
  );
};
