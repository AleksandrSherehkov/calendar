import { FC, useEffect, useState } from 'react';
import {
  getMonth,
  getYear,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  addYears,
  addDays,
} from 'date-fns';

import { CalendarWrapperStyled } from './Calendar.styled';
import {
  addTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
  updateTaskCompleted,
} from '../../../../services/api/tasksApi';
import Modal from '../../../../shared/components/Modal/Modal';
import { Task } from '../../../../shared/types/definitions';

import { ControlPanel } from '../ControlPanel/ControlPanel';
import { DaysOfWeek } from '../DaysOfWeek/DaysOfWeek';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { TaskForm } from '../../../taskForm/components/TaskForm/TaskForm';
import { Title } from '../../../../shared/components/Title/Title';
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from '../../heplers/constants';
import { DayPlans } from '../../../dayPlan/components/DayPlans';

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

const initialTaskState: Task = {
  name: '',
  description: '',
  date: new Date().toISOString(),
};

export const Calendar: FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>(initialTaskState);
  const [isEditing, setIsEditing] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState('month');

  const year = getYear(selectedDate);
  const month = getMonth(selectedDate);
  const grid = generateCalendarGrid(year, month);
  const monthName = monthsInNominativeCase[month];

  const nextDay = () => setSelectedDate(current => addDays(current, 1));
  const previousDay = () => setSelectedDate(current => addDays(current, -1));
  const previousMonth = () =>
    setSelectedDate(current => addMonths(current, -1));
  const nextMonth = () => setSelectedDate(current => addMonths(current, 1));
  const previousYear = () => setSelectedDate(current => addYears(current, -1));
  const nextYear = () => setSelectedDate(current => addYears(current, 1));
  const resetToToday = () => setSelectedDate(new Date());

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllTasks({ month: month + 1, year });
        setTasks(response);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    })();
  }, [year, month, currentTask]);

  const handleAddNewTaskDoubleClick = (date: Date) => {
    setCurrentTask({ ...initialTaskState, date: date.toISOString() });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const addNewTask = async (task: Omit<Task, '_id'>) => {
    try {
      const addedTask = await addTask(task);
      setIsEditing(true);
      setCurrentTask(addedTask);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add new task', error);
    }
  };

  const handleUpdateTask = async () => {
    if (currentTask._id) {
      try {
        const updatedTask = await updateTaskById(currentTask._id, {
          name: currentTask.name,
          description: currentTask.description,
          date: currentTask.date,
        });
        setCurrentTask(updatedTask);
        setIsModalOpen(false);
        setCurrentTask(initialTaskState);
      } catch (error) {
        console.error('Failed to update task', error);
      }
    }
  };

  const handleUpdateCompletedTask = async (task: Task) => {
    if (task._id) {
      try {
        const updatedTask = await updateTaskCompleted(
          task._id,
          !task.completed
        );

        setCurrentTask(updatedTask);
      } catch (error) {
        console.error('Failed to update task completed status', error);
      }
    }
  };

  const deleteTask = async (id: string) => {
    if (id) {
      try {
        await deleteTaskById(id);
        const updatedTasks = await getAllTasks({ month: month + 1, year });
        setTasks(updatedTasks);
        handleCloseModal();
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    } else {
      console.error('No task ID provided for deletion');
    }
  };

  const handleTaskDoubleClick = async (task: Task) => {
    try {
      if (task._id) {
        const fetchedTask = await getTaskById(task._id);
        setCurrentTask(fetchedTask);
        setIsModalOpen(true);
      } else {
        throw new Error('Task ID is undefined');
      }
    } catch (error) {
      console.error('Failed to fetch task details', error);
    }
  };

  const handleShowMoreClick = (date: Date) => {
    setSelectedDate(date);
    setDisplayMode(DISPLAY_MODE_DAY);
  };

  const handleInputChange = (field: keyof Task, value: string) => {
    setCurrentTask(prevTask => ({
      ...prevTask,
      [field]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (isEditing && currentTask._id) {
        await handleUpdateTask();
      } else {
        await addNewTask({
          name: currentTask.name,
          description: currentTask.description,
          date: currentTask.date,
        });
      }
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const handleCloseModal = () => {
    setCurrentTask(initialTaskState);
    setIsEditing(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <CalendarWrapperStyled>
        <Title text="Календар" />
        <ControlPanel
          monthName={monthName}
          selectedDate={selectedDate}
          previousDay={previousDay}
          nextDay={nextDay}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
          previousYear={previousYear}
          nextYear={nextYear}
          resetToToday={resetToToday}
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />
        {displayMode === DISPLAY_MODE_MONTH ? (
          <>
            <DaysOfWeek />
            <CalendarGrid
              grid={grid}
              tasks={tasks}
              handleShowMoreClick={handleShowMoreClick}
              handleUpdateCompletedTask={handleUpdateCompletedTask}
              handleAddNewTaskDoubleClick={handleAddNewTaskDoubleClick}
              handleTaskDoubleClick={handleTaskDoubleClick}
              month={month}
            />
          </>
        ) : (
          <DayPlans
            tasks={tasks}
            selectedDay={selectedDate}
            handleUpdateCompletedTask={handleUpdateCompletedTask}
          />
        )}
      </CalendarWrapperStyled>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TaskForm
          currentTask={currentTask}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          handleCloseModal={handleCloseModal}
          deleteTask={deleteTask}
          isEditing={isEditing}
        />
      </Modal>
    </>
  );
};
