import React, { FC } from 'react';
import useTasksStore from '@/store/zustandStore/useTaskStore';

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
  handleInputChange: (field: keyof Task, value: string) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
}

export const TaskForm: FC<TaskFormProps> = ({
  handleInputChange,
  handleFormSubmit,
}) => {
  const currentTask = useTasksStore.use.currentTask();
  const handleCloseModal = useTasksStore.use.closeModal();
  const deleteTask = useTasksStore.use.deleteTask();
  const isEditing = useTasksStore.use.isEditing();

  return (
    <FormStyled onSubmit={handleFormSubmit}>
      <Title text={!isEditing ? 'Edit Task' : 'Add Task'} variant="form" />
      <InputFormStyled
        type="text"
        name="taskName"
        value={currentTask.name}
        onChange={e => handleInputChange('name', e.target.value.trim())}
        placeholder="Назва"
      />
      <TextAreaStyled
        name="taskDiscription"
        value={currentTask.description}
        onChange={e => handleInputChange('description', e.target.value.trim())}
        placeholder="Опис"
        rows={6}
      />

      <ButtonFormWrapperStyled>
        <ButtonFormStyled type="button" onClick={handleCloseModal}>
          Cancel
        </ButtonFormStyled>
        <ButtonFormStyled type="submit">
          {!isEditing ? 'Edit' : 'Add'}
        </ButtonFormStyled>
        {!isEditing && currentTask._id && (
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
