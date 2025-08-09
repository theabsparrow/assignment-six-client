"use client";

const KitchenProfileSceleton = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden max-w-4xl mx-auto px-4 md:px-10 py-4 space-y-4 md:space-y-10 animate-pulse">
      {/* Image */}
      <div className="w-full h-[70vh] bg-gray-300 dark:bg-gray-500 rounded-xl" />

      <div className="space-y-4">
        {/* Kitchen Name */}
        <div className="h-8 w-1/2 bg-gray-300 dark:bg-gray-500 rounded" />

        {/* License Link */}
        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-500 rounded" />

        {/* Hygiene Status */}
        <div className="flex gap-4">
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-500 rounded" />
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-500 rounded" />
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-500 rounded-full" />
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-500 rounded-full" />
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-500 rounded-full" />
        </div>

        {/* Kitchen Creation + Owner */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="h-6 w-48 bg-gray-300 dark:bg-gray-500 rounded" />
          <div className="h-6 w-48 bg-gray-300 dark:bg-gray-500 rounded" />
        </div>
      </div>

      {/* Preferences & Meal Time */}
      <div className="space-y-4">
        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-500 rounded" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-20 bg-gray-300 dark:bg-gray-500 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Cooking Days */}
      <div className="space-y-4">
        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-500 rounded" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-20 bg-gray-300 dark:bg-gray-500 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Special Equipments */}
      <div className="space-y-4">
        <div className="h-6 w-48 bg-gray-300 dark:bg-gray-500 rounded" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-24 bg-gray-300 dark:bg-gray-500 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Delete Button */}
      <div className="h-10 w-32 bg-gray-300 dark:bg-gray-500 rounded" />
    </section>
  );
};

export default KitchenProfileSceleton;
