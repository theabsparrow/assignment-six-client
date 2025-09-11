"use client";

import SubscribedButton from "@/components/kitchenDetails/SubscribedButton";
import { TKItchenSubscriber } from "@/types/kitchenSubscriberTypes";
import { convertDate } from "@/utills/dateConverter";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const mySubscriptionTableColumn =
  (): ColumnDef<TKItchenSubscriber>[] => [
    {
      id: "name",
      header: "Kitchen Name",
      cell: ({ row }) => {
        const name = row.original?.kitchen?.kitchenName;
        const trimedName = name.length > 16 ? name.slice(0, 16) + "..." : name;
        return (
          <div className="relative group inline-block">
            <h1>{trimedName}</h1>
            <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
              {name}
            </p>
          </div>
        );
      },
    },
    {
      id: "location",
      header: "Kitchen Location",
      cell: ({ row }) => {
        const location = row.original?.kitchen?.location;
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
      id: "type",
      header: "Kitchen Type",
      cell: ({ row }) => {
        const type = row.original?.kitchen?.kitchenType;
        return <span>{type}</span>;
      },
    },
    {
      id: "active",
      header: "Active",
      cell: ({ row }) => {
        const active = row.original?.kitchen?.isActive ? "Yes" : "No";
        return <span>{active}</span>;
      },
    },
    {
      id: "creation",
      header: "Subscribed At",
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
      id: "unsubscribe",
      header: "Action",
      cell: ({ row }) => {
        const id = row?.original?.kitchen?._id;
        return <SubscribedButton kitchenId={id} subscribed={true} />;
      },
    },
    {
      id: "details",
      header: "View",
      cell: ({ row }) => {
        const id = row?.original?.kitchen?._id;
        return (
          <Link
            href={`/kitchen/${id}`}
            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            Details
          </Link>
        );
      },
    },
  ];
