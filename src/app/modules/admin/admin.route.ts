import { Router } from 'express';
import { adminControllers } from './admin.controller';
import { authGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../auth/auth.constant';

export const adminRoutes = Router();

adminRoutes.post(
  '/users/:userId/block',
  authGuard(USER_ROLE.admin),
  adminControllers.blockUser,
);
adminRoutes.delete(
  '/blogs/:id',
  authGuard(USER_ROLE.admin),
  adminControllers.deleteBlog,
);
