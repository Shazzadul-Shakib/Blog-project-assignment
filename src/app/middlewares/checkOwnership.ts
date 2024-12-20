import { NextFunction, Request, Response } from 'express';
import { CatchAsync } from '../utils/catchAsync';
import { Blog } from '../modules/blog/blog.model';
import AppError from '../errorHandlers/AppError';
import httpStatus from 'http-status-codes';

export const checkOwnership = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loggedInUserId = req.user._id; // From JWT payload
    const resourceId = req.params.id; // Resource ID from the route

    const resource = await Blog.findById(resourceId);
    if (!resource) {
      throw new AppError(httpStatus.NOT_FOUND, 'Resource not found');
    }

    if (resource?.author?.toString() !== loggedInUserId?.toString()) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not allowed to perform this action!',
      );
    }

    next();
  },
);
