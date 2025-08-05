"use client";

import Pagination from "@/components/pagination/Pagination";
import Table from "@/components/table/Table";
import { TMetaDataProps } from "@/types";
import {
  FoodPreferenceOption,
  TcuisineType,
  TFoodCategory,
  TMealListing,
  TPortionSize,
} from "@/types/mealType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { mealsTableColumn } from "./MealsTableColumn";
import {
  cuisineType,
  foodCategory,
} from "../../meal/createMeal/createMeal.const";
import { foodPreferance } from "../../kitchen/kitchen.const";

const GetAllMeals = ({
  meta,
  result,
}: {
  meta: TMetaDataProps;
  result: TMealListing[];
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<TFoodCategory | string>("");
  const [cuisine, setCuisine] = useState<TcuisineType | string>("");
  const [preference, setPreference] = useState<FoodPreferenceOption | string>(
    ""
  );
  const [portionSize, setPortionSize] = useState<TPortionSize | string>("");
  const [available, setAvailable] = useState<"Yes" | "No" | string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    if (name === "isAvailable") {
      if (value === "Yes") {
        params.set(name, "true");
      } else if (value === "No") {
        params.set(name, "false");
      } else {
        params.delete(name);
      }
    } else {
      params.set(name, value.toString());
    }
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const columns = mealsTableColumn();
  return (
    <>
      {!(result as TMealListing[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            No Meals Available Right Now
          </h1>
        </div>
      )}
      <div className="container mx-auto md:px-4 font-inter space-y-2 md:space-y-6">
        <div className="hidden md:flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 p-4 space-y-2 md:space-y-4 sticky top-10 md:top-0 z-10">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-1">
            Total Meals:{" "}
            <span className="text-primary font-semibold">
              {result?.length ?? 0}
            </span>
          </p>

          <div className="flex items-center gap-4 md:gap-10">
            <div className=" space-y-2">
              <input
                id="search"
                type="text"
                name="searchTerm"
                onChange={(e) => {
                  handleChange(e);
                  setSearch(e.target.value);
                }}
                value={search}
                placeholder="Search meal"
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            <div className="space-y-2 ">
              <select
                id="category"
                name="foodCategory"
                value={category}
                onChange={(e) => {
                  handleChange(e);
                  setCategory(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Category</option>
                {(foodCategory as TFoodCategory[]).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 ">
              <select
                id="cuisine"
                name="cuisineType"
                value={cuisine}
                onChange={(e) => {
                  handleChange(e);
                  setCuisine(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Cuisine</option>
                {(cuisineType as TcuisineType[]).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 ">
              <select
                id="preference"
                name="foodPreference"
                value={preference}
                onChange={(e) => {
                  handleChange(e);
                  setPreference(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Preference</option>
                {foodPreferance.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 ">
              <select
                id="portionSize"
                name="portionSize"
                value={portionSize}
                onChange={(e) => {
                  handleChange(e);
                  setPortionSize(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Size</option>
                {["Small", "Medium", "Large"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 ">
              <select
                id="available"
                name="isAvailable"
                value={available}
                onChange={(e) => {
                  handleChange(e);
                  setAvailable(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Available</option>
                {["Yes", "No"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                router.push(`${pathName}`);
                setSearch("");
                setCategory("");
                setCuisine("");
                setPreference("");
                setPortionSize("");
                setAvailable("");
              }}
              className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
        <Table data={result} columns={columns} />
        <Pagination totalPage={meta?.totalPage} />
      </div>
    </>
  );
};

export default GetAllMeals;
