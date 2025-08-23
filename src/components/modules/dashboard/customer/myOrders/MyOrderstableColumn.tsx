"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import TableDropDown from "@/components/tableDropdown/TableDropDown";
import { deleteOrder, updateOrderStatus } from "@/services/orderService";
import { TOrder, TOrderStatus } from "@/types/orderTypes";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const MyOrderTableColumn = (): ColumnDef<TOrder>[] => [
  {
    id: "title",
    header: "Meal",
    cell: ({ row }) => {
      const title = row.original?.mealId?.title;
      const trimmedTitle =
        title.length > 20 ? title.slice(0, 20) + "..." : title;
      const id = row.original?.mealId?._id;
      return (
        <Link
          href={`/meals/${id}`}
          className="text-primary hover:underline duration-500"
        >
          {trimmedTitle}
        </Link>
      );
    },
  },
  {
    id: "kitchenId",
    header: "Kitchen",
    cell: ({ row }) => {
      const kitchenName = row.original?.kitchenId?.kitchenName;
      const trimmedName =
        kitchenName!.length > 15
          ? kitchenName!.slice(0, 15) + "..."
          : kitchenName;
      const id = row.original?.kitchenId?._id;
      return (
        <Link
          href={`/kitchen/${id}`}
          className="text-primary hover:underline duration-500"
        >
          {trimmedName}
        </Link>
      );
    },
  },
  { accessorKey: "deliveryMode", header: " Mode" },
  { accessorKey: "orderType", header: " Type" },
  { accessorKey: "payment", header: "Payment" },
  {
    accessorKey: "createdAt",
    header: "Creation",
    cell: ({ row }) => {
      const creationDate = new Date(row.original?.createdAt as string);
      const creationTime = new Date(row.original?.createdAt as string);
      const date = creationDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const time = creationTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return (
        <p className="flex flex-col">
          <span>{date}</span> <span>{time}</span>
        </p>
      );
    },
  },
  { accessorKey: "endDate", header: "End Date" },
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
        if (
          status === "Cancelled" ||
          status === "Delivered" ||
          status === "Cooking" ||
          status === "OutForDelivery" ||
          status === "ReadyForPickup"
        ) {
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
          options={["Cancelled"]}
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
          href={`/user/myOrders/${id}`}
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
