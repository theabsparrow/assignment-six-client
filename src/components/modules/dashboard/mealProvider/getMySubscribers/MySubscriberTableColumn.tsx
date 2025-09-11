"use client";
import { TGetAllSubscribersType } from "@/types/kitchenSubscriberTypes";
import { convertDate } from "@/utills/dateConverter";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

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
      id: "createdAt",
      header: "Subscription Date",
      cell: ({ row }) => {
        const date = convertDate(new Date(row?.original?.createdAt));
        return <p>{date?.creationDate}</p>;
      },
    },
    {
      id: "creationTime",
      header: "Subscription Time",
      cell: ({ row }) => {
        const date = convertDate(new Date(row?.original?.createdAt));
        return <p>{date?.creationTime}</p>;
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
  ];
