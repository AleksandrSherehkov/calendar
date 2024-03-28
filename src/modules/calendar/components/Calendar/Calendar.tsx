import { FC, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { getMonth, getYear } from 'date-fns';

import useTasksStore from '@/store/zustandStore/useTaskStore';

import Modal from '@/shared/components/Modal/Modal';
import { Title } from '@/shared/components/Title/Title';

import { ControlPanel } from '../ControlPanel/ControlPanel';
import { DaysOfWeek } from '../DaysOfWeek/DaysOfWeek';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { TaskForm } from '../../../taskForm/components/TaskForm/TaskForm';
import { DISPLAY_MODE_MONTH } from '../../constants/constants';
import { DayPlans } from '../../../dayPlan/components/DayPlan/DayPlans';
import { SearchFilter } from '../SearchFilter/SearchFilter';

import { CalendarWrapperStyled } from './Calendar.styled';

export const Calendar: FC = () => {
  const shouldRefetchTasks = useTasksStore.use.shouldRefetchTasks();

  const fetchTasks = useTasksStore.use.fetchTasks();
  const fetchHolidays = useTasksStore.use.fetchHolidays();

  const setIsModalOpen = useTasksStore.use.setIsModalOpen();
  const handleCloseModal = useTasksStore.use.closeModal();

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
  }, [year, month, shouldRefetchTasks, debouncedFilterQuery, fetchTasks]);

  useEffect(() => {
    if (displayMode === DISPLAY_MODE_MONTH) {
      setIsModalOpen(false);
    }
  }, [displayMode, setIsModalOpen]);

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
          <DayPlans />
        )}
      </CalendarWrapperStyled>
      {isModalOpen && displayMode === DISPLAY_MODE_MONTH && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TaskForm />
        </Modal>
      )}
    </>
  );
};
