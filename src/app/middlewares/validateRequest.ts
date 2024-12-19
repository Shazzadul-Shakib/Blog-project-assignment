import { AnyZodObject } from 'zod';
import { CatchAsync } from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

export const validateRequest = (schema: AnyZodObject) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);
    next();
  });
};
