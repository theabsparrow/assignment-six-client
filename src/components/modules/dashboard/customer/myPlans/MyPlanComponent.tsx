"use client";

import { TMyMealPlanner } from "@/types/MealPlanType";
import { myPlanTableColumn } from "./MyPlanstableColumn";
import Table from "@/components/table/Table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { TStatus } from "@/types/subscriber.types";
import { IoIosArrowDown } from "react-icons/io";
import { FoodPreferenceOption } from "@/types/mealType";

const MyPlanComponent = ({ myPlans }: { myPlans: TMyMealPlanner[] }) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<TStatus | string>("");
  const [foodPreference, setFoodPreference] = useState<
    FoodPreferenceOption | string
  >("");
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    if (name === "isActive") {
      if (value === "active") {
        params.set(name, "true");
      } else if (value === "blocked") {
        params.set(name, "false");
      } else {
        params.delete(name);
      }
    } else {
      params.set(name, value.toString());
    }
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const columns = myPlanTableColumn();
  return (
    <>
      {!(myPlans as TMyMealPlanner[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            No Plan is Available Right Now
          </h1>
        </div>
      )}
      <section className="container mx-auto md:px-4 font-inter space-y-10 md:space-y-6">
        <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-2 px-4 md:px-4 md:py-4 space-y-2 md:space-y-4 sticky top-10 md:top-0 z-10">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-1">
            Total Plans:{" "}
            <span className="text-primary font-semibold">
              {myPlans?.length ?? 0}
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
          <div className="hidden md:flex items-center gap-10">
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
                placeholder="Search by title"
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <div className="space-y-2 ">
              <select
                id="foodPreference"
                name="foodPreference"
                value={foodPreference}
                onChange={(e) => {
                  handleChange(e);
                  setFoodPreference(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Type</option>
                {(["Veg", "Non-Veg", "Mixed"] as FoodPreferenceOption[]).map(
                  (item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="space-y-2 ">
              <select
                id="status"
                name="isActive"
                value={status}
                onChange={(e) => {
                  handleChange(e);
                  setStatus(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Status</option>
                {(["active", "blocked"] as TStatus[]).map((item) => (
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
                setStatus("");
                setFoodPreference("");
              }}
              className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer"
            >
              Reset
            </button>
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
                  placeholder="Search by title"
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
              <div className="space-y-2 ">
                <select
                  id="foodPreference"
                  name="foodPreference"
                  value={foodPreference}
                  onChange={(e) => {
                    handleChange(e);
                    setFoodPreference(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Type</option>
                  {(["Veg", "Non-Veg", "Mixed"] as FoodPreferenceOption[]).map(
                    (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="space-y-2 ">
                <select
                  id="status"
                  name="isActive"
                  value={status}
                  onChange={(e) => {
                    handleChange(e);
                    setStatus(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Status</option>
                  {(["active", "blocked"] as TStatus[]).map((item) => (
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
                  setStatus("");
                  setFoodPreference("");
                }}
                className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>
        <Table data={myPlans} columns={columns} />
      </section>
    </>
  );
};

export default MyPlanComponent;
