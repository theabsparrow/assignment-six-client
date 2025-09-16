"use client";

import Pagination from "@/components/pagination/Pagination";
import { TMetaDataProps } from "@/types";
import { TMealFormData } from "@/types/mealType";
import MealFiltering from "./MealFiltering";
import MealCard from "@/components/mealCard/MealCard";

const MealComponent = ({
  MealInfo,
  meta,
}: {
  MealInfo: TMealFormData[];
  meta: TMetaDataProps;
}) => {
  const highestPrice = Math.max(...MealInfo.map((meal) => meal?.price));
  return (
    <section className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
      <div className="md:flex-1">
        <MealFiltering length={MealInfo?.length} highestPrice={highestPrice} />
      </div>
      <div className="py-32 lg:py-4 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {MealInfo.map((item: TMealFormData) => (
            <MealCard key={item?._id} meal={item} />
          ))}
        </div>
        {MealInfo?.length > 0 && <Pagination totalPage={meta?.totalPage} />}
      </div>
    </section>
  );
};

export default MealComponent;
