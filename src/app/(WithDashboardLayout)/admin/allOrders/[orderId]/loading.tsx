const Loading = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-2xl overflow-hidden w-full md:w-[60vw] mx-auto px-2 md:px-4 py-6 animate-pulse">
      <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg space-y-4">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-600 rounded-md mx-auto"></div>
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
      </div>
      <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg space-y-4 mt-4">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-600 rounded-md mx-auto"></div>
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
          <div className="w-full md:w-1/3 h-40 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          <div className="w-full md:w-2/3 space-y-3">
            <div className="h-5 w-2/3 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="flex justify-between">
              <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
              <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
              <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            </div>
            <div className="h-5 w-28 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg mt-4 flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between">
        <div className="space-y-3 w-full md:w-1/2">
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="h-5 w-28 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
        <div className="space-y-3 w-full md:w-1/2">
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          <div className="h-5 w-28 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
      </div>
      <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg mt-4 space-y-4">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-600 rounded-md mx-auto"></div>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-2">
            <div className="h-5 w-28 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
          <div className="space-y-2">
            <div className="h-5 w-28 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className="px-2 md:px-6 py-4 shadow-xl rounded-lg mt-4 space-y-4">
        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-600 rounded-md mx-auto"></div>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
          </div>
          <div className="h-20 w-full md:w-1/3 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
