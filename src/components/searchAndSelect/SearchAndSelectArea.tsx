"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export type TSearchSelectProps<T extends string> = {
  options: T[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const SearchAndSelectArea = <T extends string>({
  options,
  value,
  setValue,
}: TSearchSelectProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filterOptions = options
    .sort((a, b) => a.localeCompare(b))
    .filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={dropDownRef} className="relative font-inter">
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
        Select your Area
      </label>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="w-full rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-secondary flex items-center justify-between"
      >
        {value || "Select Your Area "}
        <RiArrowDropDownLine
          className={`text-2xl ${open && "rotate-180 duration-500"}`}
        />
      </button>

      {open && (
        <div className="absolute -top-16 left-56 md:left-[232px] w-[30vw] md:w-[10vw] rounded-lg border border-primary shadow-lg z-50 animate-fade-in overflow-y-auto bg-gray-200 dark:bg-gray-900">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-1 md:p-2 w-full border-b border-primary  outline-none"
          />
          <ul className="max-h-36 md:max-h-44 overflow-y-auto text-sm ">
            {filterOptions.length > 0 ? (
              filterOptions.map((option) => (
                <li
                  key={option}
                  className="w-full text-left px-2 md:px-4 py-1 md:py-2 rounded transition-all cursor-pointer hover:bg-primary hover:text-white duration-500"
                  onClick={() => {
                    setValue(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-2">No results found</li>
            )}
          </ul>
        </div>
      )}
      <input type="hidden" />
    </div>
  );
};

export default SearchAndSelectArea;
