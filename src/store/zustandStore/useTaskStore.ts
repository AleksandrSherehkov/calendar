import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import * as tasksApi from '../../services/api/tasksApi';
import * as holidaysApi from '../../services/api/nagerDataV3Api';
import {
  GetAllQueryParams,
  PublicHoliday,
  Task,
} from '../../shared/types/definitions';
import { createSelectors } from './createSelectors';
import { addDays, addMonths, addYears, getMonth, getYear } from 'date-fns';
import { DISPLAY_MODE_DAY } from '@/modules/calendar/constants/constants';

interface TasksState {
  filterQuery: string;
  selectedDate: Date;
  isEditing: boolean;
  tasks: Task[];
  currentTask: Task;
  isModalOpen: boolean;
  displayMode: 'month' | 'day';
  holidays: PublicHoliday[];
}

interface TasksActions {
  nextDay: () => void;
  previousDay: () => void;
  nextMonth: () => void;
  previousMonth: () => void;
  nextYear: () => void;
  previousYear: () => void;
  resetToToday: () => void;
  setSelectedDate: (date: Date) => void;
  setIsEditing: (isEditing: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setDisplayMode: (mode: 'month' | 'day') => void;
  setCurrentTask: (task: Task) => void;
  showMoreTasks: (date: Date) => void;
  fetchTasks: (params: GetAllQueryParams) => Promise<void>;
  fetchHolidays: (year: number, countryCode: string) => Promise<void>;
  addNewTask: (task: Omit<Task, '_id'>) => Promise<void>;
  updateTask: () => Promise<void>;
  closeModal: () => void;
  deleteTask: (id: string) => Promise<void>;
  updateCompletedTask: (task: Task) => Promise<void>;
  addNewTaskDoubleClick: (date: Date) => void;
  еditTaskDoubleClick: (task: Task) => Promise<void>;
  setFilterQuery: (filterQuery: string) => void;
}

const initialTaskState: Task = {
  name: '',
  description: '',
  date: new Date().toISOString(),
};

const initialState: TasksState = {
  filterQuery: '',
  selectedDate: new Date(),
  isEditing: false,
  tasks: [],
  currentTask: initialTaskState,
  isModalOpen: false,
  displayMode: 'month',
  holidays: [],
};

const useTasksStore = create<TasksState & TasksActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      nextDay: () => {
        const current = get().selectedDate;
        set({ selectedDate: addDays(current, 1) });
      },
      previousDay: () => {
        const current = get().selectedDate;
        set({ selectedDate: addDays(current, -1) });
      },
      nextMonth: () => {
        const current = get().selectedDate;
        set({ selectedDate: addMonths(current, 1) });
      },
      previousMonth: () => {
        const current = get().selectedDate;
        set({ selectedDate: addMonths(current, -1) });
      },
      nextYear: () => {
        const current = get().selectedDate;
        set({ selectedDate: addYears(current, 1) });
      },
      previousYear: () => {
        const current = get().selectedDate;
        set({ selectedDate: addYears(current, -1) });
      },
      resetToToday: () => {
        set({ selectedDate: new Date() });
      },

      setSelectedDate: date => set({ selectedDate: date }),
      setIsEditing: isEditing => set({ isEditing: isEditing }),
      setFilterQuery: filterQuery => set({ filterQuery: filterQuery }),
      setIsModalOpen: isOpen => set({ isModalOpen: isOpen }),
      setDisplayMode: mode => set({ displayMode: mode }),
      setCurrentTask: task => set({ currentTask: task }),
      showMoreTasks: (date: Date) => {
        set({
          selectedDate: date,
          displayMode: DISPLAY_MODE_DAY,
        });
      },
      fetchTasks: async params => {
        try {
          const tasks = await tasksApi.getAllTasks(params);
          set({ tasks });
        } catch (error) {
          console.error('Failed to fetch tasks', error);
        }
      },
      addNewTask: async (task: Omit<Task, '_id'>) => {
        try {
          const addedTask = await tasksApi.addTask(task);
          set({
            isEditing: false,
            currentTask: addedTask,
            isModalOpen: false,
          });
        } catch (error) {
          console.error('Failed to add new task', error);
        }
      },

      deleteTask: async (id: string) => {
        try {
          await tasksApi.deleteTaskById(id);
          const updatedTasks = await tasksApi.getAllTasks({
            month: getMonth(get().selectedDate) + 1,
            year: getYear(get().selectedDate),
          });
          set({
            tasks: updatedTasks,
            currentTask: initialTaskState,
            isModalOpen: false,
            isEditing: true,
          });
        } catch (error) {
          console.error('Failed to delete task', error);
        }
      },
      updateCompletedTask: async (task: Task) => {
        if (task._id) {
          try {
            const updatedTask = await tasksApi.updateTaskCompleted(
              task._id,
              !task.completed
            );

            set({ currentTask: updatedTask });
          } catch (error) {
            console.error('Failed to update task completed status', error);
          }
        }
      },
      fetchHolidays: async (year, countryCode) => {
        const holidays = await holidaysApi.getPublicHolidays(year, countryCode);
        set({ holidays });
      },
      updateTask: async () => {
        const { currentTask } = get();
        if (currentTask._id) {
          try {
            const updatedTask = await tasksApi.updateTaskById(currentTask._id, {
              name: currentTask.name,
              description: currentTask.description,
              date: currentTask.date,
            });
            set({
              currentTask: updatedTask,
              isModalOpen: false,
              isEditing: false,
            });
            set({ currentTask: initialTaskState });
          } catch (error) {
            console.error('Failed to update task', error);
          }
        }
      },
      addNewTaskDoubleClick: (date: Date) => {
        set({
          currentTask: { ...initialTaskState, date: date.toISOString() },
          isEditing: true,
          isModalOpen: true,
        });
      },
      еditTaskDoubleClick: async (task: Task) => {
        try {
          if (task._id) {
            const fetchedTask = await tasksApi.getTaskById(task._id);
            set({
              currentTask: fetchedTask,
              isEditing: false,
              isModalOpen: true,
            });
          } else {
            throw new Error('Task ID is undefined');
          }
        } catch (error) {
          console.error('Failed to fetch task details', error);
        }
      },
      closeModal: () => {
        set({
          currentTask: initialTaskState,
          isEditing: false,
          isModalOpen: false,
        });
      },
    }),
    { name: 'TasksStore' }
  )
);
export default createSelectors(useTasksStore);