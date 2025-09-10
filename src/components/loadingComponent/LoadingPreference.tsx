const LoadingPreference = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl border border-primary bg-white dark:bg-gray-900 space-y-5 shadow-sm animate-pulse"
        >
          <div className="flex justify-center">
            <div className="w-full max-w-xs h-56 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
          <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 mx-auto rounded" />
          <div className="flex justify-end">
            <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingPreference;
