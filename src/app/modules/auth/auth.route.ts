import { Router } from 'express';
import { userControllers } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { userValidationSchema } from './auth.validation';

export const authRoutes = Router();

authRoutes.post(
  '/register',
  validateRequest(userValidationSchema),
  userControllers.registerUser,
);
