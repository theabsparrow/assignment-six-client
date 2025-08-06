"use client";

import Pagination from "@/components/pagination/Pagination";
import Table from "@/components/table/Table";
import { TMetaDataProps, TUserListingType, TUSerRole } from "@/types";
import { usersTableColumn } from "./UsersTableColumn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { TGender } from "@/types/customerRegistration";
import { TStatus } from "@/types/subscriber.types";
import { IoIosArrowDown } from "react-icons/io";

const GetAllUsers = ({
  meta,
  result,
}: {
  meta: TMetaDataProps;
  result: TUserListingType[];
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [role, setRole] = useState<TUSerRole | string>("");
  const [gender, setGender] = useState<TGender | string>("");
  const [status, setStatus] = useState<TStatus | string>("");
  const [verified, setVerified] = useState<"Yes" | "No" | string>("");
  const [kitchen, setKitchen] = useState<"Yes" | "No" | string>("");
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
    if (name === "verifiedWithEmail") {
      if (value === "Yes") {
        params.set(name, "true");
      } else if (value === "No") {
        params.set(name, "false");
      } else {
        params.delete(name);
      }
    } else if (name === "hasKitchen") {
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

  const columns = usersTableColumn();
  return (
    <>
      {!(result as TUserListingType[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-r from-pink-100 to-blue-100 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            No users Available Right Now
          </h1>
        </div>
      )}
      <section className="container mx-auto md:px-4 font-inter space-y-10 md:space-y-6">
        <div className="flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-900 dark:border-gray-700 py-2 px-4 md:px-4 md:py-4 space-y-2 md:space-y-4 sticky top-10 md:top-0 z-10">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-1">
            Total Users:{" "}
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
          <div className="hidden md:flex items-center gap-4 md:gap-10">
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
                id="role"
                name="role"
                value={role}
                onChange={(e) => {
                  handleChange(e);
                  setRole(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Role</option>
                {(
                  [
                    "admin",
                    "customer",
                    "superAdmin",
                    "mealProvider",
                  ] as TUSerRole[]
                ).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 ">
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => {
                  handleChange(e);
                  setGender(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Gender</option>
                {(["Male", "Female", "Other"] as TGender[]).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
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
                {["active", "blocked"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 ">
              <select
                id="verifiedWithEmail"
                name="verifiedWithEmail"
                value={verified}
                onChange={(e) => {
                  handleChange(e);
                  setVerified(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Verified</option>
                {["Yes", "No"].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 ">
              <select
                id="hasKitchen"
                name="hasKitchen"
                value={kitchen}
                onChange={(e) => {
                  handleChange(e);
                  setKitchen(e.target.value);
                }}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              >
                <option value="">Has Kitchen</option>
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
                setRole("");
                setGender("");
                setStatus("");
                setVerified("");
                setKitchen("");
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
                  placeholder="Search meal"
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
              <div className="space-y-2 ">
                <select
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => {
                    handleChange(e);
                    setRole(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Role</option>
                  {(
                    [
                      "admin",
                      "customer",
                      "superAdmin",
                      "mealProvider",
                    ] as TUSerRole[]
                  ).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 ">
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => {
                    handleChange(e);
                    setGender(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Gender</option>
                  {(["Male", "Female", "Other"] as TGender[]).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
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
                  {["active", "blocked"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 ">
                <select
                  id="verifiedWithEmail"
                  name="verifiedWithEmail"
                  value={verified}
                  onChange={(e) => {
                    handleChange(e);
                    setVerified(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Verified</option>
                  {["Yes", "No"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 ">
                <select
                  id="hasKitchen"
                  name="hasKitchen"
                  value={kitchen}
                  onChange={(e) => {
                    handleChange(e);
                    setKitchen(e.target.value);
                  }}
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Has Kitchen</option>
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
                  setRole("");
                  setGender("");
                  setStatus("");
                  setVerified("");
                  setKitchen("");
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

export default GetAllUsers;
