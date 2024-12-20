import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

// ----- create blog ----- //
const createBlogService = async (payload: TBlog) => {
  const result = await Blog.create(payload);
  return result;
};

// ----- get all blogs ----- //
const getAllBlogService = async () => {
  const result = await Blog.find();
  return result;
};

// ----- export blog services ----- //
export const blogServices = {
  createBlogService,
  getAllBlogService,
};
