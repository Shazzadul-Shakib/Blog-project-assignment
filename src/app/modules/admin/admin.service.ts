import AppError from '../../errorHandlers/AppError';
import { User } from '../auth/auth.model';
import httpStatus from 'http-status-codes';
import { Blog } from '../blog/blog.model';

// ----- block user ----- //
const blockUserService = async (userId: string) => {
  const user = await User.isUserExistsById(userId);
  //   ----- check if user exists ----- //
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   ----- check if user already blocked ----- //
  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked!');
  }

  const result = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        isBlocked: true,
      },
    },
    {
      new: true,
    },
  );
  return result;
};

// ----- delete blog ----- //
const deleteBlogService = async (blogId: string) => {
  const blog = await Blog.isBlogExistsById(blogId);
  
  //   ----- check if blog exists ----- //
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};

// ----- export admin services ----- //
export const adminServices = {
  blockUserService,
  deleteBlogService,
};
