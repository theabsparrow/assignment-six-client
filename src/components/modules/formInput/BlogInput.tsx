"use client";

import { useEffect } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface BlogInputProps<T extends FieldValues = any> {
  label: string;
  name: Path<T>;
  placeholder?: string;
  register: UseFormRegister<T>;
  required?: boolean;
  error?: FieldError;
  type: string;
  trigger?: (name: keyof T) => void;
}

const BlogInput = <T extends FieldValues>({
  label,
  name,
  placeholder,
  register,
  required = false,
  error,
  type,
  trigger,
}: BlogInputProps<T>) => {
  useEffect(() => {
    if (trigger && name) {
      trigger(name);
    }
  }, [trigger, name]);
  return (
    <div className="w-full space-y-2">
      <label
        className={`block text-lg font-semibold text-gray-700 dark:text-gray-200 `}
      >
        {label}
        <span className="text-red-500 dark:text-red-400">*</span>
      </label>
      <div className="relative">
        <input
          type={type}
          {...register(name, {
            ...(required && {
              required: `${label} is required`,
              minLength: {
                value: 2,
                message: "Name can't be less than 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Name can't be more than 50 characters",
              },
            }),
          })}
          className={` w-full px-4 py-2 rounded-xl border border-primary transition-all duration-300 outline-none  dark:text-white text-gray-950  ${
            error
              ? "focus:border-red-400 focus:ring-1 focus:ring-red-500"
              : "focus:border-green-700 focus:ring-1 focus:ring-green-800"
          }  `}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default BlogInput;
