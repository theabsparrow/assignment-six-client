"use client";

import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type DropdownProps<T> = {
  status: T;
  options: T[];
  handleChange: (
    option: T,
    setDropdownOpen: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
};

const StatusDropdown = <T extends string>({
  status,
  options,
  handleChange,
}: DropdownProps<T>) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleGlobalDropdownOpen = () => {
      setDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("dropdown-open", handleGlobalDropdownOpen);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("dropdown-open", handleGlobalDropdownOpen);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex items-center gap-1 px-3 py-1 font-semibold rounded-full border transition duration-200 ease-in-out focus:outline-none cursor-pointer ${
          status === "active"
            ? "text-green-700 hover:bg-green-50"
            : "text-red-700 hover:bg-red-50"
        }`}
      >
        {status}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {dropdownOpen && (
        <div className="absolute w-28 right-0 md:w-36 rounded-lg shadow-md bg-white py-2 space-y-1 border border-gray-200">
          {options.map((option) => {
            const isActive = status === option;
            return (
              <button
                key={option}
                onClick={() => handleChange(option, setDropdownOpen)}
                className={`w-full px-3 py-2 text-sm text-left font-medium rounded-md transition-all duration-150 cursor-pointer 
          ${
            option === "active"
              ? isActive
                ? "bg-green-500 text-white"
                : "hover:bg-green-100 text-green-700"
              : isActive
              ? "bg-red-500 text-white"
              : "hover:bg-red-100 text-red-700"
          }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
