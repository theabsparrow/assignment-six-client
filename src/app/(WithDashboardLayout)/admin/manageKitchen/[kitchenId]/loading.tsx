const Loading = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 dark:bg-gray-600 shadow-lg rounded-2xl overflow-hidden w-full md:w-[60vw] mx-auto px-4 md:px-10 py-4 space-y-4 md:space-y-10 animate-pulse">
      <div className="flex flex-col gap-4">
        <div className="relative w-full h-[200px] md:h-[500px] overflow-hidden rounded-lg">
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700" />
        </div>

        <div className="space-y-4">
          <div className="h-8 md:h-10 w-3/4 md:w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:gap-2">
            <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div className="flex flex-wrap items-center justify-start md:justify-between gap-2 md:gap-0">
            <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:gap-10 space-y-4 md:space-y-0">
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-10 space-y-4 md:space-y-0">
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>

        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
      <div className="flex items-center justify-center ">
        <div className="h-[35vh] w-[90%] md:w-[35vw] bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
      </div>
    </section>
  );
};

export default Loading;
