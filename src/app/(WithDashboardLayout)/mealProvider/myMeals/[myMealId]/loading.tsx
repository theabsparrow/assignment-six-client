const Loading = () => {
  return (
    <section className="space-y-10 w-full bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 px-4 md:px-16 py-6 shadow-xl rounded-xl animate-pulse">
      {/* Top section */}
      <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-36 rounded-xl w-full">
        {/* Image */}
        <div className="w-52 h-52 bg-gray-300 dark:bg-gray-700 rounded-xl" />

        {/* Content */}
        <div className="text-left space-y-6 w-full">
          {/* Title */}
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-md" />

          {/* Description */}
          <div className="h-20 w-full bg-gray-300 dark:bg-gray-700 rounded-md" />

          {/* Category, Preference, Cuisine, Size */}
          <div className="flex flex-wrap gap-4">
            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>

          {/* Rating + Creation */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
          </div>

          {/* Price + Status */}
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
            <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-md" />
          </div>
        </div>
      </div>

      {/* Arrays Section */}
      <div className="border-t border-primary pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>
        </div>
      </div>

      {/* Ingredients & Delete */}
      <div className="space-y-4">
        <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>
      </div>

      <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg" />
    </section>
  );
};

export default Loading;
