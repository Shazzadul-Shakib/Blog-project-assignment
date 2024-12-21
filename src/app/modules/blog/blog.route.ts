import { Router } from 'express';
import { blogControllers } from './blog.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  blogValidationSchema,
  updateBlogValidationSchema,
} from './blog.validation';
import { authGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../auth/auth.constant';
import { checkOwnership } from '../../middlewares/checkOwnership';

export const blogRoutes = Router();

blogRoutes.post(
  '/',
  authGuard(USER_ROLE.user),
  validateRequest({ body: blogValidationSchema }),
  blogControllers.createBlog,
);
blogRoutes.get('/', blogControllers.getAllBlogs);
blogRoutes.patch(
  '/:id',
  authGuard(USER_ROLE.user),
  checkOwnership,
  validateRequest({ body: updateBlogValidationSchema }),
  blogControllers.updateBlog,
);
blogRoutes.delete(
  '/:id',
  authGuard(USER_ROLE.user),
  checkOwnership,
  blogControllers.deleteBlog,
);
