"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import TableDropDown from "@/components/tableDropdown/TableDropDown";
import { deleteKitchen, updateStatus } from "@/services/kitchenService";
import { TAllKitchenType } from "@/types/kitchenType";
import { TStatus } from "@/types/subscriber.types";
import { convertDate } from "@/utills/dateConverter";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const kitchenTableColumn = (): ColumnDef<TAllKitchenType>[] => [
  {
    id: "kitchenName",
    header: "Kitchen Name",
    cell: ({ row }) => {
      const id = row.original?._id;
      const name = row.original?.kitchenName;
      const trimedName = name.length > 16 ? name.slice(0, 16) + "..." : name;
      return (
        <div className="relative group inline-block">
          <h1>
            {" "}
            <Link
              href={`/admin/manageKitchen/${id}`}
              className="text-primary hover:underline"
            >
              {trimedName}
            </Link>
          </h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {name}
          </p>
        </div>
      );
    },
  },
  {
    id: "ownerName",
    header: "Owner Name",
    cell: ({ row }) => {
      const name = row.original?.owner?.name;
      const id = row.original?.owner?._id;
      const trimedName = name.length > 16 ? name.slice(0, 16) + "..." : name;
      return (
        <div className="relative group inline-block">
          <h1>
            {" "}
            <Link
              href={`/admin/manageUsers/${id}`}
              className="text-primary hover:underline"
            >
              {trimedName}
            </Link>
          </h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.original?.location;
      const trimmedLocation =
        location.length > 20 ? location.slice(0, 20) + "..." : location;
      return (
        <div className="relative group inline-block">
          <h1>{trimmedLocation}</h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {location}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const id = row.original?._id;
      const status = row.original?.isActive ? "active" : "blocked";
      const statusStyles: Record<TStatus, string> = {
        active: "text-green-700 hover:bg-green-50  ",
        blocked: "text-red-700 hover:bg-red-50 ",
      };

      const handleChange = async (
        option: TStatus,
        setDropdownOpen: Dispatch<SetStateAction<boolean>>
      ) => {
        if (!option) {
          toast.error("falid to update status", { duration: 3000 });
          return;
        }
        if (status === option) {
          toast.error(`status is already ${status}`, { duration: 3000 });
          return;
        }
        const value = option === "active";
        const data = {
          isActive: value,
        };
        const toastId = toast.loading("updating status...");
        try {
          const result = await updateStatus(id, data);
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
          options={["active", "blocked"]}
          handleChange={handleChange}
          getLabel={(option) =>
            option.charAt(0).toUpperCase() + option.slice(1)
          }
          getStyle={(option) => statusStyles[option]}
          position="-right-36 md:-right-32 -top-4 z-10"
        />
      );
    },
  },
  { accessorKey: "kitchenType", header: " Type" },
  {
    accessorKey: "hygieneCertified",
    header: " Hygiene",
    cell: ({ row }) => {
      const hygieneCertified = row.original?.hygieneCertified ? "Yes" : "No";
      return <span>{hygieneCertified}</span>;
    },
  },
  { accessorKey: "subscriber", header: " Subscribers" },
  {
    id: "createdAt",
    header: "Creation",
    cell: ({ row }) => {
      const date = convertDate(new Date(row?.original?.createdAt));
      return (
        <p className="flex flex-col ">
          <span>{date?.creationDate}</span> <span>{date?.creationTime}</span>
        </p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row?.original?._id;
      const name = row.original?.kitchenName;

      const handleDelete = async (
        setLoading: Dispatch<SetStateAction<boolean>>,
        setOpen: Dispatch<SetStateAction<boolean>>
      ) => {
        setLoading(true);
        if (!id) {
          toast.error("falid to remove kitchen", { duration: 3000 });
          setLoading(false);
          return;
        }
        const toastId = toast.loading("Removing kitchen...");
        try {
          const result = await deleteKitchen(id);
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
