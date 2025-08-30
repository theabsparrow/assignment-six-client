const Loading = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden max-w-4xl mx-auto px-4 py-4 space-y-4 md:space-y-10 animate-pulse">
      {/* Image placeholder */}
      <div>
        <div className="w-full md:h-[70vh] h-64 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-xl" />
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {/* Title + description */}
        <div className="space-y-2">
          <div className="h-6 md:h-8 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Info row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="space-y-1">
              <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          ))}
        </div>

        {/* Kitchen link */}
        <div className="flex items-center">
          <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>

        {/* Dietary / Ingredients / Allergies / Days / Time */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="space-y-2">
              <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-xl"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Price + Rating + Checkout */}
        <div className="flex items-start justify-between border-t border-gray-300 dark:border-gray-700 py-4">
          <div className="space-y-3">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-5 w-52 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default Loading;
