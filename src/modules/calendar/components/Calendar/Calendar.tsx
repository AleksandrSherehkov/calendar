import { FC, useEffect, useState } from 'react';
import {
  format,
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
import { uk } from 'date-fns/locale';
import {
  ButtonFormWrapperStyled,
  ButtonStyled,
  CalendarWrapperStyled,
  CellWrapperStyled,
  ControlPanelWrapperStyled,
  DayWeeSellStyled,
  DayWeekWrapperStyled,
  DayWrapperStyled,
  GridWrapperStyled,
  InputFormStyled,
  NameMonthStyled,
  RowInCellStyled,
  TaskItemStyled,
  TaskTextStyled,
  TasksListStyled,
  TextWrapperStyled,
  TitleStyled,
  TodayButtonStyled,
  WeekWrapperStyled,
  WraperButtonStyled,
} from './Calendar.styled';
import {
  addTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateTaskById,
} from '../../../../services/api/tasksApi';
import Modal from '../../../../shared/components/Modal/Modal';
import { Task } from '../../../../shared/types/definitions';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
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

  const year = getYear(selectedDate);
  const month = getMonth(selectedDate);
  const grid = generateCalendarGrid(year, month);
  const monthName = monthsInNominativeCase[getMonth(selectedDate)];

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
        <TitleStyled>Календар</TitleStyled>
        <ControlPanelWrapperStyled>
          <TextWrapperStyled>
            <NameMonthStyled>{monthName}</NameMonthStyled>
            <p>{format(selectedDate, 'yyyy', { locale: uk })}</p>
          </TextWrapperStyled>
          <WraperButtonStyled>
            <ButtonStyled onClick={previousYear}>«</ButtonStyled>
            <ButtonStyled onClick={previousMonth}>‹</ButtonStyled>
            <TodayButtonStyled onClick={resetToToday}>
              {format(new Date(), 'EEEE, d MMMM', { locale: uk })}
            </TodayButtonStyled>
            <ButtonStyled onClick={nextMonth}>›</ButtonStyled>
            <ButtonStyled onClick={nextYear}>»</ButtonStyled>
          </WraperButtonStyled>
        </ControlPanelWrapperStyled>
        <DayWeekWrapperStyled>
          {daysOfWeek.map(day => (
            <DayWeeSellStyled key={day}>{day}</DayWeeSellStyled>
          ))}
        </DayWeekWrapperStyled>
        <GridWrapperStyled>
          {grid.map(week => (
            <WeekWrapperStyled key={format(week[0], 'yyyy-MM-dd')}>
              {week.map(day => (
                <CellWrapperStyled
                  key={format(day, 'yyyy-MM-dd')}
                  $isWeekend={day.getDay() === 6 || day.getDay() === 0}
                  $isCurrentMonth={getMonth(day) === month}
                >
                  <RowInCellStyled>
                    <DayWrapperStyled
                      onDoubleClick={() => handleAddNewTaskDoubleClick(day)}
                      $isToday={
                        day.toDateString() === new Date().toDateString()
                      }
                    >
                      {format(day, 'd')}
                    </DayWrapperStyled>
                  </RowInCellStyled>
                  <TasksListStyled>
                    {tasks
                      .filter(
                        task =>
                          format(new Date(task.date), 'yyyy-MM-dd') ===
                          format(day, 'yyyy-MM-dd')
                      )
                      .map(task => (
                        <TaskItemStyled key={task._id}>
                          <TaskTextStyled
                            onDoubleClick={() => handleTaskDoubleClick(task)}
                          >
                            {task.name}{' '}
                          </TaskTextStyled>
                        </TaskItemStyled>
                      ))}
                  </TasksListStyled>
                </CellWrapperStyled>
              ))}
            </WeekWrapperStyled>
          ))}
        </GridWrapperStyled>
      </CalendarWrapperStyled>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleFormSubmit}>
          <InputFormStyled
            type="text"
            name="taskName"
            value={currentTask.name}
            onChange={e => handleInputChange('name', e.target.value)}
          />
          <InputFormStyled
            type="text"
            name="taskDiscription"
            value={currentTask.description}
            onChange={e => handleInputChange('description', e.target.value)}
          />

          <ButtonFormWrapperStyled>
            <button type="button" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit">{isEditing ? 'Edit' : 'Add'}</button>
            {isEditing && currentTask._id ? (
              <button
                type="button"
                onClick={() => currentTask._id && deleteTask(currentTask._id)}
              >
                Delete
              </button>
            ) : null}
          </ButtonFormWrapperStyled>
        </form>
      </Modal>
    </>
  );
};
