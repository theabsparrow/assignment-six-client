"use client";

import { TMetaDataProps } from "@/types";
import { TGetAllSubscribersType } from "@/types/kitchenSubscriberTypes";
import { mySubscribertableColumn } from "./MySubscriberTableColumn";
import Table from "@/components/table/Table";
import Pagination from "@/components/pagination/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const GetMySubscribersComponent = ({
  data,
  meta,
  totalSubscribers,
}: {
  data: TGetAllSubscribersType[];
  meta: TMetaDataProps;
  totalSubscribers: number;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value.toString());
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const columns = mySubscribertableColumn();
  return (
    <>
      {!(data as TGetAllSubscribersType[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            No Subscribers Available Right Now
          </h1>
        </div>
      )}
      <section className="container mx-auto md:px-4 font-inter space-y-10 md:space-y-6">
        <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-2 px-4 md:px-4 md:py-4 space-y-2 md:space-y-4 sticky top-10 md:top-0 z-10">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-1">
            Total Subscribers:{" "}
            <span className="text-primary font-semibold">
              {totalSubscribers}
            </span>
          </p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-1">
            Subscribers in this page:{" "}
            <span className="text-primary font-semibold">
              {data?.length ?? 0}
            </span>
          </p>
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
                placeholder="Search user"
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
            <button
              onClick={() => {
                router.push(`${pathName}`);
                setSearch("");
              }}
              className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
        <Table data={data} columns={columns} />
        <Pagination totalPage={meta?.totalPage} />
      </section>
    </>
  );
};

export default GetMySubscribersComponent;
