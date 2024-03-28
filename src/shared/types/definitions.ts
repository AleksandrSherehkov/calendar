export interface ErrorResponse {
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}
export interface Task {
  _id?: string;
  name: string;
  description: string;
  date: string;
  completed?: boolean;
}

export interface GetAllQueryParams {
  filterQuery?: string;
  month?: number;
  year?: number;
}

export interface PublicHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[];
  launchYear: number | null;
  types: string[];
}

export interface TasksActions {
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
  setFormErrors: (errors: { [key: string]: string }) => void;
  clearFormErrors: () => void;
}

export interface TasksState {
  filterQuery: string;
  selectedDate: Date;
  isEditing: boolean;
  tasks: Task[];
  currentTask: Task;
  isModalOpen: boolean;
  displayMode: 'month' | 'day';
  holidays: PublicHoliday[];
  formErrors: { [key: string]: string };
}
