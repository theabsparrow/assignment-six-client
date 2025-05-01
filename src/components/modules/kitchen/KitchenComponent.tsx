"use client";

import { KitchenProfileCardProps } from "@/types/kitchenType";
import KitchenCard from "./KitchenCard";
import Pagination from "@/components/pagination/Pagination";
import { TMetaDataProps } from "@/types";

const KitchenComponent = ({
  kitchenInfo,
  meta,
}: {
  kitchenInfo: KitchenProfileCardProps[];
  meta: TMetaDataProps;
}) => {
  return (
    <section className="px-4 sm:px-8 lg:px-20 py-12 bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Discover Our Kitchens
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
          Explore a variety of kitchens run by passionate chefs. Each kitchen
          has its own unique taste and story. Find the one that suits your
          flavor!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {kitchenInfo?.length > 0 ? (
          <>
            {kitchenInfo.map((kitchen) => (
              <KitchenCard key={kitchen?._id} kitchenData={kitchen} />
            ))}
            <Pagination totalPage={meta?.totalPage} />
          </>
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg">
            No kitchens available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default KitchenComponent;
