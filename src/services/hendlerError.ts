import { AxiosError } from 'axios';
import { ErrorResponse } from '../shared/types/definitions';

export const handleError = (error: AxiosError<ErrorResponse>): never => {
  if (error.response) {
    console.error(
      `Error response: ${error.response.status}: ${error.response.data.message}`
    );
    throw new Error(error.response.data.message || 'An unknown error occurred');
  } else if (error.request) {
    console.error('The request was made but no response was received');
    throw new Error('The server did not respond');
  } else {
    console.error('Error', error.message);
    throw new Error('Error creating request');
  }
};
