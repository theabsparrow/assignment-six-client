"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import { deleteMeal } from "@/services/mealService";
import { TMealListing } from "@/types/mealType";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const mealsTableColumn = (): ColumnDef<TMealListing>[] => [
  {
    id: "title",
    header: "Name",
    cell: ({ row }) => {
      const title = row.original?.title;
      const id = row.original?._id;
      return (
        <Link
          href={`/admin/manageMeal/${id}`}
          className="text-primary hover:underline"
        >
          {title}
        </Link>
      );
    },
  },
  {
    id: "kitchen",
    header: "Kitchen",
    cell: ({ row }) => {
      const name = row.original?.kitchen?.kitchenName;
      const id = row.original?.kitchen?._id;
      return (
        <Link
          href={`/admin/manageKitchen/${id}`}
          className="text-primary hover:underline"
        >
          {name}
        </Link>
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
      const creationDate = new Date(row.original?.createdAt);
      const creationTime = new Date(row.original?.createdAt);
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
        <p>
          {date} {time}
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
