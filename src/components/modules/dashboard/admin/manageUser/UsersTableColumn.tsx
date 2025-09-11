"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import TableDropDown from "@/components/tableDropdown/TableDropDown";
import { deleteUser, updateStatus } from "@/services/userService";
import { TUserListingType } from "@/types";
import { TStatus } from "@/types/subscriber.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const usersTableColumn = (): ColumnDef<TUserListingType>[] => [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original?.profile?.name;
      const trimedName = name.length > 16 ? name.slice(0, 16) + "..." : name;
      const id = row.original?._id;
      return (
        <div className="relative group inline-block">
          <h1>
            {" "}
            <Link
              href={`/admin/manageUsers/${id}`}
              className="text-primary dark:text-secondary hover:underline duration-500"
            >
              {trimedName}
            </Link>
          </h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {name}
          </p>
        </div>
      );
    },
  },
  { accessorKey: "email", header: "Email" },
  {
    id: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original?.profile?.gender;
      return <span>{gender}</span>;
    },
  },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const id = row.original?._id;
      const status = row.original?.status;
      const statusStyles: Record<TStatus, string> = {
        active:
          "text-primary hover:bg-green-50 dark:text-secondary dark:hover:bg-gray-800",
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
          const result = await updateStatus(id, data);
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
    id: "verifiedWithEmail",
    header: "Verified",
    cell: ({ row }) => {
      const verified = row.original?.verifiedWithEmail ? "Yes" : "No";
      return <span>{verified}</span>;
    },
  },
  {
    id: "kitchen",
    header: "Kitchen",
    cell: ({ row }) => {
      const hasKitchen = row.original?.profile?.hasKitchen ? "Yes" : "No";
      return <span>{hasKitchen}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row?.original?._id;
      const name = row.original?.profile?.name;

      const handleDelete = async (
        setLoading: Dispatch<SetStateAction<boolean>>,
        setOpen: Dispatch<SetStateAction<boolean>>
      ) => {
        setLoading(true);
        if (!id) {
          toast.error("falid to remove user", { duration: 3000 });
          setLoading(false);
          return;
        }
        const toastId = toast.loading("Removing user...");
        try {
          const result = await deleteUser(id);
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
