"use client";

import { TMetaDataProps } from "@/types";
import {
  TDeliveryMode,
  TOrder,
  TOrderStatus,
  TOrderType,
  TPaymentOption,
} from "@/types/orderTypes";
import { allOrderTableColumn } from "./AllOrdersTableColumn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Table from "@/components/table/Table";
import Pagination from "@/components/pagination/Pagination";
import { orderStatus } from "../../customer/myOrders/myOrder.const";
import { IoIosArrowDown } from "react-icons/io";

const GetAllOrders = ({
  allOrders,
  meta,
}: {
  allOrders: TOrder[];
  meta: TMetaDataProps;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [deliveryMode, setDeliveryMode] = useState<TDeliveryMode | string>("");
  const [orderType, setOrderType] = useState<TOrderType | string>("");
  const [status, setStatus] = useState<TOrderStatus | string>("");
  const [payment, setPayment] = useState<TPaymentOption | string>("");
  const [isActive, setIsActive] = useState<"Yes" | "No" | string>("");
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    if (name === "isActive") {
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

  const columns = allOrderTableColumn();
  return (
    <>
      {!(allOrders as TOrder[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            No orders Available Right Now
          </h1>
        </div>
      )}

      <section className="container mx-auto md:px-4 font-inter space-y-10 md:space-y-6">
        <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-2 px-4 md:px-4 md:py-4 space-y-2 md:space-y-4 sticky top-10 md:top-0 z-10">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-1">
            Total Plans:{" "}
            <span className="text-primary font-semibold">
              {allOrders?.length ?? 0}
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
                placeholder="Search by address"
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>

            <div className="space-y-2 ">
              <select
                id="deliveryMode"
                name="deliveryMode"
                value={deliveryMode}
                onChange={(e) => {
                  handleChange(e);
                  setDeliveryMode(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Delivery Mode</option>
                {(["mealPlanner", "manual"] as TDeliveryMode[]).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 ">
              <select
                id="orderType"
                name="orderType"
                value={orderType}
                onChange={(e) => {
                  handleChange(e);
                  setOrderType(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Order Type</option>
                {(["once", "regular"] as TOrderType[]).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 ">
              <select
                id="payment"
                name="payment"
                value={payment}
                onChange={(e) => {
                  handleChange(e);
                  setPayment(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Payment</option>
                {(["online", "cash on delivery"] as TPaymentOption[]).map(
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
                name="status"
                value={status}
                onChange={(e) => {
                  handleChange(e);
                  setStatus(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Status</option>
                {(orderStatus as TOrderStatus[]).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 ">
              <select
                id="isActive"
                name="isActive"
                value={isActive}
                onChange={(e) => {
                  handleChange(e);
                  setIsActive(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Active</option>
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
                setStatus("");
                setOrderType("");
                setDeliveryMode("");
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
                  placeholder="Search by address"
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              <div className="space-y-2 ">
                <select
                  id="deliveryMode"
                  name="deliveryMode"
                  value={deliveryMode}
                  onChange={(e) => {
                    handleChange(e);
                    setDeliveryMode(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Delivery Mode</option>
                  {(["mealPlanner", "manual"] as TDeliveryMode[]).map(
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
                  id="orderType"
                  name="orderType"
                  value={orderType}
                  onChange={(e) => {
                    handleChange(e);
                    setOrderType(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Order Type</option>
                  {(["once", "regular"] as TOrderType[]).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 ">
                <select
                  id="payment"
                  name="payment"
                  value={payment}
                  onChange={(e) => {
                    handleChange(e);
                    setPayment(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Payment</option>
                  {(["online", "cash on delivery"] as TPaymentOption[]).map(
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
                  name="status"
                  value={status}
                  onChange={(e) => {
                    handleChange(e);
                    setStatus(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Status</option>
                  {(orderStatus as TOrderStatus[]).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 ">
                <select
                  id="isActive"
                  name="isActive"
                  value={isActive}
                  onChange={(e) => {
                    handleChange(e);
                    setIsActive(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Active</option>
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
                  setStatus("");
                  setOrderType("");
                  setDeliveryMode("");
                }}
                className="bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>
        <Table data={allOrders} columns={columns} />
        {allOrders?.length > 0 && <Pagination totalPage={meta?.totalPage} />}
      </section>
    </>
  );
};

export default GetAllOrders;
