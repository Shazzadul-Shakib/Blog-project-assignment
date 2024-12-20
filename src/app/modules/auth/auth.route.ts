import { Router } from 'express';
import { userControllers } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  userLoginValidationSchema,
  userValidationSchema,
} from './auth.validation';

export const authRoutes = Router();

authRoutes.post(
  '/register',
  validateRequest(userValidationSchema),
  userControllers.registerUser,
);
authRoutes.post(
  '/login',
  validateRequest(userLoginValidationSchema),
  userControllers.loginUser,
);
