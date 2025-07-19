"use client";
import { foodPreferance } from "@/components/modules/dashboard/kitchen/kitchen.const";
import InputDropdown from "@/components/modules/formInput/InputDropdownDropdown";
import { FoodPreferenceOption } from "@/types/mealType";
import Link from "next/link";

const FoodPreferanceBanner = () => {
  return (
    <section
      style={{ backgroundImage: `url('/food-preference.webp')` }}
      className="relative min-h-[50vh] md:min-h-[85vh]  bg-[center_100%] bg-cover bg-no-repeat  px-5 md:px-20 py-5 md:py-10 overflow-hidden flex"
    >
      <div className="absolute inset-0 bg-black/70  z-10 " />
      <div className="absolute z-20 w-[95%] md:w-[80%] h-[90%] bg-[#1c1c1c] top-[4%] md:top-[5%] left-[3%] md:left-[10%] bg-[url('/preferance.webp')] bg-cover bg-[center_100%] bg-no-repeat p-6 md:p-10  rounded-lg">
        <div className="space-y-2 md:space-y-10 md:w-[35vw]">
          <h2 className="text-2xl text-white md:text-6xl font-bold leading-tight font-playfair bg-gray-800/70 md:bg-transparent p-1 md:p-0 rounded-lg">
            Choose Meals That Match Your Taste and Lifestyle
          </h2>

          <p className=" text-gray-300 md:w-[25vw] font-inter bg-gray-800/70 md:bg-transparent p-2 md:p-0 rounded-lg">
            From vegetarian and vegan delights to high-protein and gluten-free
            options{" "}
            <span className="hidden md:flex">
              — personalize your meals based on your preferences.
            </span>{" "}
            Enjoy curated dishes that suit your lifestyle, health goals, and
            cravings.
          </p>

          <div className="flex gap-4 md:gap-16 items-start sm:items-center mt-2 md:mt-0">
            <InputDropdown
              options={foodPreferance as FoodPreferenceOption[]}
              filterBy={"foodPreference"}
              name="Select Preference"
              clases="left-44 md:left-48 -top-10"
            />
            <Link
              href="/meals"
              className="bg-secondary text-primary border border-primary p-2 rounded-md hover:bg-white duration-500 transition"
            >
              Browse Meals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodPreferanceBanner;
