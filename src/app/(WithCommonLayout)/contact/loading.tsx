const Loading = () => {
  return (
    <section className="bg-gradient-to-r from-gray-300 to-secondary dark:from-gray-900 dark:to-gray-800 py-6 md:px-16 px-5">
      <div className="container mx-auto md:px-24 px-5 space-y-6">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mx-auto animate-pulse" />

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg space-y-6 animate-pulse">
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded-md mb-4" />
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
                <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
                <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
                <div className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
              </div>
              <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse" />
            <div className="space-y-4 animate-pulse">
              <div className="h-5 w-56 bg-gray-300 dark:bg-gray-700 rounded-md" />
              <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
              <div className="h-5 w-48 bg-gray-300 dark:bg-gray-700 rounded-md" />
            </div>
            <div className="w-full h-60 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
