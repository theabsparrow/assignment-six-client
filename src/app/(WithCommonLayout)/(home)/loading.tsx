const Loading = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-white shadow-lg border-4 border-gray-200 dark:border-gray-700 animate-pulse flex items-center justify-center">
          🍲
        </div>

        <div className="absolute -top-6 left-1/2 -translate-x-1/2 space-y-2">
          <div className="w-6 h-6 bg-gradient-to-b from-gray-300/70 to-transparent rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-gradient-to-b from-gray-300/70 to-transparent rounded-full animate-bounce delay-150"></div>
          <div className="w-5 h-5 bg-gradient-to-b from-gray-300/70 to-transparent rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
      <p className="mt-6 text-lg md:text-2xl font-semibold text-gray-700 dark:text-gray-200 animate-pulse">
        Cooking something delicious for you...
      </p>
    </section>
  );
};

export default Loading;
