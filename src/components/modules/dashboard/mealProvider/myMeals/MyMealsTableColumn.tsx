"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import TableDropDown from "@/components/tableDropdown/TableDropDown";
import { deleteMeal, updateMeal } from "@/services/mealService";
import { TMyMealsList, TUpdatemealData } from "@/types/mealType";
import { TStatus } from "@/types/subscriber.types";
import { convertDate } from "@/utills/dateConverter";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "sonner";

export const MyMealsTableColums = (): ColumnDef<TMyMealsList>[] => [
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
              href={`/mealProvider/myMeals/${id}`}
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
  { accessorKey: "foodCategory", header: "Category" },
  { accessorKey: "cuisineType", header: "Cuisine" },
  { accessorKey: "foodPreference", header: "Preference" },
  { accessorKey: "portionSize", header: "Size" },
  {
    id: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price;
      return (
        <p className="flex items-center gap-1">
          {" "}
          <TbCurrencyTaka /> {price ? price.toFixed(2) : "0.00"}
        </p>
      );
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
      const date = convertDate(new Date(row.original?.createdAt));
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
