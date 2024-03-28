import React, { FC } from 'react';
import useTasksStore from '@/store/zustandStore/useTaskStore';

import { Task } from '../../../../shared/types/definitions';
import {
  ButtonFormWrapperStyled,
  ErrorStyled,
  FormStyled,
  InputFormStyled,
  TextAreaStyled,
} from './TaskForm.styled';
import { Title } from '../../../../shared/components/Title/Title';
import { Button } from '@/shared/components/Button/Button';

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
  const formErrors = useTasksStore.use.formErrors();

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
      <ErrorStyled>{formErrors?.name && formErrors.name}</ErrorStyled>
      <TextAreaStyled
        name="taskDiscription"
        value={currentTask.description}
        onChange={e => handleInputChange('description', e.target.value.trim())}
        placeholder="Опис"
        rows={6}
      />
      <ErrorStyled>
        {formErrors?.description && formErrors.description}
      </ErrorStyled>

      <ButtonFormWrapperStyled>
        <Button onClick={handleCloseModal} text="Cancel" />
        <Button type="submit" text={!isEditing ? 'Edit' : 'Add'} />

        {!isEditing && currentTask._id && (
          <Button
            onClick={() => currentTask._id && deleteTask(currentTask._id)}
            text="Delete"
          />
        )}
      </ButtonFormWrapperStyled>
    </FormStyled>
  );
};
