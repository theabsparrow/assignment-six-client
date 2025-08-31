"use client";

import { TStatus, TSubscriber } from "@/types/subscriber.types";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { changeStatus, deleteSubscriber } from "@/services/newsLetterService";
import { Dispatch, SetStateAction } from "react";
import TableDropDown from "@/components/tableDropdown/TableDropDown";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import { convertDate } from "@/utills/dateConverter";

export const subscriberTableColumn = (): ColumnDef<TSubscriber>[] => [
  {
    header: "Serial No",
    cell: ({ row }) => row.index + 1,
  },
  { accessorKey: "email", header: "Subscribers Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.status as TStatus;
      const id = row.original?._id;
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
        const data = {
          status: option,
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
      return (
        <TableDropDown
          status={status}
          options={["active", "blocked"]}
          handleChange={handleChange}
          getLabel={(option) =>
            option.charAt(0).toUpperCase() + option.slice(1)
          }
          getStyle={(option) => statusStyles[option]}
          position="-right-36 md:-right-24 -top-4 z-10"
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Subscribed Date",
    cell: ({ row }) => {
      const date = convertDate(new Date(row?.original?.createdAt));
      return <p>{date?.creationDate}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Subscribed Time",
    cell: ({ row }) => {
      const date = convertDate(new Date(row?.original?.createdAt));
      return <p>{date?.creationTime}</p>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row?.original?._id;
      const email = row?.original?.email;

      const handleDelete = async (
        setLoading: Dispatch<SetStateAction<boolean>>,
        setOpen: Dispatch<SetStateAction<boolean>>
      ) => {
        setLoading(true);
        if (!id) {
          toast.error("falid to remove subscriber", { duration: 3000 });
          setLoading(false);
          return;
        }
        const toastId = toast.loading("Removing subscriber...");
        try {
          const result = await deleteSubscriber(id);
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
      return <ConfirmDelation value={email} handleDelete={handleDelete} />;
    },
  },
];
