const Loading = () => {
  return (
    <section className="space-y-6 p-6 min-h-screen mx-auto animate-pulse w-full lg:w-[50vw]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-2 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md" />
              <div className="h-8 w-44 bg-gray-300 dark:bg-gray-700 rounded-md" />
            </div>
          ))}
      </div>
      <div className="flex flex-col md:flex-row md:gap-44 gap-4 items-center">
        <div className="space-y-1">
          <div className="h-2 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="h-36 w-44 bg-gray-300 dark:bg-gray-700 rounded-md" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="h-2 w-28 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(18)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <div className="h-8 w-44 bg-gray-300 dark:bg-gray-700 rounded-md" />
              </div>
            ))}
        </div>
      </div>
      <div className="space-y-1">
        <div className="h-2 w-28 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <div className="h-8 w-44 bg-gray-300 dark:bg-gray-700 rounded-md" />
              </div>
            ))}
        </div>
      </div>
      <div className="space-y-1">
        <div className="h-2 w-28 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <div className="h-8 w-44 bg-gray-300 dark:bg-gray-700 rounded-md" />
              </div>
            ))}
        </div>
      </div>
      <div className="space-y-1">
        <div className="h-2 w-28 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i}>
                <div className="h-8 w-44 bg-gray-300 dark:bg-gray-700 rounded-md" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
