const LoadingBanner = () => {
  return (
    <section className="relative min-h-[400px] md:min-h-[625px] bg-gray-300 dark:bg-gray-700 px-5 md:px-20 py-5 md:py-10 overflow-hidden flex animate-pulse">
      <div className="absolute z-20 w-[95%] md:w-[80%] h-[80%] md:h-[90%] top-[20%] md:top-[5%] left-[3%] md:left-[10%] bg-gray-400 dark:bg-gray-800 px-3 py-3 md:px-10 md:py-4 rounded-lg flex flex-col justify-between">
        <div className="space-y-4 md:space-y-10 md:w-[35vw]">
          <div className="h-8 md:h-16 w-3/4 md:w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-4 md:h-6 w-full md:w-[25vw] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          <div className="flex md:gap-16 items-start justify-between md:justify-start mt-2 md:mt-0">
            <div className="h-10 w-36 md:w-48 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="h-10 w-24 md:w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingBanner;
