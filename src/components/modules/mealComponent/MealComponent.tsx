"use client";

import RecendMealCard from "@/components/home/RecentMeals.jsx/RecendMealCard";
import Pagination from "@/components/pagination/Pagination";
import { TMetaDataProps } from "@/types";
import { TMealFormData } from "@/types/mealType";
import MealFiltering from "./MealFiltering";

const MealComponent = ({
  MealInfo,
  meta,
}: {
  MealInfo: TMealFormData[];
  meta: TMetaDataProps;
}) => {
  const highestPrice = Math.max(...MealInfo.map((meal) => meal?.price));
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="md:flex-1">
        <MealFiltering length={MealInfo?.length} highestPrice={highestPrice} />
      </div>
      <div className="py-32 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MealInfo.map((item: TMealFormData) => (
            <RecendMealCard key={item?._id} meal={item} />
          ))}
        </div>
        {MealInfo?.length > 0 && <Pagination totalPage={meta?.totalPage} />}
      </div>
    </div>
  );
};

export default MealComponent;
