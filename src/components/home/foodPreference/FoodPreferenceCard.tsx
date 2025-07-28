"use client";

import { foodPreference } from "@/constant/foodPreference.const";
import { FoodPreferenceOption } from "@/types/mealType";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const FoodPreferenceCard = ({
  preference,
}: {
  preference: FoodPreferenceOption;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePreference = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("foodPreference", preference.toString());
    router.push(`/meals?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="p-6 rounded-2xl border border-primary bg-white dark:bg-gray-900 space-y-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-center">
        <Image
          src={foodPreference[preference]}
          width={800}
          height={800}
          alt={`${preference} meal image`}
          className="w-full max-w-xs h-56 object-cover rounded-xl"
        />
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white capitalize">
        The {preference} Meals
      </h2>

      <div className="flex justify-end">
        <button
          onClick={handlePreference}
          className="px-4 py-2 text-sm font-medium text-primary border border-primary bg-secondary hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 cursor-pointer"
        >
          See all
        </button>
      </div>
    </div>
  );
};

export default FoodPreferenceCard;
