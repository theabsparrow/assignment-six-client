"use server";

import { TBlogPost } from "@/types/blogTypes";
import { getValidToken } from "../authService/validToken";
import { config } from "@/config";
import { revalidateTag } from "next/cache";

export const createBlog = async (blogInfo: TBlogPost) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/blog/create-blog`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogInfo),
    });
    const result = await res.json();
    revalidateTag("Blogs");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllBlogs = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.status) {
      params.append("status", query?.status.toString());
    }

    const res = await fetch(
      `${config.next_public_base_api}/blog/blogs?limit=20&${params}`,
      {
        method: "GET",
        next: {
          tags: ["Blogs"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
