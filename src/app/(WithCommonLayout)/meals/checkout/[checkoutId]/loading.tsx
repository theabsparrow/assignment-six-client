const Loading = () => {
  return (
    <section className=" w-full py-10 md:px-24 px-5">
      <div className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden mx-auto px-4 py-4 space-y-4 md:space-y-10 flex flex-col md:flex-row justify-between items-start md:gap-30 animate-pulse">
        {/* Left: Checkout Form */}
        <div className="w-full rounded-xl py-4 px-10 border border-primary space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>

          {/* Form fields */}
          <div className="space-y-6 flex items-start justify-between">
            <div className="space-y-4 w-full max-w-md">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>

            {/* Right side (day/time/etc.) */}
            <div className="space-y-4 w-full max-w-sm">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-full bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
          </div>

          {/* Confirmation button */}
          <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>

        {/* Right: Order Info */}
        <section className="space-y-4 border border-primary p-4 rounded-lg w-full md:w-[30vw]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2 border-dashed border-b pb-4">
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </section>

        {/* Right: Match Percentage (only desktop) */}
        <section className="space-y-6 hidden md:block w-full md:w-[25vw]">
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between gap-20">
              <div className="h-16 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-16 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
          <div className="h-12 w-60 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </section>
      </div>
    </section>
  );
};

export default Loading;
