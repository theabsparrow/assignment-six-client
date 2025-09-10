const LoadingCategory = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-2xl border border-primary shadow-sm bg-white dark:bg-gray-900 space-y-4 animate-pulse"
        >
          <div className="w-full h-[250px] bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 mx-auto rounded" />
          <div className="flex justify-end">
            <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCategory;
