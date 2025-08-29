"use client";
import { USER_ROLE } from "@/constant";
import { updateOrderStatus } from "@/services/orderService";
import { TUSerRole } from "@/types";
import { TOrder, TOrderStatus } from "@/types/orderTypes";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type DropdownProps<T> = {
  status: T;
  options: T[];
  getStyle: (option: T) => string;
  label: string;
  role: TUSerRole;
  id: string;
};

const OrderStatusDropdown = <T extends string>({
  status,
  options,
  getStyle,
  label,
  role,
  id,
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

  const handleChange = async (option: string) => {
    const data: Partial<TOrder> = {};
    if (!option) {
      toast.error("falid to update status", { duration: 3000 });
      return;
    }
    if (
      role === USER_ROLE.admin ||
      role === USER_ROLE.superAdmin ||
      role === USER_ROLE.customer
    ) {
      if (
        status === "Cancelled" ||
        status === "Delivered" ||
        status === "Cooking" ||
        status === "OutForDelivery" ||
        status === "ReadyForPickup"
      ) {
        toast.error(
          `status is already ${status} you can't change it right now`,
          {
            duration: 3000,
          }
        );
        return;
      }
    }
    if (label === "Order Status") {
      data.status = option as TOrderStatus;
    }
    if (label === "Order Activity") {
      const active = option === "Yes" && true;
      data.isActive = active;
    }
    const toastId = toast.loading("updating status...");
    try {
      const result = await updateOrderStatus(id, data);
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

  return (
    <div ref={dropdownRef} className="relative text-base">
      <h1 className="font-semibold"> {label}</h1>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        disabled={status === "Cancelled"}
        className={`flex items-center gap-1 px-2 rounded-full border transition duration-200 ease-in-out focus:outline-none cursor-pointer disabled:cursor-not-allowed ${getStyle(
          status
        )}`}
      >
        {status}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {dropdownOpen && (
        <div className="absolute w-28 md:w-36 rounded-lg shadow-md bg-white py-2 space-y-1 border border-gray-200">
          {options.map((option) => {
            return (
              <button
                key={option}
                onClick={() => handleChange(option)}
                className={`w-full px-2 py-1 text-sm text-left font-medium rounded-md transition-all duration-150 cursor-pointer ${getStyle(
                  option
                )}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderStatusDropdown;
