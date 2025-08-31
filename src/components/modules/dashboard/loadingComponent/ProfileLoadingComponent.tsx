const ProfileLoadingComponent = () => {
  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6 animate-pulse">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 shadow-lg rounded-2xl">
        {/* Profile Image */}
        <div className="rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-white shadow-md md:w-96 w-72 md:h-96 h-72" />

        {/* Profile Info */}
        <div className="space-y-4 w-full">
          {/* Name */}
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />

          {/* Status + Dropdown */}
          <div className="flex items-center justify-between">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-28" />
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-full w-20" />
          </div>

          {/* Bio */}
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />

          {/* Tags */}
          <div className="flex gap-3 flex-wrap">
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>

          {/* DOB */}
          <div className="h-6 w-56 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Contact Info Card */}
        <div className="p-6 bg-gradient-to-r from-blue-100 to-indigo-200 shadow-lg rounded-xl w-full space-y-4">
          <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg"
            />
          ))}
        </div>

        {/* Details Card */}
        <div className="p-6 bg-gradient-to-r from-teal-100 to-cyan-200 shadow-lg rounded-xl w-full space-y-4">
          <div className="h-6 w-36 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="border border-red-400 px-6 md:px-10 py-6 rounded-md bg-white dark:bg-gray-950 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
          <div className="h-6 w-56 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </section>
  );
};

export default ProfileLoadingComponent;
