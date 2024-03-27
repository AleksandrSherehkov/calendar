import { FC, useEffect } from 'react';
import useTasksStore from '@/store/zustandStore/useTaskStore';
import { getMonth, getYear } from 'date-fns';

import { CalendarWrapperStyled } from './Calendar.styled';

import Modal from '../../../../shared/components/Modal/Modal';
import { Task } from '../../../../shared/types/definitions';

import { ControlPanel } from '../ControlPanel/ControlPanel';
import { DaysOfWeek } from '../DaysOfWeek/DaysOfWeek';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { TaskForm } from '../../../taskForm/components/TaskForm/TaskForm';
import { Title } from '../../../../shared/components/Title/Title';
import { DISPLAY_MODE_MONTH } from '../../constants/constants';
import { DayPlans } from '../../../dayPlan/components/DayPlans';
import { useDebounce } from 'use-debounce';
import { SearchFilter } from '../SearchFilter/SearchFilter';

export const Calendar: FC = () => {
  const fetchTasks = useTasksStore.use.fetchTasks();
  const fetchHolidays = useTasksStore.use.fetchHolidays();
  const addNewTask = useTasksStore.use.addNewTask();
  const handleUpdateTask = useTasksStore.use.updateTask();
  const setIsModalOpen = useTasksStore.use.setIsModalOpen();
  const handleCloseModal = useTasksStore.use.closeModal();
  const setCurrentTask = useTasksStore.use.setCurrentTask();
  const isEditing = useTasksStore.use.isEditing();
  const currentTask = useTasksStore.use.currentTask();
  const isModalOpen = useTasksStore.use.isModalOpen();
  const displayMode = useTasksStore.use.displayMode();
  const selectedDate = useTasksStore.use.selectedDate();
  const filterQuery = useTasksStore.use.filterQuery();
  const year = getYear(selectedDate);
  const month = getMonth(selectedDate);

  const [debouncedFilterQuery] = useDebounce(filterQuery, 300);

  useEffect(() => {
    fetchHolidays(year, 'UA');
  }, [year, month, fetchHolidays]);

  useEffect(() => {
    fetchTasks({
      filterQuery: debouncedFilterQuery,
      month: month + 1,
      year,
    });
  }, [year, month, currentTask, debouncedFilterQuery]);

  useEffect(() => {
    if (displayMode === DISPLAY_MODE_MONTH) {
      setIsModalOpen(false);
    }
  }, [displayMode]);

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
    try {
      if (!isEditing && currentTask._id) {
        await handleUpdateTask();
      } else {
        addNewTask({
          name: currentTask.name,
          description: currentTask.description,
          date: currentTask.date,
        });
      }
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <>
      <CalendarWrapperStyled>
        <Title text="Календар" />
        <ControlPanel />
        <SearchFilter />
        {displayMode === DISPLAY_MODE_MONTH ? (
          <>
            <DaysOfWeek />
            <CalendarGrid />
          </>
        ) : (
          <DayPlans
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
        )}
      </CalendarWrapperStyled>
      {isModalOpen && displayMode === DISPLAY_MODE_MONTH && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TaskForm
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
        </Modal>
      )}
    </>
  );
};
