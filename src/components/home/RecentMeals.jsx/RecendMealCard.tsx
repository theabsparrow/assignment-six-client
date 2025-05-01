import { TMealFormData } from "@/types/mealType";
import Image from "next/image";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdOutlineFastfood } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";

const RecendMealCard = ({ meal }: { meal: TMealFormData }) => {
  return (
    <div className="flex flex-col bg-gradient-to-r from-violet-100 to-sky-100 dark:from-violet-900 dark:to-sky-900 rounded-2xl shadow-2xl overflow-hidden group hover:scale-105 transition-transform duration-300 p-5 min-h-[500px]">
      {/* Image Section */}
      <div className="relative h-60 rounded-xl overflow-hidden bg-white">
        <Image
          src={meal?.imageUrl || "/default.jpg"}
          alt={meal?.title || "Meal Image"}
          layout="fill"
          objectFit="contain"
          className="transition-opacity duration-300 group-hover:opacity-90"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5 space-y-4">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 leading-tight min-h-[56px]">
          {meal?.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {meal?.description}
        </p>

        {/* Cuisine Type, Food Category, Food Preference */}
        <div className="flex flex-wrap gap-2 mt-2">
          {meal?.cuisineType && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-200 dark:bg-pink-700 text-pink-800 dark:text-pink-200 text-xs rounded-full">
              <MdOutlineFastfood /> {meal.cuisineType}
            </span>
          )}
          {meal?.foodCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
              <GiMeal /> {meal?.foodCategory}
            </span>
          )}
          {meal?.foodPreference && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 text-xs rounded-full">
              <FaLeaf /> {meal.foodPreference}
            </span>
          )}
        </div>

        {/* Push price to bottom */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-300 dark:border-gray-700 mt-auto">
          <span className="text-xl font-extrabold text-purple-600 dark:text-purple-400 flex items-center gap-1">
            <TbCurrencyTaka className="text-2xl" />
            {meal?.price?.toFixed(2)}
          </span>
          <Link
            href={`/meals/${meal?._id}`}
            className="text-sm font-semibold text-green-700 dark:text-purple-300 hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecendMealCard;
