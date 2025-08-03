import { TSixMealData } from "@/types/mealType";
import Image from "next/image";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { GiForkKnifeSpoon } from "react-icons/gi";

const MealCard = ({ meal }: { meal: TSixMealData }) => {
  return (
    <section className="p-6 md:p-8 rounded-2xl bg-gray-200 dark:bg-gray-800 shadow-md flex flex-col gap-4">
      <div className="flex justify-center group">
        <Image
          src={meal?.imageUrl || "/default.jpg"}
          alt={meal?.title || "Meal Image"}
          height={700}
          width={700}
          className="w-52 h-52 border-4 border-secondary 
                 rounded-full transition-all duration-500 hover:w-[66vw] ease-in-out group-hover:rounded-xl"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-1 bg-secondary dark:bg-blue-800 text-primary dark:text-blue-100 rounded-full shadow-sm">
          <MdOutlineFastfood className="text-base" />
          <span className="font-medium capitalize">{meal?.cuisineType}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-primary dark:bg-green-500 text-secondary dark:text-green-900 rounded-full shadow-sm">
          <GiForkKnifeSpoon className="text-base" />
          <span className="font-medium capitalize">{meal?.foodCategory}</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full shadow-sm">
          <FaLeaf className="text-base" />
          <span className="font-medium capitalize">{meal?.foodPreference}</span>
        </div>
      </div>

      <hr className="border border-primary" />

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex-grow">
        {meal?.title}
      </h2>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-primary dark:text-secondary font-bold text-xl">
          <TbCurrencyTaka className="text-xl" />
          {meal?.price}
        </span>
        <Link
          href={`/meals/${meal?._id}`}
          className="bg-secondary text-primary border border-primary px-4 py-2 rounded-xl font-medium hover:bg-primary hover:border-secondary hover:text-secondary transition-all duration-500"
        >
          View Details
        </Link>
      </div>
    </section>
  );
};

export default MealCard;
