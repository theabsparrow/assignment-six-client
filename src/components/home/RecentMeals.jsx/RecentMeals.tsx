import { getSixMeals } from "@/services/mealService";
import { TSixMealData } from "@/types/mealType";
import MealCard from "@/components/mealCard/MealCard";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

const RecentMeals = async () => {
  const { data } = await getSixMeals();

  return (
    <section className="w-full md:px-24 px-5 py-10  space-y-10">
      <div className=" md:max-w-4xl mx-auto text-center space-y-4   pb-4 px-2 md:px-6">
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
          backgroundImage: `url('https://i.ibb.co/Z6p0SvDf/recent-meal.webp')`,
        }}
      />

      <div className="grid grid-cols-1  md:grid-cols-3 gap-8">
        {data.map((item: TSixMealData) => (
          <MealCard key={item?._id} meal={item} />
        ))}
      </div>

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
