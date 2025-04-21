/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TCheckboxGroup {
  register: UseFormRegister<any>;
  options: string[];
  name: string;
  errors?: FieldErrors;
  required?: boolean;
}

const InputCheckboxArray: React.FC<TCheckboxGroup> = ({
  register,
  options,
  name,
  errors,
  required = false,
}) => {
  return (
    <div className="w-full">
      <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-1">
        Allergies
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map((allergy) => (
          <label
            key={allergy}
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-md px-3 py-2 border border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-all"
          >
            <input
              type="checkbox"
              value={allergy}
              {...register(name, {
                ...(required && { required: `${name} are required` }),
              })}
              className="accent-blue-500 w-4 h-4"
            />
            <span className="text-gray-800 dark:text-gray-100">{allergy}</span>
          </label>
        ))}
      </div>
      {errors?.[name] && (
        <p className="text-red-500 text-xs mt-1">
          {errors[name].message as string}
        </p>
      )}
    </div>
  );
};

export default InputCheckboxArray;
