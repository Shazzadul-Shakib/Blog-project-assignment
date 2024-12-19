import { ErrorRequestHandler } from 'express';
import { TError } from '../interface/error';
import config from '../config';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let error: TError = [{ path: '', message }];

  res.status(statusCode).json({
    success: false,
    message,
    error,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
