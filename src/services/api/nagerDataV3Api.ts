import axios, { AxiosError } from 'axios';
import { handleError } from '../hendlerError';
import { ErrorResponse, PublicHoliday } from '../../shared/types/definitions';

const instance = axios.create({
  baseURL: 'https://date.nager.at/api/v3',
});

export const getPublicHolidays = async (
  year: number,
  countryCode: string
): Promise<PublicHoliday[]> => {
  try {
    const { data } = await instance.get<PublicHoliday[]>(
      `/PublicHolidays/${year}/${countryCode}`
    );
    return data;
  } catch (error) {
    const typedError = error as AxiosError<ErrorResponse>;
    handleError(typedError);

    throw typedError;
  }
};
