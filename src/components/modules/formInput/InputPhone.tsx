"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from "react-hook-form";

interface TPhoneInput {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
}

const InputPhone: React.FC<TPhoneInput> = ({
  label,
  name,
  register,
  error,
  required = false,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative flex">
        <span className="flex items-center px-3 rounded-l-xl border border-r-0 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-sm">
          +880
        </span>
        <input
          type="tel"
          {...register(name, {
            ...(required && { required: `${name} is required` }),
            pattern: {
              value: /^[1-9][0-9]{9}$/,
              message: "Enter a valid phone number",
            },
          })}
          placeholder="1XXXXXXXX"
          className={`w-full px-4 py-2 rounded-r-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputPhone;
