import { CatchAsync } from '../../utils/catchAsync';
import { SendResponse } from '../../utils/sendResponse';
import { userServices } from './auth.service';
import httpStatus from 'http-status-codes';

// ----- register user ----- //
const registerUser = CatchAsync(async (req, res) => {
  const result = await userServices.registerUserService(req.body);

  SendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

// ----- login user ----- //
const loginUser = CatchAsync(async (req, res) => {
  const result = await userServices.loginUserService(req.body);

  SendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: httpStatus.OK,
    data: result,
  });
});

// ----- export controllers ----- //
export const userControllers = {
  registerUser,
  loginUser
};
