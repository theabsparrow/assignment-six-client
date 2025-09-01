import TableLoadingComponent from "@/components/loadingComponent/TableLoadingComponent";

const loading = () => {
  return (
    <section>
      <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-4 px-4 space-y-4 animate-pulse relative">
        <div className="h-6 md:h-8 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="hidden md:flex items-center gap-4 flex-wrap">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-10 md:h-12 w-44 bg-gray-300 dark:bg-gray-700 rounded-md"
              ></div>
            ))}
        </div>
      </div>
      <TableLoadingComponent />
    </section>
  );
};

export default loading;
