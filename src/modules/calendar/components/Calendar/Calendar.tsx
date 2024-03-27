import { FC, useEffect } from 'react';
import useTasksStore from '@/store/zustandStore/useTaskStore';
import {
  getMonth,
  getYear,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns';

import {
  CalendarWrapperStyled,
  InputFormStyled,
  SearchIconStyled,
  WrapperSearchStyled,
} from './Calendar.styled';

import Modal from '../../../../shared/components/Modal/Modal';
import { Task } from '../../../../shared/types/definitions';

import { ControlPanel } from '../ControlPanel/ControlPanel';
import { DaysOfWeek } from '../DaysOfWeek/DaysOfWeek';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { TaskForm } from '../../../taskForm/components/TaskForm/TaskForm';
import { Title } from '../../../../shared/components/Title/Title';
import { DISPLAY_MODE_MONTH } from '../../heplers/constants';
import { DayPlans } from '../../../dayPlan/components/DayPlans';
import { useDebounce } from 'use-debounce';

const monthsInNominativeCase = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

const generateCalendarGrid = (year: number, month: number) => {
  const start = startOfWeek(startOfMonth(new Date(year, month)), {
    weekStartsOn: 1,
  });
  const end = endOfWeek(addDays(endOfMonth(new Date(year, month)), 1), {
    weekStartsOn: 1,
  });
  const days = eachDayOfInterval({ start, end });

  const totalDays = 42;
  const daysToAdd = totalDays - days.length;
  for (let i = 0; i < daysToAdd; i++) {
    days.push(addDays(end, i + 1));
  }

  let week: Date[] = [];
  const grid: Date[][] = [];

  days.forEach((day, index) => {
    week.push(day);
    if ((index + 1) % 7 === 0) {
      grid.push(week);
      week = [];
    }
  });

  return grid;
};

export const Calendar: FC = () => {
  const fetchTasks = useTasksStore.use.fetchTasks();
  const deleteTask = useTasksStore.use.deleteTask();
  const addNewTask = useTasksStore.use.addNewTask();
  const displayMode = useTasksStore.use.displayMode();

  const isModalOpen = useTasksStore.use.isModalOpen();
  const setIsModalOpen = useTasksStore.use.setIsModalOpen();
  const handleCloseModal = useTasksStore.use.closeModal();
  const isEditing = useTasksStore.use.isEditing();

  const currentTask = useTasksStore.use.currentTask();

  const setCurrentTask = useTasksStore.use.setCurrentTask();
  const selectedDate = useTasksStore.use.selectedDate();

  const filterQuery = useTasksStore.use.filterQuery();
  const setFilterQuery = useTasksStore.use.setFilterQuery();
  const fetchHolidays = useTasksStore.use.fetchHolidays();

  const handleUpdateTask = useTasksStore.use.updateTask();

  const [debouncedFilterQuery] = useDebounce(filterQuery, 300);

  const year = getYear(selectedDate);
  const month = getMonth(selectedDate);
  const grid = generateCalendarGrid(year, month);
  const monthName = monthsInNominativeCase[month];

  useEffect(() => {
    fetchHolidays(year, 'UA');
  }, [year, month, fetchHolidays]);

  useEffect(() => {
    fetchTasks({
      filterQuery,
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
        <ControlPanel monthName={monthName} />
        <WrapperSearchStyled>
          <InputFormStyled
            type="text"
            placeholder="Фільтрація"
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value.trim())}
          />
          <SearchIconStyled />
        </WrapperSearchStyled>

        {displayMode === DISPLAY_MODE_MONTH ? (
          <>
            <DaysOfWeek />
            <CalendarGrid grid={grid} month={month} />
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
