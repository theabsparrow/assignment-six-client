"use client";

import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type DropdownStatusProps<T> = {
  status: T;
  options: T[];
  handleChange: (
    option: T,
    setDropdownOpen: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
  getLabel: (option: T) => string;
  getStyle: (option: T) => string;
  position: string;
};

const TableDropDown = <T extends string>({
  status,
  options,
  handleChange,
  getLabel,
  getStyle,
  position,
}: DropdownStatusProps<T>) => {
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

  const handleToggle = () => {
    window.dispatchEvent(new Event("dropdown-open"));
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border transition duration-200 ease-in-out focus:outline-none cursor-pointer ${getStyle(
          status
        )}`}
      >
        {getLabel(status)}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {dropdownOpen && (
        <div
          className={`absolute ${position} z-50 w-32 rounded-md flex flex-col bg-gray-200`}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleChange(option, setDropdownOpen)}
              className={`px-2 py-1 text-sm text-left cursor-pointer transition-colors duration-150 ${getStyle(
                option
              )}`}
            >
              {getLabel(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TableDropDown;
