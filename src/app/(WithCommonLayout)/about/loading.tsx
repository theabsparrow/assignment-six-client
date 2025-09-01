const Loading = () => {
  return (
    <section className="bg-gradient-to-b from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 animate-pulse md:px-16 px-5">
      <div className="relative h-[60vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="h-10 md:h-16 w-48 md:w-72 bg-gray-200 dark:bg-gray-600 rounded-md mb-4" />
          <div className="h-4 md:h-6 w-72 md:w-[28rem] bg-gray-200 dark:bg-gray-600 rounded-md" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16 text-center space-y-8">
        <div className="h-6 md:h-10 w-40 md:w-60 bg-gray-300 dark:bg-gray-700 rounded-md mx-auto" />
        <div className="h-4 md:h-6 w-full md:w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md mx-auto" />
      </div>

      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-gradient-to-tr from-purple-100 via-indigo-100 to-pink-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-md space-y-4"
            >
              <div className="h-10 w-10 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full" />
              <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md mx-auto" />
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
              <div className="h-4 w-5/6 mx-auto bg-gray-300 dark:bg-gray-700 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      <div className="py-20 bg-gradient-to-r from-secondary to-gray-400 text-center">
        <div className="max-w-2xl mx-auto space-y-6 px-4">
          <div className="h-6 md:h-10 w-48 md:w-72 bg-gray-300 dark:bg-gray-700 rounded-md mx-auto" />
          <div className="h-4 md:h-6 w-full md:w-2/3 bg-gray-300 dark:bg-gray-700 rounded-md mx-auto" />
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default Loading;
