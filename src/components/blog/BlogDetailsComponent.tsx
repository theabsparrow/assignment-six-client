import { TBlog } from "@/types/blogTypes";
import Image from "next/image";

const BlogDetailsComponent = ({ blog }: { blog: TBlog }) => {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(blog?.createdAt));
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden w-full md:w-[90%] lg:w-[70%] mx-auto p-4 space-y-4">
      {blog?.coverImage && (
        <div className="relative w-full h-[200px] md:h-[500px] overflow-hidden rounded-lg">
          <Image
            src={blog?.coverImage}
            alt="Cover Image"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
        <div className="flex flex-col text-gray-600 dark:text-gray-300">
          <p>📅 {formattedDate}</p>
          <p className="text-xl font-semibold">✍️ {blog?.name}</p>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-lg border border-primary px-2 md:py-1 rounded-xl">
            {blog?.view} {blog?.view > 1 ? "Views" : "View"}
          </span>
        </div>
      </div>
      {blog?.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {blog.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-secondary text-primary rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {blog?.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-lg">
          {blog?.content}
        </p>
      </div>
    </div>
  );
};

export default BlogDetailsComponent;
