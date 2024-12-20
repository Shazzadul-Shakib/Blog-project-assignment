import { JwtPayload } from 'jsonwebtoken';
import { TUser } from '../auth/auth.interface';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

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
const updateBlogService = async (payload: TBlog) => {
  console.log({payload})
  // const newPayload = { ...payload, author: user?._id };
  // const result = (await Blog.create(newPayload)).populate(
  //   'author',
  //   '_id name email',
  // );
  // return result;
};

// ----- export blog services ----- //
export const blogServices = {
  createBlogService,
  getAllBlogService,
  updateBlogService,
};
