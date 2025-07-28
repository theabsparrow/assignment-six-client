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
    <div className="p-4 rounded-lg border border-primary space-y-4">
      <Image
        src={foodcategory[category]}
        height={1000}
        width={1000}
        alt="customer-image"
        className="w-[20vw] h-[40vh]  rounded-xl"
      />
      <h1 className="text-2xl font-semibold">Meals for {category}</h1>
      <div className="flex items-center justify-end">
        <button
          onClick={handleCategory}
          className="bg-secondary border border-primary rounded-xl px-2 py-1 cursor-pointer hover:bg-white duration-500"
        >
          See all
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
