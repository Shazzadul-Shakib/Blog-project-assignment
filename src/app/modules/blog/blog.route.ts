import { Router } from 'express';
import { blogControllers } from './blog.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { blogValidationSchema } from './blog.validation';
import { authGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../auth/auth.constant';

export const blogRoutes = Router();

blogRoutes.post(
  '/',
  validateRequest({ body: blogValidationSchema }),
  blogControllers.creteBlog,
);
blogRoutes.get(
  '/',
  authGuard(USER_ROLE.user, USER_ROLE.admin),
  blogControllers.getAllBlogs,
);
