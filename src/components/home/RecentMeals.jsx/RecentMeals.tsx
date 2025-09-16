import { getAllMeals } from "@/services/mealService";
import { TMealFormData } from "@/types/mealType";
import MealCard from "@/components/mealCard/MealCard";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";
import LoadingCategory from "@/components/loadingComponent/LoadingCategory";

const RecentMeals = async () => {
  const query: Record<string, string | string[] | number | undefined> = {};
  query.limit = 6;
  query.isAvailable = "true";
  const { data } = await getAllMeals(query);
  const mealInfo = data?.result || [];

  return (
    <section className="w-full lg:px-16 px-4 space-y-6">
      <div className=" md:max-w-4xl mx-auto text-center space-y-4 pb-4 px-2 md:px-6">
        <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Explore Our Latest Culinary Creations
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          Discover freshly prepared meals, thoughtfully crafted by passionate
          local chefs using the finest ingredients.
        </p>
      </div>

      <div
        className="h-[20vw] md:h-[25vh] w-full  bg-cover bg-center shadow-md"
        style={{
          backgroundImage: `url('/recent-meal.webp')`,
        }}
      />
      {mealInfo?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mealInfo.map((item: TMealFormData) => (
            <MealCard key={item?._id} meal={item} />
          ))}
        </div>
      ) : (
        <LoadingCategory />
      )}

      <div className="flex justify-center items-center">
        <Link
          href="/meals"
          className="bg-secondary text-primary border border-primary px-4 py-2 rounded-xl font-medium hover:bg-primary hover:border-secondary hover:text-secondary transition-all duration-500 flex items-center gap-1"
        >
          See All
          <IoArrowForward />
        </Link>
      </div>
    </section>
  );
};

export default RecentMeals;
