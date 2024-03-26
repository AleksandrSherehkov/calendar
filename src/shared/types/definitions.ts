export interface ErrorResponse {
  message: string;
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
