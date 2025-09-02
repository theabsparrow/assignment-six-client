const Loading = () => {
  return (
    <section className="mx-auto w-full md:w-[80vw] py-10 space-y-10">
      <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-4 px-4 space-y-4 animate-pulse relative">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-between ">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-10 w-28 md:h-28 md:w-36 bg-gray-300 dark:bg-gray-700 rounded-md"
              ></div>
            ))}
        </div>
      </div>

      <div className="space-y-10 animate-pulse">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-5 md:gap-20">
          <div className="flex flex-col items-center md:items-start">
            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="w-[350px] h-[350px] flex items-end justify-around bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 bg-gray-300 dark:bg-gray-700 rounded"
                  style={{ height: `${30 + i * 40}px` }}
                ></div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <div className="h-5 w-52 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="w-[350px] h-[300px] flex items-end justify-around bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 bg-gray-300 dark:bg-gray-700 rounded"
                  style={{ height: `${50 + i * 30}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-30">
          <div className="w-full flex flex-col items-center">
            <div className="h-5 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            <div className="w-[200px] h-[200px] rounded-full border-[20px] border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="h-5 w-72 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            <div className="w-[200px] h-[200px] rounded-full border-[20px] border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="h-5 w-80 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
            <div className="w-[200px] h-[200px] rounded-full border-[20px] border-gray-300 dark:border-gray-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
