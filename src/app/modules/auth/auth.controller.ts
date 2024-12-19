import { CatchAsync } from '../../utils/catchAsync';
import { SendResponse } from '../../utils/sendResponse';
import { userServices } from './auth.service';
import httpStatus from 'http-status-codes';

// ----- register user ----- //
const registerUser = CatchAsync(async (req, res) => {
  const result = await userServices.registerUserService(req.body);

  SendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});

// ----- export controllers ----- //
export const userControllers = {
  registerUser,
};
