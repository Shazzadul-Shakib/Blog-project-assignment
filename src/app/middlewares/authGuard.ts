import { NextFunction, Request, Response } from 'express';
import { CatchAsync } from '../utils/catchAsync';
import AppError from '../errorHandlers/AppError';
import httpStatus from 'http-status-codes';

export const authGuard = () => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access!');
    }

    // ----- Extract the token from Bearer ----- //
    const token = authHeader.split(' ')[1];
    next();
  });
};
