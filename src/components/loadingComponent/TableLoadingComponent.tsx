const TableLoadingComponent = () => {
  return (
    <section className="overflow-x-auto w-full pb-44">
      <table className="min-w-full divide-y divide-blue-200 bg-white shadow-md rounded-xl">
        {/* Table Header Skeleton */}
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

        {/* Table Body Skeleton */}
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
