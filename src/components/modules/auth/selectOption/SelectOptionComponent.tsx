"use client";

import { ChefHat, User } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const SelectOptionComponent = ({
  setRegisteredRole,
}: {
  setRegisteredRole: Dispatch<SetStateAction<string | null>>;
}) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white">
          Register As
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => {
              localStorage.setItem("customerForm", "customer");
              setRegisteredRole("customer");
            }}
            className="flex flex-col items-center justify-center gap-4 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-blue-50 dark:hover:bg-gray-800 transition shadow-sm hover:shadow-lg cursor-pointer"
          >
            <User size={40} className="text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-100">
              Register as Customer
            </span>
          </button>

          <button
            onClick={() => {
              localStorage.setItem("mealProviderForm", "mealProvider");
              setRegisteredRole("mealProvider");
            }}
            className="flex flex-col items-center justify-center gap-4 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-green-50 dark:hover:bg-gray-800 transition shadow-sm hover:shadow-lg cursor-pointer"
          >
            <ChefHat size={40} className="text-green-600 dark:text-green-400" />
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-100">
              Register as Meal Provider
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SelectOptionComponent;
