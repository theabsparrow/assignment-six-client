"use client";
import RangeSlider from "react-range-slider-input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { foodPreferance } from "../modules/dashboard/mealProvider/kitchenProfile/kitchen.const";
import { useState } from "react";
import "react-range-slider-input/dist/style.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import {
  cuisineType,
  foodCategory,
} from "../modules/dashboard/mealProvider/createMeal/createMeal.const";

export type TQuery = {
  searchTerm?: string;
  foodCategory?: string;
  cuisineType?: string;
  foodPreference?: string;
};
type TFilterComponentProps = {
  length: number;
  total: number;
  minPrice: number;
  maxPrice: number;
};
const MealFiltering = ({
  length,
  total,
  minPrice,
  maxPrice,
}: TFilterComponentProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value.toString());
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleRangeChange = (name: string, value: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(`min${name}`, value[0].toString());
    params.set(`max${name}`, value[1].toString());
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleStatus = () => {
    const params = new URLSearchParams(searchParams.toString());
    const value = "false";
    params.set("isAvailable", value.toString());
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <section className="hidden md:flex flex-col bg-gray-50 dark:bg-gray-800 rounded-md shadow-md w-2xs px-5 py-5 space-y-4 h-[calc(100vh-64px)] sticky top-[64px] z-10">
        <h1 className="text-xl text-primary font-bold dark:text-secondary">
          Total meals: {total}
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleStatus}
            className={`flex items-center gap-2 px-4 py-1 rounded-md transition font-medium shadow-sm border cursor-pointer bg-secondary text-primary border-primary`}
          >
            See Unavailable Meals
          </button>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-primary font-bold dark:text-secondary">
            This Page: {length} Meals
          </h1>
          <button
            onClick={() => router.push(`${pathName}`)}
            className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-1 px-4 rounded-lg shadow-md transition cursor-pointer"
          >
            Reset
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            name="searchTerm"
            onChange={handleChange}
            placeholder="Search meals..."
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Food Category
          </label>
          <select
            name="foodCategory"
            onChange={handleChange}
            value={searchParams.get("foodCategory") || ""}
            className="w-full border border-gray-300 px-3 py-2 dark:bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">All</option>
            {foodCategory.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cuisine Type</label>
          <select
            name="cuisineType"
            onChange={handleChange}
            value={searchParams.get("cuisineType") || ""}
            className="w-full border border-gray-300 px-3 py-2 dark:bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">All</option>
            {cuisineType.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Food Preference
          </label>
          <select
            name="foodPreference"
            onChange={handleChange}
            value={searchParams.get("foodPreference") || ""}
            className="w-full border border-gray-300 px-3 py-2 dark:bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">All</option>
            {foodPreferance.map((pref) => (
              <option key={pref} value={pref}>
                {pref}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-3">Price range</label>
          <div className="flex items-center mb-3 md:gap-3">
            <p className="font-bold text-black dark:text-gray-100 flex items-center">
              <TbCurrencyTaka className="text-xl" />{" "}
              {priceRange[0].toLocaleString()}
            </p>{" "}
            <p>TO</p>{" "}
            <p className="font-bold text-black dark:text-gray-100 flex items-center">
              <TbCurrencyTaka className="text-xl" />{" "}
              {priceRange[1].toLocaleString()}
            </p>
          </div>
          <RangeSlider
            min={minPrice}
            max={maxPrice}
            step={1}
            value={priceRange}
            onInput={(value) => {
              setPriceRange(value);
              handleRangeChange("Price", value);
            }}
            className="w-full"
          />
        </div>
      </section>

      <section className="md:hidden bg-gray-50 dark:bg-gray-800  rounded-md shadow-md w-full px-5 py-5 space-y-2 max-h-[calc(100vh-64px)] fixed top-[64px] right-0 z-10 mb-10">
        <div className="flex justify-between items-center">
          <button
            onClick={handleStatus}
            className={`flex items-center gap-2 px-4 py-1 rounded-md transition font-medium shadow-sm border cursor-pointer bg-secondary text-primary border-primary`}
          >
            Unavailable Meals
          </button>
          <h1 className="text-xl text-primary dark:text-secondary font-bold">
            Total meals: {total}
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-primary dark:text-secondary font-bold">
            In this page : {length ? length : 0}
          </h1>
          <button
            onClick={() => router.push(`${pathName}`)}
            className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-1 px-4 rounded-lg shadow-md transition cursor-pointer"
          >
            Reset
          </button>
        </div>

        {open && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <input
                type="text"
                name="searchTerm"
                onChange={handleChange}
                placeholder="Search meals..."
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Food Category
              </label>
              <select
                name="foodCategory"
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 dark:bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">All</option>
                {foodCategory.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Cuisine Type
              </label>
              <select
                name="cuisineType"
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 dark:bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">All</option>
                {cuisineType.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Food Preference
              </label>
              <select
                name="foodPreference"
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 dark:bg-gray-800 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">All</option>
                {foodPreferance.map((pref) => (
                  <option key={pref} value={pref}>
                    {pref}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-3">
                Price range
              </label>
              <div className="flex items-center mb-3 gap-2 md:gap-3">
                <p className="font-bold text-black dark:text-gray-100 flex items-center">
                  <TbCurrencyTaka className="text-xl" />{" "}
                  {priceRange[0].toLocaleString()}
                </p>{" "}
                <p>to</p>{" "}
                <p className="font-bold text-black dark:text-gray-100 flex items-center">
                  <TbCurrencyTaka className="text-xl" />{" "}
                  {priceRange[1].toLocaleString()}
                </p>
              </div>
              <RangeSlider
                min={minPrice}
                max={maxPrice}
                step={1}
                value={priceRange}
                onInput={(value) => {
                  setPriceRange(value);
                  handleRangeChange("Price", value);
                }}
                className="w-full"
              />
            </div>
          </div>
        )}

        <IoIosArrowDown
          onClick={() => setOpen(!open)}
          className="absolute -bottom-4 left-[45%] text-2xl"
        />
      </section>
    </>
  );
};

export default MealFiltering;
