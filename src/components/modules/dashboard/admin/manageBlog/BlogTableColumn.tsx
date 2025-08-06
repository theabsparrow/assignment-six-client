"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import TableDropDown from "@/components/tableDropdown/TableDropDown";
import { deleteBlog, updateBlog } from "@/services/blogService";
import { BlogStatus, TAllBlogListing } from "@/types/blogTypes";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const blogTableColumn = (): ColumnDef<TAllBlogListing>[] => [
  {
    accessorKey: "title",
    header: "Blog Title",
    cell: ({ row }) => {
      const title: string = row.original.title;
      const trimmedTitle =
        title.length > 40 ? title.slice(0, 40) + "..." : title;
      return <span>{trimmedTitle}</span>;
    },
  },
  {
    id: "name",
    header: "Author Name",
    cell: ({ row }) => {
      const name = row.original?.name;
      const id = row.original?.authorId?._id;
      return (
        <Link
          href={`/admin/users/${id}`}
          className="text-primary hover:underline"
        >
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const id = row.original?._id;
      const status = row.original?.status;
      const statusStyles: Record<BlogStatus, string> = {
        published: "text-green-700 bg-green-100 hover:bg-green-50",
        archived: "text-blue-700 bg-blue-100 hover:bg-blue-50",
      };
      const handleChange = async (
        option: BlogStatus,
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
          const result = await updateBlog(id, data);
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
          options={["published", "archived"]}
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
    header: "Create Date",
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
    header: "Create Time",
    cell: ({ row }) => {
      const time = new Date(row.original?.createdAt);
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
      const name = row.original?.name;

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
        <ConfirmDelation value={`${name}'s blog`} handleDelete={handleDelete} />
      );
    },
  },
  {
    id: "details",
    header: "View",
    cell: ({ row }) => {
      const id = row?.original?._id;
      return (
        <Link
          href={`/blog/${id}`}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Details
        </Link>
      );
    },
  },
];
