import axios, { AxiosError } from 'axios';
import { handleError } from '../hendlerError';
import {
  ErrorResponse,
  GetAllQueryParams,
  Task,
} from '../../shared/types/definitions';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/tasks',
});

export const getAllTasks = async (
  params?: GetAllQueryParams
): Promise<Task[]> => {
  try {
    const { data } = await instance.get<Task[]>('/', { params });
    return data;
  } catch (error) {
    const typedError = error as AxiosError<ErrorResponse>;
    handleError(typedError);

    throw typedError;
  }
};

export const addTask = async (task: Omit<Task, '_id'>): Promise<Task> => {
  try {
    const { data } = await instance.post<Task>('/', task);
    return data;
  } catch (error) {
    const typedError = error as AxiosError<ErrorResponse>;
    handleError(typedError);

    throw typedError;
  }
};

export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const { data } = await instance.get<Task>(`/${id}`);
    return data;
  } catch (error) {
    const typedError = error as AxiosError<ErrorResponse>;
    handleError(typedError);

    throw typedError;
  }
};

export const updateTaskById = async (
  id: string,
  task: Omit<Task, '_id'>
): Promise<Task> => {
  try {
    const { data } = await instance.put<Task>(`/${id}`, task);
    return data;
  } catch (error) {
    const typedError = error as AxiosError<ErrorResponse>;
    handleError(typedError);

    throw typedError;
  }
};

export const updateTaskCompleted = async (
  id: string,
  completed: boolean
): Promise<Task> => {
  try {
    const { data } = await instance.patch<Task>(`/${id}/completed`, {
      completed,
    });
    return data;
  } catch (error) {
    const typedError = error as AxiosError<ErrorResponse>;
    handleError(typedError);

    throw typedError;
  }
};

export const deleteTaskById = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const { data } = await instance.delete<{ message: string }>(`/${id}`);
    return data;
  } catch (error) {
    const typedError = error as AxiosError<ErrorResponse>;
    handleError(typedError);

    throw typedError;
  }
};
