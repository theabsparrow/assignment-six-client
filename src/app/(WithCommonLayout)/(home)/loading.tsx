import { Soup } from "lucide-react";

const Loading = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-8 border-orange-300 dark:border-gray-700 border-t-transparent animate-spin"></div>
        <div className="absolute flex items-center justify-center">
          <Soup className="w-14 h-14 text-orange-500 dark:text-orange-400 animate-pulse" />
        </div>
      </div>
      <p className="mt-8 text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Serving your meal... please wait 🍴
      </p>
    </section>
  );
};

export default Loading;
