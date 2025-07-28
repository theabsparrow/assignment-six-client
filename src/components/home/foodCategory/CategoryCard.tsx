"use client";

import { foodcategory } from "@/constant/foodCategory.const";
import { TFoodCategory } from "@/types/mealType";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const CategoryCard = ({ category }: { category: TFoodCategory }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategory = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("foodCategory", category.toString());
    router.push(`/meals?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-6 rounded-2xl border border-primary shadow-sm bg-white dark:bg-gray-900 space-y-4 transition-all hover:shadow-md">
      <Image
        src={foodcategory[category]}
        alt={`${category} image`}
        width={800}
        height={800}
        className="w-full h-[250px] object-cover rounded-xl"
      />

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        Meals for {category}
      </h2>

      <div className="flex justify-end">
        <button
          onClick={handleCategory}
          className="px-4 py-2 text-sm font-medium border border-primary text-primary bg-secondary hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 cursor-pointer"
        >
          See all
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
