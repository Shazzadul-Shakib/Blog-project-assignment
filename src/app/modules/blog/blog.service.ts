import { JwtPayload } from 'jsonwebtoken';
import { TUser } from '../auth/auth.interface';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import AppError from '../../errorHandlers/AppError';
import { formatBlogResponse } from '../../helper.ts/blogResponse';
import httpStatus from 'http-status-codes';

// ----- create blog ----- //
const createBlogService = async (payload: TBlog, user: JwtPayload) => {
  const newPayload = { ...payload, author: user?._id };
  const result = (await Blog.create(newPayload)).populate(
    'author',
    '_id name email',
  );
  return result;
};

// ----- get all blogs ----- //
const getAllBlogService = async () => {
  const result = await Blog.find();
  return result;
};

// ----- update blog ----- //
const updateBlogService = async (payload: Partial<TBlog>, id: string) => {
  // ----- check if blog exists ----- //
  if (!Blog.isBlogExistsById(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author', '_id name email');

  const updatedBlog = formatBlogResponse(result);

  return updatedBlog;
};

// ----- delete blog ----- //
const deleteBlogService = async (id: string) => {
  // ----- check if blog exists ----- //
  if (!Blog.isBlogExistsById(id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const result = await Blog.findByIdAndDelete(id);

  return result;
};

// ----- export blog services ----- //
export const blogServices = {
  createBlogService,
  getAllBlogService,
  updateBlogService,
  deleteBlogService,
};
