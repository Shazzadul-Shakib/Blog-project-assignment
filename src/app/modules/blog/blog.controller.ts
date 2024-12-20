import { CatchAsync } from '../../utils/catchAsync';
import { SendResponse } from '../../utils/sendResponse';
import { blogServices } from './blog.service';
import httpStatus from 'http-status-codes';

// ----- create blog -----//
const createBlog = CatchAsync(async (req, res) => {
  const result = await blogServices.createBlogService(req.body, req.user);
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

// ----- update blog -----//
const updateBlog = CatchAsync(async (req, res) => {
  const result = await blogServices.updateBlogService(req.body, req.params.id);
  SendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

// ----- delete blog -----//
const deleteBlog = CatchAsync(async (req, res) => {
  await blogServices.deleteBlogService(req.params.id);
  SendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

// ----- export blog controllers ----- //
export const blogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
