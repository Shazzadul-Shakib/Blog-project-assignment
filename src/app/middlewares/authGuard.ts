import { NextFunction, Request, Response } from 'express';
import { CatchAsync } from '../utils/catchAsync';
import AppError from '../errorHandlers/AppError';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

export const authGuard = () => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access!');
    }

    // ----- extract the token from Bearer ----- //
    const token = authHeader.split(' ')[1];

    // ----- if token is not sent ----- //
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access!');
    }

    // ----- verify jwt token ----- //
    jwt.verify(
      token,
      config.access_token_secret as string,
      function (err, decoded) {
        // ----- if error in token ----- //
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access!');
        }
        // ----- if token is valid ----- //
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};
