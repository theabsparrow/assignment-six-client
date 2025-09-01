const Loading = () => {
  return (
    <section className="md:w-[70vw] mx-auto p-6 mt-10 bg-white dark:bg-gray-800 shadow rounded-xl space-y-10 animate-pulse">
      <div className="h-10 w-1/3 md:w-1/4 bg-gray-300 dark:bg-gray-700 mx-auto rounded-md"></div>
      <div className="border border-gray-400 dark:border-gray-600 px-10 py-5 space-y-4 rounded-lg">
        <div className="h-8 w-1/4 bg-gray-300 dark:bg-gray-700 mx-auto rounded-md"></div>
        <div className="flex flex-col md:flex-row items-start gap-4 space-y-4">
          <div className="space-y-4 w-full md:w-1/2">
            <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="flex gap-3">
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            </div>
            <div className="h-6 w-1/6 bg-gray-300 dark:bg-gray-700 rounded-md mt-4"></div>
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="flex gap-3 mt-2">
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
      <div className="h-32 w-full bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      <div className="h-20 w-full bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="h-[35vh] w-[90%] md:w-[35vw] bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      </div>
    </section>
  );
};

export default Loading;
