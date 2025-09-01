const Loading = () => {
  return (
    <section className="flex flex-col md:flex-row gap-10 md:px-16 px-5">
      <div className="hidden md:flex flex-col bg-gray-100 dark:bg-gray-600 rounded-md shadow-md w-2xs px-5 py-5 space-y-5 h-[calc(100vh-64px)] sticky top-[64px] animate-pulse">
        <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-32 md:py-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <section
            key={i}
            className="p-4 rounded-2xl bg-gray-200 dark:bg-gray-800 shadow-md flex flex-col gap-4 animate-pulse"
          >
            <div className="flex justify-center">
              <div className="w-52 h-52 border-4 border-gray-300 dark:border-gray-700 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="h-6 w-24 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="h-6 w-24 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="h-6 w-24 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="h-6 w-28 rounded-full bg-gray-300 dark:bg-gray-700" />
            </div>
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <hr className="border border-gray-300 dark:border-gray-700" />
            <div className="h-7 w-48 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <div className="flex items-center justify-between">
              <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-md" />
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-lg" />
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default Loading;
