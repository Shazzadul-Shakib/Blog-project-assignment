import { CatchAsync } from '../../utils/catchAsync';
import { SendResponse } from '../../utils/sendResponse';
import { adminServices } from './admin.service';
import httpStatus from 'http-status-codes';

// ----- block user ----- //
const blockUser = CatchAsync(async (req, res) => {
  await adminServices.blockUserService(req.params.userId);
  SendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
  });
});

// ----- delete Blog ----- //
const deleteBlog = CatchAsync(async (req, res) => {
  await adminServices.deleteBlogService(req.params.id);
  SendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

// ----- export admin controllers ----- //
export const adminControllers = {
  blockUser,
  deleteBlog,
};
