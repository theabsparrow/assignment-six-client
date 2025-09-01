"use client";

import React, { useEffect, useState } from "react";
import BlogForm from "./BlogForm";
import { USER_ROLE } from "@/constant";
import { BlogStatus, TBlog } from "@/types/blogTypes";
import { TMetaDataProps } from "@/types";
import BlogCard from "./BlogCard";
import Pagination from "../pagination/Pagination";
import { Archive, FileText } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const BlogComponent = ({
  role,
  blogInfo,
  meta,
}: {
  role: string;
  blogInfo: TBlog[];
  meta: TMetaDataProps;
}) => {
  const [open, setOpen] = useState(false);
  const [blogStatus, setBlogStatus] = useState<BlogStatus>("published");
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const statusParam = searchParams.get("status") as BlogStatus | null;
    if (statusParam) {
      setBlogStatus(statusParam);
    } else {
      setBlogStatus("published");
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("searchTerm") as string;
    const params = new URLSearchParams(searchParams.toString());
    params.set("searchTerm", value);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleStatus = (value: BlogStatus) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", value.toString());
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="px-4 lg:px-16 py-6 md:py-6 bg-gray-50 dark:bg-gray-900 min-h-screen space-y-2">
      <h1 className="text-xl text-primary font-bold">
        Total Blogs: {blogInfo.length}
      </h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex gap-3">
          <button
            onClick={() => {
              handleStatus("archived");
              setBlogStatus("archived");
            }}
            className={`flex items-center gap-2 px-4 py-1 rounded-md transition font-medium shadow-sm border cursor-pointer
          ${
            blogStatus === "archived"
              ? "bg-secondary text-primary border-primary"
              : "bg-white text-gray-600 border-gray-300 hover:bg-secondary/10"
          }
        `}
          >
            <Archive size={18} />
            Archived
          </button>

          <button
            onClick={() => {
              setBlogStatus("published");
              handleStatus("published");
            }}
            className={`flex items-center gap-2 px-4 py-1 rounded-md transition font-medium shadow-sm border  cursor-pointer
          ${
            blogStatus === "published"
              ? "bg-secondary text-primary border-primary"
              : "bg-white text-gray-600 border-gray-300 hover:bg-secondary/10"
          }
        `}
          >
            <FileText size={18} />
            Published
          </button>
          <button
            onClick={() => {
              router.push(`${pathName}`);
              setSearchText("");
            }}
            className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-1 px-4 rounded-lg shadow-md transition cursor-pointer"
          >
            Reset
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="searchTerm"
            placeholder="Search blog..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 md:max-w-sm border border-primary focus:ring-2 focus:ring-primary/50 dark:bg-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-1 rounded-l-md outline-none transition"
          />
          <button className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-1 px-4 rounded-r-lg shadow-md transition cursor-pointer border border-primary">
            Search
          </button>
        </form>
        {(role === USER_ROLE.admin ||
          role === USER_ROLE.mealProvider ||
          role === USER_ROLE.customer) && (
          <button
            onClick={() => setOpen(true)}
            className="bg-secondary hover:bg-white dark:bg-primary dark:text-secondary dark:hover:bg-green-700 border border-primary text-primary font-semibold px-4 py-2 rounded-md shadow-md transition cursor-pointer"
          >
            Create Blog
          </button>
        )}
      </div>

      {open && <BlogForm setOpen={setOpen} />}

      <div className="flex flex-col items-center gap-8 place-items-center">
        {(blogInfo as TBlog[]).length > 0 &&
          blogInfo.map((blog) => <BlogCard key={blog?._id} blog={blog} />)}
      </div>

      {(blogInfo as TBlog[]).length > 0 && (
        <div className="mt-10 flex justify-center">
          <Pagination totalPage={meta?.totalPage} />
        </div>
      )}
    </section>
  );
};

export default BlogComponent;
