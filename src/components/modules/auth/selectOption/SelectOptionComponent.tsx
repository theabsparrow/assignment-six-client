"use client";

import { ChefHat, User } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const SelectOptionComponent = ({
  setRegisteredRole,
}: {
  setRegisteredRole: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <div className=" w-[30vw] rounded-2xl space-y-6 md:space-y-0 font-Inter">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <button
          onClick={() => {
            localStorage.setItem("customerForm", "customer");
            setRegisteredRole("customer");
          }}
          className="flex flex-col items-center justify-center gap-4 border border-primary dark:border-gray-700 rounded-xl p-1 md:p-2 hover:bg-blue-50 dark:hover:bg-gray-800 transition shadow-sm hover:shadow-lg cursor-pointer bg-secondary"
        >
          <User size={40} className="text-primary dark:text-blue-400" />
          <span className="md:text-lg text-primary dark:text-gray-100">
            Register as Customer
          </span>
        </button>

        <button
          onClick={() => {
            localStorage.setItem("mealProviderForm", "mealProvider");
            setRegisteredRole("mealProvider");
          }}
          className="flex flex-col items-center justify-center gap-4 border border-primary dark:border-gray-700 rounded-xl p-1 md:p-2 hover:bg-green-50 dark:hover:bg-gray-800 transition shadow-sm hover:shadow-lg cursor-pointer bg-secondary"
        >
          <ChefHat size={40} className="text-primary dark:text-green-400" />
          <span className="md:text-lg text-primary dark:text-gray-100">
            Register as Meal Provider
          </span>
        </button>
      </div>
    </div>
  );
};

export default SelectOptionComponent;
