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
  view: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

type TAuthor = {
  _id: string;
};

export type TAllBlogListing = {
  _id: string;
  authorId: TAuthor;
  name: string;
  title: string;
  status: BlogStatus;
  view: number;
  createdAt: string;
};
