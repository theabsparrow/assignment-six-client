"use client";

import DeletionModal from "@/components/statusDropdown/DeletionModal";
import StatusDropdown from "@/components/statusDropdown/StatusDropdown";
import { deleteBlog, updateBlogStatus } from "@/services/blogService";
import { BlogStatus, TBlogProfile } from "@/types/blogTypes";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { FiEye } from "react-icons/fi";

const BlogProfile = ({ data }: { data: TBlogProfile }) => {
  const blogTitletrimmed =
    data?.title.length > 40 ? data?.title.slice(0, 40) + "..." : data?.title;
  const status = data?.status;
  const date = new Date(data?.createdAt);
  const creationDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const creationTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleDelete = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    setLoading(true);
    if (!data?._id) {
      toast.error("falid to remove blog", { duration: 3000 });
      setLoading(false);
      return;
    }
    const toastId = toast.loading("Removing blog...");
    try {
      const result = await deleteBlog(data?._id);
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
    const blogData = {
      status: option,
    };
    const toastId = toast.loading("updating status...");
    try {
      const result = await updateBlogStatus(data?._id, blogData);
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
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden w-full md:w-[90%] lg:w-[70%] mx-auto p-4 space-y-4">
      {data?.coverImage && (
        <div className="relative w-full h-[200px] md:h-[500px] overflow-hidden rounded-lg bg-white/65">
          <Image
            src={data?.coverImage}
            alt="Cover Image"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col text-sm text-gray-600 dark:text-gray-300 gap-2">
          <p>
            📅 {creationDate}, {creationTime}
          </p>
          <Link
            href={`/admin/manageUsers/${data?.authorId?._id}`}
            className="text-xl font-semibold text-primary hover:underline"
          >
            ✍️ {data?.name}
          </Link>
        </div>
        <div className="flex justify-between md:block">
          <h1 className=" bg-primary border border-secondary px-2 py-1 rounded-xl text-white flex items-center">
            Role: {data?.authorId?.role}
          </h1>
          <div className="md:hidden">
            <StatusDropdown
              status={data?.status as BlogStatus}
              options={["published", "archived"]}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="hidden md:block">
          <StatusDropdown
            status={data?.status as BlogStatus}
            options={["published", "archived"]}
            handleChange={handleChange}
          />
        </div>
        <div className="flex md:block">
          <p className="text-lg flex items-center gap-6 bg-secondary text-primary px-2 py-1 rounded-xl">
            <FiEye />{" "}
            <span className="text-xl font-semibold">{data?.view}</span>
          </p>
        </div>
      </div>
      {data?.tags && data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {data.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-secondary text-primary  md:text-xs rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {data?.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-200 text-lg">
          {data?.content}
        </p>
      </div>
      <DeletionModal
        name={blogTitletrimmed}
        collection="Blogs"
        handleDelete={handleDelete}
        title="Blog Deletion"
        buttonName="Delete Blog"
      />
    </div>
  );
};

export default BlogProfile;
