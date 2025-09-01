import TableLoadingComponent from "@/components/loadingComponent/TableLoadingComponent";

const loading = () => {
  return (
    <section>
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
      <TableLoadingComponent />
    </section>
  );
};

export default loading;
