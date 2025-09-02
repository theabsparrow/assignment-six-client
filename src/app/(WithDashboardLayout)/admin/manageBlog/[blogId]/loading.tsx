const Loading = () => {
  return (
    <section className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden w-full md:w-[70vw] mx-auto md:px-16 px-5 space-y-4 animate-pulse">
      <div className="relative w-full h-[200px] md:h-[500px] overflow-hidden rounded-lg">
        <div className="w-full h-full bg-gray-300 dark:bg-gray-700" />
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
        </div>
        <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-xl" />
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"
          />
        ))}
      </div>

      <div className="space-y-3">
        <div className="h-7 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-5 w-11/12 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-5 w-10/12 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-5 w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </section>
  );
};

export default Loading;
