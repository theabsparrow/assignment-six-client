const TableLoadingComponent = () => {
  return (
    <section className="overflow-x-auto w-full pb-44 space-y-10">
      <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-4 px-4 space-y-4 animate-pulse relative">
        <div className="h-6 md:h-8 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="absolute left-44 top-11 flex md:hidden">
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="hidden md:flex items-center gap-4 flex-wrap">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-10 md:h-12 w-36 md:w-44 bg-gray-300 dark:bg-gray-700 rounded-md"
              ></div>
            ))}
          <div className="h-10 md:h-12 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
        <div className="flex flex-col gap-4 md:hidden">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md"
              ></div>
            ))}
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>

      <table className="min-w-full divide-y divide-blue-200 bg-white shadow-md rounded-xl">
        <thead className="bg-primary">
          <tr>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <th
                  key={i}
                  className="px-3 py-3 text-left text-sm font-semibold text-white tracking-wide uppercase"
                >
                  <div className="h-4 w-20 md:w-24 bg-white/40 dark:bg-gray-400 rounded animate-pulse"></div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-800">
          {Array(10)
            .fill(0)
            .map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {Array(10)
                  .fill(0)
                  .map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-3 py-3 text-sm whitespace-nowrap"
                    >
                      <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default TableLoadingComponent;
