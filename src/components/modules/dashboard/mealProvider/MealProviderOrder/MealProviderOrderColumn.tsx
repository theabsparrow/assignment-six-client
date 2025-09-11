"use client";

import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import TableDropDown from "@/components/tableDropdown/TableDropDown";
import { deleteOrder, updateOrderStatus } from "@/services/orderService";
import { TOrder, TOrderStatus } from "@/types/orderTypes";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "sonner";

export const MealProviderTableColumn = (): ColumnDef<TOrder>[] => [
  {
    id: "title",
    header: "Meal",
    cell: ({ row }) => {
      const title = row.original?.mealId?.title;
      const id = row.original?.mealId?._id;
      return (
        <div className="relative group inline-block">
          <Link
            href={`/mealProvider/myMeals/${id}`}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            View
          </Link>
          <p className="absolute bottom-full left-4  mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {title}
          </p>
        </div>
      );
    },
  },
  { accessorKey: "deliveryMode", header: " Mode" },
  { accessorKey: "orderType", header: " Type" },
  {
    accessorKey: "payment",
    header: "Payment",
    cell: ({ row }) => {
      const payment =
        row.original?.payment === "cash on delivery"
          ? "COD"
          : row.original?.payment;
      return (
        <div className="relative group inline-block">
          <h1>{payment}</h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {row.original?.payment}
          </p>
        </div>
      );
    },
  },
  {
    id: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => {
      const totalPrice = row.original?.totalPrice;
      return (
        <p className="flex items-center gap-1">
          <span className="text-xl">
            {" "}
            <TbCurrencyTaka />
          </span>{" "}
          {totalPrice}
        </p>
      );
    },
  },
  {
    id: "Address",
    header: "Address",
    cell: ({ row }) => {
      const address = row.original?.deliveryAddress;
      const trimmedTitle =
        address!.length > 15 ? address!.slice(0, 15) + "..." : address;
      return (
        <div className="relative group w-max">
          <p>{trimmedTitle}</p>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {address}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const id = row.original?._id;
      const activity = row.original?.isActive ? "Yes" : "No";
      const status = row.original?.status;
      const orderType = row?.original?.orderType;
      const statusStyles: Record<"Yes" | "No", string> = {
        Yes: "text-green-700 hover:bg-green-50  ",
        No: "text-red-700 hover:bg-red-50 ",
      };

      const handleChange = async (
        option: "Yes" | "No",
        setDropdownOpen: Dispatch<SetStateAction<boolean>>
      ) => {
        if (orderType === "once") {
          toast.error("You can`t change it", { duration: 3000 });
          return;
        }
        if (!option) {
          toast.error("falid to update status", { duration: 3000 });
          return;
        }
        if (status === "Cancelled") {
          toast.error("this order is already cancelled", { duration: 3000 });
          return;
        }
        const value = option === "Yes";
        const data: Partial<TOrder> = {
          isActive: value,
        };
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
        <>
          {orderType === "regular" && (
            <TableDropDown
              status={activity}
              options={["Yes", "No"]}
              handleChange={handleChange}
              getLabel={(option) =>
                option.charAt(0).toUpperCase() + option.slice(1)
              }
              getStyle={(option) => statusStyles[option]}
              position="-right-36 md:-right-32 -top-4 z-10"
            />
          )}
        </>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const id = row.original?._id;
      const status = row.original?.status;
      const statusStyles: Record<TOrderStatus, string> = {
        Pending: "text-yellow-700 bg-yellow-100 hover:bg-yellow-200",
        Confirmed: "text-blue-700 bg-blue-100 hover:bg-blue-200",
        Delivered: "text-green-700 bg-green-100 hover:bg-green-200",
        Cancelled: "text-red-800 bg-red-300 hover:bg-red-500",
        Cooking: "text-orange-700 bg-orange-100 hover:bg-orange-200",
        ReadyForPickup: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
        OutForDelivery: "text-purple-700 bg-purple-100 hover:bg-purple-200",
      };

      const handleChange = async (
        option: TOrderStatus,
        setDropdownOpen: Dispatch<SetStateAction<boolean>>
      ) => {
        if (!option) {
          toast.error("falid to update status", { duration: 3000 });
          return;
        }
        if (status === "Cancelled" || status === "Delivered") {
          toast.error(
            `status is already ${status} you can't change it right now`,
            { duration: 3000 }
          );
          return;
        }
        const data: Partial<TOrder> = {
          status: option,
        };
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
        <TableDropDown
          status={status}
          options={[
            "Pending",
            "Confirmed",
            "Delivered",
            "Cancelled",
            "Cooking",
            "ReadyForPickup",
            "OutForDelivery",
          ]}
          handleChange={handleChange}
          getLabel={(option) =>
            option.charAt(0).toUpperCase() + option.slice(1)
          }
          getStyle={(option) => statusStyles[option]}
          position="-right-36 md:-right-30 -top-1 z-10"
        />
      );
    },
  },
  {
    id: "details",
    header: "View",
    cell: ({ row }) => {
      const id = row?.original?._id;
      return (
        <Link
          href={`/mealProvider/myOrders/${id}`}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Details
        </Link>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row?.original?._id;
      const name = row.original?.mealId?.title;

      const handleDelete = async (
        setLoading: Dispatch<SetStateAction<boolean>>,
        setOpen: Dispatch<SetStateAction<boolean>>
      ) => {
        setLoading(true);
        if (!id) {
          toast.error("falid to remove order", { duration: 3000 });
          setLoading(false);
          return;
        }
        const toastId = toast.loading("Removing order...");
        try {
          const result = await deleteOrder(id);
          if (result?.success) {
            toast.success(result?.message, { id: toastId, duration: 3000 });
            setOpen(false);
            setLoading(false);
          } else {
            toast.error(result?.message, { id: toastId, duration: 3000 });
            setLoading(false);
          }
        } catch (error: any) {
          console.log(error);
        }
        setLoading(true);
      };

      return <ConfirmDelation value={name} handleDelete={handleDelete} />;
    },
  },
];
