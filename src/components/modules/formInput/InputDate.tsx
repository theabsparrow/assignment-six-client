"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar } from "lucide-react";
import { FieldError, UseFormRegister } from "react-hook-form";

const InputDate = ({
  register,
  error,
  required = false,
}: {
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
}) => {
  return (
    <div className="w-full font-inter">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        Date of Birth <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type="date"
          {...register("dateOfBirth", {
            ...(required && { required: `date of birth is required` }),
          })}
          className="peer w-full px-4 py-2 pl-10 rounded-xl border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-transparent 
            border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-secondary focus:dark:border-purple-400 outline-none transition-all duration-300"
        />
        <Calendar
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputDate;
