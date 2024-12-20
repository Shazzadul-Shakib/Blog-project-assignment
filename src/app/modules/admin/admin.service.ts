import AppError from '../../errorHandlers/AppError';
import { User } from '../auth/auth.model';
import httpStatus from 'http-status-codes';

// ----- block user ----- //
const blockUserService = async (userId: string) => {
  const user = await User.isUserExistsById(userId);
  console.log(user);
  //   ----- check if user exists ----- //
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   ----- check if user already blocked ----- //
  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked!');
  }

  const result = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        isBlocked: true,
      },
    },
    {
      new: true,
    },
  );
  return result;
};

// ----- block user ----- //
// const blockUserService = async (userId: string) => {
//   // ----- check if user exists ----- //
//   if (!User.isUserExistsById(userId)) {
//     throw new AppError(httpStatus.NOT_FOUND, 'User not found');
//   }

//   const result = await User.findByIdAndDelete(userId);
//   return result;
// };

// ----- export admin services ----- //
export const adminServices = {
  blockUserService,
};
