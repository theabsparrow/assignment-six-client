import React from "react";

const Loading = () => {
  return (
    <section className="space-y-10 w-full mx-auto md:w-[60vw] bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 px-4 md:px-16 py-6 shadow-xl rounded-xl animate-pulse">
      <div className="flex flex-col gap-10 rounded-xl w-full">
        <div className="relative w-full h-[200px] md:h-[500px] overflow-hidden rounded-lg">
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="text-left space-y-6 w-full">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="h-20 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="flex flex-wrap gap-4">
            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-md" />
          </div>
        </div>
      </div>
      <div className="border-t border-primary pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>
      </div>

      <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg" />
    </section>
  );
};

export default Loading;
