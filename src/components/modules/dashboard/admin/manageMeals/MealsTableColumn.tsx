"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import { deleteMeal } from "@/services/mealService";
import { TMealListing } from "@/types/mealType";
import { convertDate } from "@/utills/dateConverter";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const mealsTableColumn = (): ColumnDef<TMealListing>[] => [
  {
    id: "title",
    header: "Name",
    cell: ({ row }) => {
      const title: string = row.original.title;
      const trimmedTitle =
        title.length > 20 ? title.slice(0, 20) + "..." : title;
      const id = row.original?._id;
      return (
        <div className="relative group inline-block">
          <h1>
            {" "}
            <Link
              href={`/admin/manageMeal/${id}`}
              className="text-primary hover:underline"
            >
              {trimmedTitle}
            </Link>
          </h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {title}
          </p>
        </div>
      );
    },
  },
  {
    id: "kitchen",
    header: "Kitchen",
    cell: ({ row }) => {
      const name = row.original?.kitchen?.kitchenName;
      const trimedName = name.length > 16 ? name.slice(0, 16) + "..." : name;
      const id = row.original?.kitchen?._id;
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
  { accessorKey: "foodCategory", header: "Category" },
  { accessorKey: "cuisineType", header: "Cuisine" },
  { accessorKey: "foodPreference", header: "Preference" },
  { accessorKey: "portionSize", header: "Size" },
  { accessorKey: "price", header: "Price" },
  {
    accessorKey: "isAvailable",
    header: "Available",
    cell: ({ row }) => {
      return row.original?.isAvailable ? "Yes" : "No";
    },
  },
  {
    accessorKey: "createdAt",
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
      const name = row.original?.title;

      const handleDelete = async (
        setLoading: Dispatch<SetStateAction<boolean>>,
        setOpen: Dispatch<SetStateAction<boolean>>
      ) => {
        setLoading(true);
        if (!id) {
          toast.error("falid to remove meal", { duration: 3000 });
          setLoading(false);
          return;
        }
        const toastId = toast.loading("Removing meal...");
        try {
          const result = await deleteMeal(id);
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
