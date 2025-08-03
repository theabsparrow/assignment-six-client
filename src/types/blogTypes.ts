export type TBlogPost = {
  title: string;
  content: string;
  coverImage: string;
  tags: string[] | string;
};

export type BlogStatus = "published" | "archived";
export type TBlog = {
  _id: string;
  authorId: string;
  name: string;
  title: string;
  content: string;
  excerpts: string;
  coverImage: string;
  tags?: string[];
  status: BlogStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
