"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRouter, useSearchParams } from "next/navigation";

type TInputDropdownProps<T> = {
  options: T[];
  filterBy: string;
  name: string;
  clases: string;
};

const InputDropdown = <T,>({
  options,
  filterBy,
  name,
  clases,
}: TInputDropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(filterBy, value.toString());
    router.push(`/meals?${params.toString()}`, { scroll: false });
  };

  return (
    <div ref={dropdownRef} className="font-inter relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-secondary border border-primary text-primary p-1 md:p-2 flex items-center gap-4 rounded-lg cursor-pointer hover:bg-white duration-500"
      >
        {name}
        <RiArrowDropDownLine
          className={`text-2xl ${open && "rotate-180 duration-500"}`}
        />
      </button>
      {open && (
        <div
          className={`absolute ${clases} w-[30vw] md:w-full bg-gray-800 rounded-lg border border-secondary shadow-lg z-30 animate-fade-in`}
        >
          <ul className=" flex flex-col gap-1 text-sm text-gray-800">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleValueChange(option as string);
                  }}
                  className="w-full text-left px-2 md:px-4 py-1 md:py-2 text-white hover:bg-secondary hover:text-primary rounded transition-all duration-200 cursor-pointer"
                >
                  {option as ReactNode}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InputDropdown;
