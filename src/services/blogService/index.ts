"use server";

import { TBlog, TBlogPost } from "@/types/blogTypes";
import { getValidToken } from "../authService/validToken";
import { config } from "@/config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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
  [key: string]: string | string[] | number | undefined;
}) => {
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.status) {
      params.append("status", query?.status.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    if (query?.limit) {
      params.append("limit", query?.limit.toString());
    } else {
      params.append("limit", "10");
    }
    const res = await fetch(
      `${config.next_public_base_api}/blog/blogs?${params}`,
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

export const getAllBlogsList = async (query?: {
  [key: string]: string | string[] | number | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.status) {
      params.append("status", query?.status.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    if (query?.sort) {
      params.append("sort", query?.sort.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/blog/all-blogs?limit=20&${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
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

export const getMyBlogs = async (query?: {
  [key: string]: string | string[] | number | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const params = new URLSearchParams();
    if (query?.searchTerm) {
      params.append("searchTerm", query?.searchTerm.toString());
    }
    if (query?.status) {
      params.append("status", query?.status.toString());
    }
    if (query?.page) {
      params.append("page", query?.page.toString());
    }
    if (query?.sort) {
      params.append("sort", query?.sort.toString());
    }
    const res = await fetch(
      `${config.next_public_base_api}/blog/my-blogs?limit=20&${params}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
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

export const getASingleBlog = async (id: string) => {
  try {
    const res = await fetch(`${config.next_public_base_api}/blog/blog/${id}`, {
      method: "GET",
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getBlogProfile = async (id: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/blog/blogProfile/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateBlog = async (id: string, data: Partial<TBlog>) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/blog/blog/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidateTag("Blogs");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateBlogStatus = async (id: string, data: Partial<TBlog>) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/blog/blog-status/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    revalidateTag("Blogs");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteBlog = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/blog/blog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
    const result = await res.json();
    revalidateTag("Blogs");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
