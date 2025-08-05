"use client";

import { TStatus, TSubscriber } from "@/types/subscriber.types";
import { ColumnDef } from "@tanstack/react-table";
import DropdownStatus from "./DropDownStatus";
import ConfirmDelation from "./ConfirmDelation";

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
      return <DropdownStatus status={status} id={id} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Subscribed Date",
    cell: ({ row }) => {
      const date = new Date(row.original?.createdAt);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Subscribed Time",
    cell: ({ row }) => {
      const time = new Date(row.original?.updatedAt);
      return time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row?.original?._id;
      const email = row?.original?.email;
      return <ConfirmDelation id={id} email={email} />;
    },
  },
];
