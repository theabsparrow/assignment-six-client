"use client";

import { TBlog } from "@/types/blogTypes";
import Image from "next/image";
import Link from "next/link";

const ArticleCard = ({ blog }: { blog: TBlog }) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(blog?.createdAt));
  return (
    <div className=" flex flex-col bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden mx-auto p-4 space-y-4">
      <div className="relative md:w-[25vw] overflow-hidden rounded-lg border">
        <Image
          src={blog?.coverImage}
          alt="Cover Image"
          width={700}
          height={700}
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-row-reverse items-center justify-between  text-sm text-gray-600 dark:text-gray-300">
        <p>📅 {formattedDate}</p>
        <p className="text-xl font-semibold">✍️ {blog?.name}</p>
      </div>
      {blog?.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-secondary text-primary  text-xs rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex-grow">
        {blog?.title}
      </h2>

      <div className="flex flex-col justify-between ">
        <p className="text-gray-700 dark:text-gray-200 ">
          {blog?.excerpts.slice(0, 150)}...
        </p>
        <Link
          href={`/blogs/${blog?._id}`}
          className="text-primary dark:text-blue-400 font-medium hover:underline cursor-pointer mt-2"
        >
          View Full Article
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
