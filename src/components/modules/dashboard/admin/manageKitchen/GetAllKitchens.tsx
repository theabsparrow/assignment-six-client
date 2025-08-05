"use client";

import Pagination from "@/components/pagination/Pagination";
import Table from "@/components/table/Table";
import { TMetaDataProps } from "@/types";
import { TAllKitchenType, TKitchenType } from "@/types/kitchenType";
import { kitchenTableColumn } from "./KitchenTableColums";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { TStatus } from "@/types/subscriber.types";

const GetAllKitchens = ({
  meta,
  result,
}: {
  meta: TMetaDataProps;
  result: TAllKitchenType[];
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<TStatus | string>("");
  const [kitchenType, setKitchenType] = useState<TKitchenType | string>("");

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

  const columns = kitchenTableColumn();
  return (
    <>
      {!(result as TAllKitchenType[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            No Kitchens Available Right Now
          </h1>
        </div>
      )}
      <div className="container mx-auto md:px-4 font-inter space-y-2 md:space-y-6">
        <div className="hidden md:flex flex-col md:flex-row items-center md:gap-10 rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 p-4 space-y-2 md:space-y-4 sticky top-10 md:top-0 z-10">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-1">
            Total Kitchens:{" "}
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
                placeholder="Search kitchen"
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            <div className="space-y-2 ">
              <select
                id="kitchenType"
                name="kitchenType"
                value={kitchenType}
                onChange={(e) => {
                  handleChange(e);
                  setKitchenType(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Type</option>
                {(["Home-based", "Commercial"] as TKitchenType[]).map(
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
                setKitchenType("");
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

export default GetAllKitchens;
