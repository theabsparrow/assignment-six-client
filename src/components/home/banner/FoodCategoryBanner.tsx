"use client";

import { foodCategory } from "@/components/modules/dashboard/mealProvider/createMeal/createMeal.const";
import SearchAndSelect from "@/components/searchAndSelect/SearchAndSelect";
import Link from "next/link";

const FoodCategoryBanner = () => {
  return (
    <section
      style={{ backgroundImage: `url('/food-category.webp')` }}
      className="relative min-h-[400px] lg:min-h-[625px] bg-center bg-cover bg-no-repeat overflow-hidden flex"
    >
      <div className="absolute inset-0 bg-black/70  z-10 " />
      <div className="absolute z-20 w-[95%] lg:w-[90%] h-[80%] lg:h-[95%] bg-[#1c1c1c] top-[10%] lg:top-[2%] left-[3%] lg:left-[5%] bg-[url('/category.webp')] bg-cover bg-center bg-no-repeat px-3 py-3 lg:px-10 lg:py-4">
        <div className="space-y-4 lg:space-y-6 lg:w-[600px]">
          <h2 className="text-2xl lg:text-7xl text-white font-bold leading-tight font-playfair bg-gray-800/70 lg:bg-black/70 p-2 lg:p-3 rounded-lg">
            Discover Delicious Meals by Category
          </h2>

          {/* Description */}
          <p className="text-gray-300 lg:w-[600px] font-inter bg-gray-800/70 lg:bg-black/70 p-2 lg:p-3 rounded-lg">
            Whether you`re craving a hearty breakfast, a satisfying lunch, a
            delicious dinner, or a quick snack — choose your category and browse
            tailored meals made just for you.
          </p>

          {/* Dropdown + Button */}
          <div className="flex lg:gap-16 items-start justify-between lg:justify-start mt-2 lg:mt-0">
            <SearchAndSelect
              options={foodCategory}
              filterBy={"foodCategory"}
              label="Select Category"
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

export default FoodCategoryBanner;
