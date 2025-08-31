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
        const name = row.original?.subscriberInfo?.name;
        const id = row.original?.subscriberInfo._id;
        return (
          <Link
            href={`/mealProvider/customer/${id}`}
            className="text-primary hover:underline duration-500"
          >
            {name}
          </Link>
        );
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
  ];
