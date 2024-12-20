import AppError from '../../errorHandlers/AppError';
import { TLogin, TUser } from './auth.interface';
import { User } from './auth.model';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';

// ----- register user ----- //
const registerUserService = async (payload: TUser) => {
  const result = await User.create(payload);
  return {
    _id: result._id,
    name: result.name,
    email: result.email,
  };
};

// ----- login user ----- //
const loginUserService = async (payload: TLogin) => {
  // ----- checking if user exist ----- //
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid credentials');
  }

  // ----- checking if user is blocked ----- //
  if (user.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // ----- checking if password is matched ----- //
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
};

// ----- export auth services ----- //
export const userServices = {
  registerUserService,
  loginUserService,
};
