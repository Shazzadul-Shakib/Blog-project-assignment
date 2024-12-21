export const formatBlogResponse = (blog: any) => {
  return {
    _id: blog?._id,
    title: blog.title,
    content: blog.content,
    author: {
      _id: blog?.author?._id,
      name: blog?.author?.name,
      email: blog?.author?.email,
    },
  };
};
