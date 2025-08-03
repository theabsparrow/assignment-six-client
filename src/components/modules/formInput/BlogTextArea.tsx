"use client";

import { useEffect, useState } from "react";
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
  trigger?: (name: keyof T) => void;
  row?: number;
  validateWatch?: string;
}

const BlogTextArea = <T extends FieldValues>({
  label,
  name,
  placeholder,
  register,
  required,
  error,
  validateWatch,
  trigger,
}: BlogInputProps<T>) => {
  const [charCount, setCharCount] = useState(0);
  const maxLength = 5000;
  const minLength = 50;

  useEffect(() => {
    setCharCount(validateWatch?.length || 0);
    if (trigger && name) {
      trigger(name);
    }
  }, [validateWatch, trigger, name]);
  return (
    <div className="w-full ">
      <label
        className={`block text-lg font-semibold text-gray-700 dark:text-gray-200 `}
      >
        {label}
        <span className="text-red-500 dark:text-red-400">*</span>
      </label>
      <div className="relative">
        <textarea
          rows={5}
          {...register(name, {
            ...(required && {
              required: `${name} is required`,
              minLength: {
                value: minLength,
                message: `Minimum ${minLength} characters required`,
              },
              maxLength: {
                value: maxLength,
                message: `Maximum ${maxLength} characters allowed`,
              },
              validate: {
                noLeadingSpace: (value) =>
                  /^[^\s].*$/.test(value) ||
                  "First character cannot be a space",
              },
            }),
          })}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
          className={` w-full px-4 py-2 rounded-xl text-gray-950 dark:text-white border transition-all duration-300 outline-none    border-primary placeholder:text-gray-600 dark:placeholder:text-gray-400 ${
            error
              ? "focus:border-red-400 focus:ring-1 focus:ring-red-500"
              : "focus:border-green-700 focus:ring-1 focus:ring-green-800"
          }  `}
        />
      </div>
      <div className="flex items-center justify-between">
        {error && (
          <p className="text-red-500 dark:text-red-400">{error.message}</p>
        )}
        <p>
          {charCount}/{maxLength} character
        </p>
      </div>
    </div>
  );
};

export default BlogTextArea;
