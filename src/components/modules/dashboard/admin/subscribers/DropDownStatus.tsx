"use client";

import { changeStatus } from "@/services/newsLetterService";
import { TStatus } from "@/types/subscriber.types";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const DropdownStatus = ({ status, id }: { status: string; id: string }) => {
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
    setDropdownOpen((prev) => !prev);
  };

  const handleChange = async (value: TStatus) => {
    if (!value) {
      toast.error("falid to update status", { duration: 3000 });
      return;
    }
    if (status === value) {
      toast.error(`status is already ${status}`, { duration: 3000 });
      return;
    }
    const data = {
      status: value,
    };
    const toastId = toast.loading("updating status...");
    try {
      const result = await changeStatus(data, id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setDropdownOpen(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const statusStyles: Record<TStatus, string> = {
    active: "bg-green-100 text-green-700 border border-green-300",
    blocked: "bg-red-100 text-red-700 border border-red-300",
  };

  return (
    <div ref={dropdownRef} className="relative ">
      <button
        onClick={() => {
          handleToggle();
          setDropdownOpen(!dropdownOpen);
        }}
        className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full border transition duration-200 ease-in-out focus:outline-none cursor-pointer
            ${statusStyles[status as TStatus]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
        <ChevronDown className={`w-4 h-4 ${dropdownOpen && "rotate-180"}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute -right-36 md:-right-28 -top-4 z-10 w-32 rounded-md flex flex-col py-1 bg-gray-200">
          {(["active", "blocked"] as TStatus[]).map((option) => (
            <button
              key={option}
              onClick={() => handleChange(option)}
              className={`px-2 py-1 text-sm text-left cursor-pointer transition-colors duration-150
          ${
            option === "active"
              ? "text-green-700 hover:bg-green-50"
              : "text-red-700 hover:bg-red-50"
          }`}
            >
              {option === "active" ? "Active" : "Blocked"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownStatus;
