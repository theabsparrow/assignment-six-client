"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import { deleteBlog } from "@/services/blogService";
import { TGetAllSubscribersType } from "@/types/kitchenSubscriberTypes";
import { convertDate } from "@/utills/dateConverter";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const mySubscribertableColumn =
  (): ColumnDef<TGetAllSubscribersType>[] => [
    {
      id: "name",
      header: "Subscriber`s Name",
      cell: ({ row }) => {
        const name = row?.original?.subscriberInfo?.name;
        return <p>{name}</p>;
      },
    },
    {
      id: "gender",
      header: "Subscriber`s Gender",
      cell: ({ row }) => {
        const address = row.original?.subscriberInfo?.gender;
        return <span>{address}</span>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Subscription Time",
      cell: ({ row }) => {
        const date = convertDate(new Date(row?.original?.createdAt));
        return (
          <p>
            {date?.creationDate} {date?.creationTime}
          </p>
        );
      },
    },
    {
      id: "details",
      header: "View",
      cell: ({ row }) => {
        const id = row?.original?.subscriberInfo?._id;
        return (
          <Link
            href={`/mealProvider/customer/${id}`}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            View Subscriber`s Info
          </Link>
        );
      },
    },
    {
      id: "delete",
      header: "Action",
      cell: ({ row }) => {
        const id = row?.original?._id;
        const name = row.original?.subscriberInfo?.name;

        const handleDelete = async (
          setLoading: Dispatch<SetStateAction<boolean>>,
          setOpen: Dispatch<SetStateAction<boolean>>
        ) => {
          setLoading(true);
          if (!id) {
            toast.error("falid to remove blog", { duration: 3000 });
            setLoading(false);
            return;
          }
          const toastId = toast.loading("Removing blog...");
          try {
            const result = await deleteBlog(id);
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

        return (
          <ConfirmDelation
            value={`${name}'s subscription`}
            handleDelete={handleDelete}
          />
        );
      },
    },
  ];
