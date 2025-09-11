"use client";
import ConfirmDelation from "@/components/confirmDeletion/ConfirmDeletion";
import TableDropDown from "@/components/tableDropdown/TableDropDown";
import { deleteBlog, updateBlog } from "@/services/blogService";
import { BlogStatus, TMyBlogs } from "@/types/blogTypes";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const myBlogTableCOlumn = (): ColumnDef<TMyBlogs>[] => [
  {
    accessorKey: "title",
    header: "Blog Title",
    cell: ({ row }) => {
      const title: string = row.original.title;
      const trimmedTitle =
        title.length > 20 ? title.slice(0, 20) + "..." : title;
      return (
        <div className="relative group inline-block">
          <h1>{trimmedTitle}</h1>
          <p className="absolute bottom-full left-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-2 py-1 shadow-md whitespace-nowrap z-10">
            {title}
          </p>
        </div>
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
  { accessorKey: "view", header: "Views" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row?.original?._id;

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

      return <ConfirmDelation value="this blog" handleDelete={handleDelete} />;
    },
  },

  {
    id: "details",
    header: "View",
    cell: ({ row }) => {
      const id = row?.original?._id;
      return (
        <Link
          href={`/myBlogs/${id}`}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Details
        </Link>
      );
    },
  },
];
