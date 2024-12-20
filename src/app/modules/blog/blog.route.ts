import { Router } from 'express';
import { blogControllers } from './blog.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { blogValidationSchema } from './blog.validation';
import { authGuard } from '../../middlewares/authGuard';

export const blogRoutes = Router();

blogRoutes.post(
  '/',
  validateRequest(blogValidationSchema),
  blogControllers.creteBlog,
);
blogRoutes.get(
  '/',authGuard(),
  blogControllers.getAllBlogs,
);
