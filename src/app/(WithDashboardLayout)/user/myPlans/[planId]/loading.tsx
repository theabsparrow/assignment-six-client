const Loading = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-700 overflow-hidden w-full lg:w-[50vw] mx-auto px-24 py-10 space-y-6 animate-pulse">
      <div className="border-b-2 border-secondary pb-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-40 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
        <div className="h-4 w-44 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="flex items-center justify-between mt-6">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-8 w-28 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      </div>
      <div className="space-y-4 border-b-2 border-secondary pb-6">
        <div className="space-y-2">
          <div className="h-5 w-28 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-28 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"
              />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-40 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={idx}
                className="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-10 w-32 bg-red-200 dark:bg-red-600 rounded mx-auto" />
    </section>
  );
};

export default Loading;
