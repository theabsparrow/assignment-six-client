import { TUSerRole } from "./userType";

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
  coverImage?: string;
  tags?: string[];
  status: BlogStatus;
  view: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TUpdateBlog = {
  title?: string;
  content?: string;
  coverImage?: string;
  tags?: string[];
  status?: BlogStatus;
  addTags?: string[];
  removeTags?: string[];
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

export type TBlogProfile = {
  _id: string;
  authorId: {
    _id: string;
    role: TUSerRole;
  };
  content: string;
  coverImage?: string;
  createdAt: string;
  name: string;
  status: BlogStatus;
  tags?: string[];
  title: string;
  view: number;
};

export type TMyBlogs = {
  _id: string;
  createdAt: string;
  excerpts: string;
  status: BlogStatus;
  title: string;
  view: number;
};
