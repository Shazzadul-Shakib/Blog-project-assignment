import { model, Schema } from 'mongoose';
import { BlogModel, TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog, BlogModel>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// ----- check if blog exists ----- //
blogSchema.statics.isBlogExistsById = async function (id: string) {
  return await Blog.findById(id);
};

export const Blog = model<TBlog, BlogModel>('Blog', blogSchema);
