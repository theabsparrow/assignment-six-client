/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface TermsCheckboxProps {
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors;
  required?: boolean;
}

const AcceptTermsInput: React.FC<TermsCheckboxProps> = ({
  register,
  name,
  errors,
  required = false,
}) => {
  return (
    <div className="mt-4">
      <label className="flex items-start space-x-2 cursor-pointer">
        <input
          type="checkbox"
          {...register(name, {
            ...(required && { required: `${name} is required` }),
          })}
          className="accent-blue-600 mt-1 w-4 h-4"
        />
        <span className="text-sm text-gray-700 dark:text-gray-200">
          I agree to the{" "}
          <Link
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Terms & Conditions
          </Link>
        </span>
      </label>
      {errors?.[name] && (
        <p className="text-red-500 text-xs mt-1">
          you need to accept our terms and service
        </p>
      )}
    </div>
  );
};

export default AcceptTermsInput;
