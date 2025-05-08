"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from "react-hook-form";

const InputSelect = ({
  register,
  name,
  label,
  error,
  options,
  required = false,
}: {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  error?: FieldError;
  options: string[];
  required?: boolean;
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          {...register(name, {
            ...(required && { required: `${label} is required` }),
          })}
          className="block w-full appearance-none px-4 py-2 rounded-xl outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100
            focus:border-pink-500 focus:ring-2 focus:ring-pink-300 dark:focus:border-pink-400 transition-all duration-300 pr-10"
        >
          {name === "isCertified" ? (
            <>
              <option value="">Select Options</option>
              {options.map((item, i) => (
                <option key={i} value={item as string}>
                  {item === "true" ? "yes" : "no"}
                </option>
              ))}
            </>
          ) : (
            <>
              <option value="">Select {label}</option>
              {options.map((g) => (
                <option key={g as string} value={g as string}>
                  {g}
                </option>
              ))}
            </>
          )}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-pink-500"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.084l3.71-3.854a.75.75 0 111.08 1.04l-4.24 4.396a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
        </svg>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error?.message}</p>}
    </div>
  );
};

export default InputSelect;
