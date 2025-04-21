/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, UseFormRegister } from "react-hook-form";

interface FloatingInputProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  required?: boolean;
}

const InputType: React.FC<FloatingInputProps> = ({
  label,
  name,
  placeholder = "",
  register,
  error,
  type = "text",
  required = false,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={type}
          {...register(name, {
            ...(required && { required: `${name} is required` }),
          })}
          className={`peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-transparent 
          border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:dark:border-blue-400`}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        />
        <span className="absolute left-4 top-2.5 text-sm text-gray-400 dark:text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
          {label}
        </span>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputType;
