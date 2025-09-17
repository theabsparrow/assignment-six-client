const Loading = () => {
  return (
    <section className="flex justify-center items-center min-h-screen w-full md:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            key={idx}
            className="w-full h-full p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 animate-pulse bg-white dark:bg-gray-900 space-y-4"
          >
            <div className=" w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700" />

            <div className="flex flex-col space-y-2">
              <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, starIdx) => (
                <div
                  key={starIdx}
                  className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded"
                />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Loading;
