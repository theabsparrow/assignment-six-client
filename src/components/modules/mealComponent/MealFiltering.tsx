"use client";
import RangeSlider from "react-range-slider-input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  cuisineType,
  foodCategory,
} from "../dashboard/meal/createMeal/createMeal.const";
import { foodPreferance } from "../dashboard/kitchen/kitchen.const";
import { useEffect, useState } from "react";
import "react-range-slider-input/dist/style.css";
import { TbCurrencyTaka } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

export type TQuery = {
  searchTerm?: string;
  foodCategory?: string;
  cuisineType?: string;
  foodPreference?: string;
};

const MealFiltering = ({
  length,
  highestPrice,
}: {
  length: number;
  highestPrice: number;
}) => {
  const [stableMax, setStableMax] = useState<number>(0);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 1]);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
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
    params.set(name, value.toString());
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleRangeChange = (name: string, value: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(`min${name}`, value[0].toString());
    params.set(`max${name}`, value[1].toString());
    console.log(params);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <section className="hidden md:flex flex-col  bg-gray-50 rounded-md shadow-md w-2xs px-5 py-5 space-y-5 h-[calc(100vh-64px)] sticky top-[64px] z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-blue-700 font-semibold">
            Total meals: {length ? length : 0}
          </h1>
          <button
            onClick={() => router.push(`${pathName}`)}
            className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition cursor-pointer"
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
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
          <RangeSlider
            min={1}
            max={stableMax}
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

      <section className="md:hidden bg-gray-50 rounded-md shadow-md w-full px-5 py-5 space-y-5 max-h-[calc(100vh-64px)] fixed top-[64px] right-0 z-10 mb-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-blue-700 font-semibold">
            Total meals: {length ? length : 0}
          </h1>
          <button
            onClick={() => router.push(`${pathName}`)}
            className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition cursor-pointer"
          >
            Reset
          </button>
        </div>

        {mounted && open && (
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
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
              <div className="flex items-center mb-3 md:gap-3">
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
              <RangeSlider
                min={1}
                max={stableMax}
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
