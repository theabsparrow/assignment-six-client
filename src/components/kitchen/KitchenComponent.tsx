"use client";

import KitchenCard from "./KitchenCard";
import Pagination from "@/components/pagination/Pagination";
import { TMetaDataProps } from "@/types";
import { TAllKitchenType, TKitchenType } from "@/types/kitchenType";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const KitchenComponent = ({
  kitchenInfo,
  meta,
}: {
  kitchenInfo: TAllKitchenType[];
  meta: TMetaDataProps;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [kitchenType, setKitchenType] = useState<TKitchenType | string>("");
  const [certified, setCertified] = useState<"Yes" | "No" | string>("");
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<"asc" | "desc" | string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    if (name === "hygieneCertified") {
      if (value === "Yes") {
        params.set(name, "true");
      } else if (value === "No") {
        params.set(name, "false");
      } else {
        params.delete(name);
      }
    } else if (name === "sort") {
      if (value === "asc") {
        params.set(name, "subscriber");
      } else if (value === "desc") {
        params.set(name, "-subscriber");
      } else {
        params.delete(name);
      }
    } else {
      params.set(name, value.toString());
    }
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <>
      {!(kitchenInfo as TAllKitchenType[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            No Kitchens Available Right Now
          </h1>
        </div>
      )}
      <section className="space-y-4">
        <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-2 px-4 md:px-4 md:py-4 space-y-2 md:space-y-4 sticky top-10 md:top-0 z-10">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-1">
            Total Kitchens:{" "}
            <span className="text-primary font-semibold">
              {kitchenInfo?.length ?? 0}
            </span>
          </p>
          {!open && (
            <div className="absolute left-40 top-11 flex md:hidden">
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
                id="hygieneCertified"
                name="hygieneCertified"
                value={certified}
                onChange={(e) => {
                  handleChange(e);
                  setCertified(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Certified</option>
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
                    {`Subscribers (${item})`}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                router.push(`${pathName}`);
                setSearch("");
                setKitchenType("");
                setCertified("");
              }}
              className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* for small device */}
          {open && (
            <div className="flex flex-col gap-4 md:hidden relative">
              <div className="absolute left-36 -bottom-6 flex md:hidden">
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
                  id="hygieneCertified"
                  name="hygieneCertified"
                  value={certified}
                  onChange={(e) => {
                    handleChange(e);
                    setCertified(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Certified</option>
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
                      {`Subscribers (${item})`}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => {
                  router.push(`${pathName}`);
                  setSearch("");
                  setKitchenType("");
                  setCertified("");
                }}
                className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kitchenInfo.map((kitchen) => (
            <KitchenCard key={kitchen?._id} kitchenData={kitchen} />
          ))}
        </div>
        {kitchenInfo?.length > 0 && <Pagination totalPage={meta?.totalPage} />}
      </section>
    </>
  );
};

export default KitchenComponent;
