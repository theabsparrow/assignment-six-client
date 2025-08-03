"use client";

const BlogCardSceleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden w-full md:w-[90%] lg:w-[70%] mx-auto p-4 space-y-4">
      <div className="w-full h-[200px] md:h-[500px] bg-gray-200 dark:bg-gray-700 rounded-lg" />

      <div className="space-y-2">
        <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-4 w-[90%] bg-gray-300 dark:bg-gray-600 rounded" />
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default BlogCardSceleton;
