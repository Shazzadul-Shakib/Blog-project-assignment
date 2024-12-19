import { TUser } from './auth.interface';
import { User } from './auth.model';

// ----- register user ----- //
const registerUserService = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

// ----- export auth services ----- //
export const userServices = {
  registerUserService,
};
