import { AnyZodObject } from 'zod';
import { CatchAsync } from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

export const validateRequest = (
  schema: AnyZodObject | { body?: AnyZodObject; cookies?: AnyZodObject },
) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if ('body' in schema && schema.body) {
      await schema.body.parseAsync(req.body);
    }
    if ('cookies' in schema && schema.cookies) {
      await schema.cookies.parseAsync(req.cookies);
    }
    next();
  });
};
