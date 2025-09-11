"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export type TSearchSelectProps<T extends string> = {
  options: T[];
  filterBy: string;
  label: string;
};

const SearchAndSelect = <T extends string>({
  options,
  filterBy,
  label,
}: TSearchSelectProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const dropDownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const filterOptions = options
    .sort((a, b) => a.localeCompare(b))
    .filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSelect = (option: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(filterBy, option.toString());
    router.push(`/meals?${params.toString()}`, { scroll: false });
    setSearchTerm("");
    setOpen(false);
  };

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
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="bg-secondary border border-primary text-primary p-1 md:p-2 flex items-center gap-4 rounded-lg cursor-pointer hover:bg-white duration-500"
      >
        {value || label}
        <RiArrowDropDownLine
          className={`text-2xl ${open && "rotate-180 duration-500"}`}
        />
      </button>

      {open && (
        <div className="absolute -top-24 lg:-top-24 left-56 lg:left-[170px] w-[30vw] lg:w-[13vw] bg-gray-800 rounded-lg border border-secondary shadow-lg z-50 animate-fade-in overflow-y-auto">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-1 md:p-2 w-full border-b border-secondary dark:bg-gray-800 text-white outline-none"
          />
          <ul className="max-h-36 md:max-h-44 overflow-y-auto text-sm text-gray-800">
            {filterOptions.length > 0 ? (
              filterOptions.map((option) => (
                <li
                  key={option}
                  className="w-full text-left px-2 md:px-4 py-1 md:py-2 text-white hover:bg-secondary hover:text-primary rounded transition-all duration-200 cursor-pointer"
                  onClick={() => {
                    handleSelect(option);
                    setValue(option);
                  }}
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
      <input type="hidden" />
    </div>
  );
};

export default SearchAndSelect;
