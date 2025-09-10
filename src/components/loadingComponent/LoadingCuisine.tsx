const LoadingCuisine = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="min-w-[75vw] md:min-w-[45vw] lg:min-w-[22vw] p-4 mx-2 rounded-2xl border border-primary shadow-sm bg-white dark:bg-gray-900 space-y-4 animate-pulse"
        >
          <div className="w-full h-[200px] sm:h-[240px] bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="h-6 w-2/3 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="flex justify-end">
            <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCuisine;
