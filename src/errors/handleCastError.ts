import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common.interface';
import { IGenericErrorMessage } from '../interfaces/error.interface';

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];
  return {
    statusCode: 400,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
