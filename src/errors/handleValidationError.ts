import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common.interface';
import { IGenericErrorMessage } from '../interfaces/error.interface';

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    el => ({
      message: el?.message,
      path: el?.path,
    })
  );

  return {
    statusCode: 400,
    errorMessages: errors,
    message: 'Validation error',
  };
};

export default handleValidationError;
