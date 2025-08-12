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
import { useEffect, useState } from "react";
import { mealsTableColumn } from "./MealsTableColumn";
import { foodPreferance } from "../../mealProvider/kitchenProfile/kitchen.const";
import { TbCurrencyTaka } from "react-icons/tb";
import ReactRangeSliderInput from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { IoIosArrowDown } from "react-icons/io";
import {
  cuisineType,
  foodCategory,
} from "../../mealProvider/createMeal/createMeal.const";

const GetAllMeals = ({
  meta,
  result,
}: {
  meta: TMetaDataProps;
  result: TMealListing[];
}) => {
  const prices = result
    .map((meal: TMealListing) => meal?.price)
    .filter(Boolean);
  const highestPrice = prices.length ? Math.max(...prices) : 1;
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
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 1]);
  const [stableMax, setStableMax] = useState<number>(0);
  const [sort, setSort] = useState<"asc" | "desc" | string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!highestPrice) return;
    const currentMax = highestPrice + 10;
    setStableMax((prevMax) => {
      return currentMax > prevMax ? currentMax : prevMax;
    });
  }, [highestPrice]);

  useEffect(() => {
    if (stableMax) {
      setPriceRange([1, stableMax]);
    }
  }, [stableMax]);

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
    } else if (name === "sort") {
      if (value === "asc") {
        params.set(name, "price");
      } else if (value === "desc") {
        params.set(name, "-price");
      } else {
        params.delete(name);
      }
    } else {
      params.set(name, value.toString());
    }
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleRangeChange = (name: string, value: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(`min${name}`, value[0].toString());
    params.set(`max${name}`, value[1].toString());
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
      <section className="container mx-auto md:px-4 font-inter space-y-10 md:space-y-6">
        <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-2 px-4 md:px-4 md:py-4 space-y-2 md:space-y-4 sticky top-10 md:top-0 z-10">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium md:mt-1">
            Total Meals:{" "}
            <span className="text-primary font-semibold">
              {result?.length ?? 0}
            </span>
          </p>
          {!open && (
            <div className="absolute left-44 top-11 flex md:hidden">
              <button
                onClick={() => setOpen(true)}
                className="cursor-pointer text-primary text-2xl"
              >
                <IoIosArrowDown />
              </button>
            </div>
          )}

          {/* for large device */}
          <div className="hidden md:flex flex-col space-y-4">
            <div className="flex items-center justify-between">
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
                  setSort("");
                  setPriceRange([1, stableMax]);
                }}
                className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer"
              >
                Reset
              </button>
            </div>
            <div className="flex gap-4">
              <div className="w-[20vw] space-y-2">
                <label className="block font-medium ">Price range</label>
                <div className="flex items-center md:gap-2">
                  <p className="font-bold text-black flex items-center">
                    <TbCurrencyTaka className="text-xl" />{" "}
                    {priceRange[0].toLocaleString()}
                  </p>{" "}
                  <p>TO</p>{" "}
                  <p className="font-bold text-black flex items-center">
                    <TbCurrencyTaka className="text-xl" />{" "}
                    {priceRange[1].toLocaleString()}
                  </p>
                </div>
                <ReactRangeSliderInput
                  min={1}
                  max={stableMax}
                  step={1}
                  value={priceRange}
                  onInput={(value) => {
                    setPriceRange(value);
                    handleRangeChange("Price", value);
                  }}
                />
              </div>
              <div>
                <div className="space-y-2 ">
                  <select
                    id="sort"
                    name="sort"
                    value={sort}
                    onChange={(e) => {
                      handleChange(e);
                      setSort(e.target.value);
                    }}
                    className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  >
                    <option value="">Sort By</option>
                    {["asc", "desc"].map((item) => (
                      <option key={item} value={item}>
                        {`price (${item})`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* for small device */}
          {open && (
            <div className="flex flex-col gap-4 md:hidden relative">
              <div className="absolute left-44 -bottom-6 flex md:hidden">
                <button
                  onClick={() => setOpen(false)}
                  className="cursor-pointer text-primary text-2xl"
                >
                  <IoIosArrowDown />
                </button>
              </div>
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
              <div className="space-y-2 ">
                <select
                  id="sort"
                  name="sort"
                  value={sort}
                  onChange={(e) => {
                    handleChange(e);
                    setSort(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Sort By</option>
                  {["asc", "desc"].map((item) => (
                    <option key={item} value={item}>
                      {`price (${item})`}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" space-y-2">
                <label className="block font-medium ">Price range</label>
                <div className="flex items-center md:gap-2">
                  <p className="font-bold text-black flex items-center">
                    <TbCurrencyTaka className="text-xl" />{" "}
                    {priceRange[0].toLocaleString()}
                  </p>{" "}
                  <p>TO</p>{" "}
                  <p className="font-bold text-black flex items-center">
                    <TbCurrencyTaka className="text-xl" />{" "}
                    {priceRange[1].toLocaleString()}
                  </p>
                </div>
                <ReactRangeSliderInput
                  min={1}
                  max={stableMax}
                  step={1}
                  value={priceRange}
                  onInput={(value) => {
                    setPriceRange(value);
                    handleRangeChange("Price", value);
                  }}
                />
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
                  setSort("");
                  setPriceRange([1, stableMax]);
                }}
                className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>
        <Table data={result} columns={columns} />
        <Pagination totalPage={meta?.totalPage} />
      </section>
    </>
  );
};

export default GetAllMeals;
