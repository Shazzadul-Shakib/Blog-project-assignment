import { JwtPayload } from 'jsonwebtoken';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import AppError from '../../errorHandlers/AppError';
import { formatBlogResponse } from '../../helper.ts/blogResponse';
import httpStatus from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';

// ----- create blog ----- //
const createBlogService = async (payload: TBlog, user: JwtPayload) => {
  const newPayload = { ...payload, author: user?._id };

  const result = await (
    await Blog.create(newPayload)
  ).populate('author', '_id name email');

  return formatBlogResponse(result);
};

// ----- get all blogs ----- //
const getAllBlogService = async (query: Record<string, unknown>) => {
  const blogSearchableFields = ['title', 'content'];

  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .populate();

  const result = await blogQuery.queryModel;
  //  ----- if filtered data is empty ----- //
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

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

  return formatBlogResponse(result);
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
