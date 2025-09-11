"use client";

import { cuisineType } from "@/components/modules/dashboard/mealProvider/createMeal/createMeal.const";
import SearchAndSelect from "@/components/searchAndSelect/SearchAndSelect";
import Link from "next/link";

const FoodCuisineBanner = () => {
  return (
    <section
      style={{ backgroundImage: `url('/cuisine-type.webp')` }}
      className="relative min-h-[400px] lg:min-h-[625px] bg-center bg-cover bg-no-repeat  px-5 md:px-20 py-5 md:py-10 overflow-hidden flex"
    >
      <div className="absolute inset-0 bg-black/70  z-10 " />
      <div className="absolute z-20 w-[95%] lg:w-[90%] h-[80%] lg:h-[95%] bg-[#1c1c1c] top-[20%] lg:top-[2%] left-[3%] lg:left-[5%] bg-[url('/cuisine.webp')] bg-cover bg-center bg-no-repeat px-3 py-3 lg:px-10 lg:py-4 flex lg:justify-end rounded-lg">
        <div className="space-y-2 lg:space-y-6 lg:w-[600px] lg:flex flex-col items-end">
          <h2 className="ext-2xl lg:text-7xl text-white font-bold leading-tight font-playfair bg-gray-800/70 lg:bg-black/70 p-2 lg:p-3 rounded-lg text-right">
            Delicious Cuisines Around the World
          </h2>
          <p className="text-gray-300 lg:w-[600px] font-inter bg-gray-800/70 lg:bg-black/70 p-2 lg:p-3 rounded-lg text-right">
            Explore a wide variety of global flavors. Whether you`re craving
            spicy Indian curry, authentic Italian pasta, or fresh Japanese
            sushi—we’ve got it all. Select your favorite cuisine to get started.
          </p>

          <div className="flex lg:gap-16 items-start justify-between lg:justify-start mt-2 lg:mt-0">
            <SearchAndSelect
              options={cuisineType}
              filterBy={"cuisineType"}
              label="Select Cuisine"
            />
            <Link
              href="/meals"
              className="bg-secondary text-primary border border-primary p-1 md:p-2 rounded-md hover:bg-white duration-500 transition"
            >
              Browse Meals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodCuisineBanner;
