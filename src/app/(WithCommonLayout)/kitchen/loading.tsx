const Loading = () => {
  return (
    <section className="space-y-4 animate-pulse md:px-16 px-5">
      <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-2 px-4 md:px-4 md:py-4 space-y-2 md:space-y-4 sticky top-10 md:top-0 z-10 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="hidden md:flex items-center gap-10">
          <div className="h-10 w-64 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <section
            key={i}
            className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden transition p-4 animate-pulse"
          >
            <div className="h-[30vh] w-full bg-gray-300 dark:bg-gray-700 rounded-xl mb-4" />
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md" />
              </div>
              <div className="flex items-center h-5 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md" />
              <div className="flex items-center h-5 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md" />
              <div className="flex items-center justify-between mt-2">
                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-xl" />
                <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Loading;
