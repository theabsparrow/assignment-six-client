"use client";

import { foodCategory } from "@/components/modules/dashboard/mealProvider/createMeal/createMeal.const";
import SearchAndSelect from "@/components/searchAndSelect/SearchAndSelect";
import Link from "next/link";

const FoodCategoryBanner = () => {
  return (
    <section
      style={{ backgroundImage: `url('/food-category.webp')` }}
      className="relative min-h-[400px] md:min-h-[625px] bg-center bg-cover bg-no-repeat  px-5 md:px-20 py-5 md:py-10 overflow-hidden flex"
    >
      <div className="absolute inset-0 bg-black/70  z-10 " />
      <div className="absolute z-20 w-[95%] md:w-[80%] h-[80%] md:h-[90%] bg-[#1c1c1c] top-[20%] md:top-[5%] left-[3%] md:left-[10%] bg-[url('/category.webp')] bg-cover bg-center bg-no-repeat px-3 py-3 md:px-10 md:py-4">
        <div className="space-y-2 md:space-y-10 md:w-[35vw]">
          <h2 className="text-2xl text-white md:text-7xl font-bold leading-tight font-playfair bg-gray-800/70 md:bg-transparent p-2 md:p-0 rounded-lg">
            Discover Delicious Meals by Category
          </h2>

          {/* Description */}
          <p className=" text-gray-300 md:w-[25vw] font-inter bg-gray-800/70 md:bg-transparent p-2 md:p-0 rounded-lg">
            Whether you`re craving a hearty breakfast, a satisfying lunch, a
            delicious dinner, or a quick snack — choose your category and browse
            tailored meals made just for you.
          </p>

          {/* Dropdown + Button */}
          <div className="flex md:gap-16 items-start justify-between md:justify-start mt-2 md:mt-0">
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
