"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import TableDropDown from "@/components/tableDropdown/TableDropDown";
import { deleteMeal, updateMeal } from "@/services/mealService";
import { TMyMealsList, TUpdatemealData } from "@/types/mealType";
import { TStatus } from "@/types/subscriber.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const MyMealsTableColums = (): ColumnDef<TMyMealsList>[] => [
  {
    id: "title",
    header: "Name",
    cell: ({ row }) => {
      const title: string = row.original.title;
      const trimmedTitle =
        title.length > 30 ? title.slice(0, 30) + "..." : title;
      const id = row.original?._id;
      return (
        <Link
          href={`/mealProvider/myMeals/${id}`}
          className="text-primary hover:underline"
        >
          {trimmedTitle}
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
    id: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row?.original?.avarageRating;
      return <span>{rating}</span>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const id = row.original?._id;
      const status = row.original?.isAvailable ? "active" : "blocked";
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
        const data: Partial<TUpdatemealData> = {
          isAvailable: value,
        };
        const toastId = toast.loading("updating status...");
        try {
          const result = await updateMeal(data, id);
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
