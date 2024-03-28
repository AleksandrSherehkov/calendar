import React from 'react';
import { z } from 'zod';

import useTasksStore from '@/store/zustandStore/useTaskStore';

import { FormErrors, Task } from '@/shared/types/definitions';

import { Title } from '@/shared/components/Title/Title';
import { Button } from '@/shared/components/Button/Button';
import { taskSchema } from './taskFormValidation';

import {
  ButtonFormWrapperStyled,
  ErrorStyled,
  FormStyled,
  InputFormStyled,
  TextAreaStyled,
} from './TaskForm.styled';

export const TaskForm = () => {
  const currentTask = useTasksStore.use.currentTask();
  const handleCloseModal = useTasksStore.use.closeModal();
  const deleteTask = useTasksStore.use.deleteTask();
  const isEditing = useTasksStore.use.isEditing();
  const formErrors = useTasksStore.use.formErrors();
  const setFormErrors = useTasksStore.use.setFormErrors();
  const clearFormErrors = useTasksStore.use.clearFormErrors();
  const addNewTask = useTasksStore.use.addNewTask();
  const handleUpdateTask = useTasksStore.use.updateTask();
  const setCurrentTask = useTasksStore.use.setCurrentTask();

  const handleInputChange = <K extends keyof Task>(
    field: K,
    value: Task[K]
  ) => {
    setCurrentTask({
      ...currentTask,
      [field]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearFormErrors();

    try {
      const validatedTask = taskSchema.parse({
        name: currentTask.name,
        description: currentTask.description,
      });

      if (!isEditing && currentTask._id) {
        await handleUpdateTask();
      } else {
        addNewTask({
          name: validatedTask.name,
          description: validatedTask.description,
          date: currentTask.date,
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newFormErrors = error.errors.reduce<FormErrors>(
          (acc, currError) => {
            if (typeof currError.path[0] === 'string') {
              acc[currError.path[0]] = currError.message;
            }
            return acc;
          },
          {}
        );

        setFormErrors(newFormErrors);
      } else {
        console.error('Failed to update task', error);
      }
    }
  };

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
