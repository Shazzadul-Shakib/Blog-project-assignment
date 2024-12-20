import { CatchAsync } from '../../utils/catchAsync';
import { SendResponse } from '../../utils/sendResponse';
import { blogServices } from './blog.service';
import httpStatus from 'http-status-codes';

// ----- create blog -----//
const creteBlog = CatchAsync(async (req, res) => {
  const result = await blogServices.createBlogService(req.body);
  SendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

// ----- get all blogs -----//
const getAllBlogs = CatchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogService();
  SendResponse(res, {
    success: true,
    message: 'Blogs retrived successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

// ----- export blog controllers ----- //
export const blogControllers = {
  creteBlog,
  getAllBlogs,
};
