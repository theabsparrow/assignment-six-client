"use client";

import SubscribedButton from "@/components/kitchenDetails/SubscribedButton";
import { TKItchenSubscriber } from "@/types/kitchenSubscriberTypes";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const mySubscriptionTableColumn =
  (): ColumnDef<TKItchenSubscriber>[] => [
    {
      id: "name",
      header: "Kitchen Name",
      cell: ({ row }) => {
        const name = row.original?.kitchen?.kitchenName;
        return <span>{name}</span>;
      },
    },
    {
      id: "location",
      header: "Kitchen Location",
      cell: ({ row }) => {
        const type = row.original?.kitchen?.location;
        return <span>{type}</span>;
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
        const date = new Date(row.original?.createdAt);
        const convertedDate = date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        const convertedTime = date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return (
          <span>
            {convertedDate}, {convertedTime}
          </span>
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
