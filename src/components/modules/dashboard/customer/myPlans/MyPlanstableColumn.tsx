"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import TableDropDown from "@/components/tableDropdown/TableDropDown";
import { deletePlan, updatePlan } from "@/services/mealPlannerService.ts";
import { TMyMealPlanner } from "@/types/MealPlanType";
import { TStatus } from "@/types/subscriber.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const myPlanTableColumn = (): ColumnDef<TMyMealPlanner>[] => [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "foodPreference", header: "Preference" },
  { accessorKey: "preferredMealTime", header: "Meal Time" },
  {
    id: "createdAt",
    header: "Creation",
    cell: ({ row }) => {
      const date = new Date(row.original?.createdAt);
      const creatDate = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      const createTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return (
        <p>
          {creatDate}, {createTime}
        </p>
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
          const result = await updatePlan(data, id);
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row?.original?._id;
      const title = row.original?.title;

      const handleDelete = async (
        setLoading: Dispatch<SetStateAction<boolean>>,
        setOpen: Dispatch<SetStateAction<boolean>>
      ) => {
        setLoading(true);
        if (!id) {
          toast.error("falid to remove plan", { duration: 3000 });
          setLoading(false);
          return;
        }
        const toastId = toast.loading("Removing plan...");
        try {
          const result = await deletePlan(id);
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

      return <ConfirmDelation value={title} handleDelete={handleDelete} />;
    },
  },
  {
    id: "details",
    header: "View",
    cell: ({ row }) => {
      const id = row?.original?._id;
      return (
        <Link
          href={`/user/myPlans/${id}`}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Details
        </Link>
      );
    },
  },
];
