import TableLoadingComponent from "@/components/loadingComponent/TableLoadingComponent";

const Loading = () => {
  return (
    <section>
      <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-2 px-4 md:px-4 md:py-4 space-y-2 md:space-y-4 animate-pulse">
        <div className="h-6 md:h-8 w-1/3 md:w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="absolute left-44 top-11 flex md:hidden">
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="hidden md:flex flex-col space-y-4">
          <div className="flex items-center justify-between gap-4">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-10 md:h-12 w-full bg-gray-300 dark:bg-gray-700 rounded-md"
                ></div>
              ))}
            <div className="h-10 md:h-12 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div className="flex gap-4">
            <div className="w-[20vw] space-y-2">
              <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                <div className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
              </div>
              <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            </div>

            <div className="w-32 h-10 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:hidden">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-md"
              ></div>
            ))}
          <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
      <TableLoadingComponent />
    </section>
  );
};

export default Loading;
