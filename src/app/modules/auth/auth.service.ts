import { TUser } from './auth.interface';
import { User } from './auth.model';

// ----- register user ----- //
const registerUserService = async (payload: TUser) => {
  const result = await User.create(payload);
  return {
    _id: result._id,
    name: result.name,
    email: result.email,
  };
};

// ----- export auth services ----- //
export const userServices = {
  registerUserService,
};
