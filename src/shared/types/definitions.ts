export interface ErrorResponse {
  message: string;
}

export interface Task {
  _id?: string;
  name: string;
  description: string;
  date: string; // ISO 8601 date format
  completed?: boolean;
}

export interface GetAllQueryParams {
  filterQuery?: string;
  month?: number;
  year?: number;
}
