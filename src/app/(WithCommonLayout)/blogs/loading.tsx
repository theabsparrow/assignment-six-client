const Loading = () => {
  return (
    <section className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden w-full md:w-[90%] lg:w-[70%] mx-auto md:px-16 px-5 space-y-4">
      <div className="animate-pulse">
        <h1 className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded-md mb-6" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Buttons */}
          <div className="flex gap-3">
            <div className="h-9 w-28 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <div className="h-9 w-28 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <div className="h-9 w-20 bg-gray-300 dark:bg-gray-700 rounded-md" />
          </div>

          {/* Search bar */}
          <div className="flex w-full md:max-w-sm">
            <div className="h-9 flex-1 bg-gray-300 dark:bg-gray-700 rounded-l-md" />
            <div className="h-9 w-20 bg-gray-300 dark:bg-gray-700 rounded-r-md" />
          </div>

          {/* Create button */}
          <div className="hidden md:block h-9 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden w-full md:w-[90%] lg:w-[70%] mx-auto p-4 space-y-4">
        <div className="relative w-full h-[200px] md:h-[500px] overflow-hidden rounded-lg animate-pulse">
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between space-y-2 md:space-y-0 animate-pulse">
          <div className="flex flex-col gap-2 text-sm animate-pulse">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
          </div>
          <div className="flex items-center animate-pulse">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-xl" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 animate-pulse">
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>

        <div className="space-y-2 animate-pulse">
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md" />
        </div>
      </div>
    </section>
  );
};

export default Loading;
