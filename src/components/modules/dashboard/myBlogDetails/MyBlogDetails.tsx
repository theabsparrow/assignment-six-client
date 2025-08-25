"use client";
import DeletionModal from "@/components/statusDropdown/DeletionModal";
import { deleteBlog, updateBlog } from "@/services/blogService";
import { BlogStatus, TBlogProfile, TUpdateBlog } from "@/types/blogTypes";
import { Dispatch, SetStateAction, useState } from "react";
import { FiEye } from "react-icons/fi";
import { toast } from "sonner";
import BlogImageupload from "./BlogImageupload";
import EditComponent from "../../editComponent/EditComponent";
import EditInputArray from "../../editArrayComponent/EditInputArray";

const MyBlogDetails = ({ data }: { data: TBlogProfile }) => {
  const blogTitletrimmed =
    data?.title.length > 40 ? data?.title.slice(0, 40) + "..." : data?.title;
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

  const [status, setStatus] = useState(data?.status ?? "");
  const [isstatusEditing, setIsStatusEditing] = useState(false);

  const [title, setTitle] = useState<string>(data?.title ?? "");
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  const [content, setContent] = useState(data?.content ?? "");
  const [isEditingContent, setIsEditingContent] = useState(false);

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

  const handleSubmit = async (
    field: string,
    addOptions: string[] | [],
    removeOptions: string[]
  ) => {
    const updatedData: Partial<TUpdateBlog> = {};
    if (field === "title") {
      const trimedValue = title.trim();
      if (trimedValue === data?.title) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.title = trimedValue;
      }
    }
    if (field === "content") {
      const trimedValue = content.trim();
      if (trimedValue === data?.content) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.content = trimedValue;
      }
    }
    if (field === "status") {
      if (status === data?.status) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.status = status;
      }
    }
    if (field === "tags") {
      if (addOptions?.length > 0) {
        updatedData.addTags = addOptions as string[];
      }
      if (removeOptions.length > 0) {
        updatedData.removeTags = removeOptions as string[];
      }
    }
    const toastId = toast.loading("blog info updating");
    try {
      const result = await updateBlog(data?._id, updatedData);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setIsTitleEditing(false);
        setIsEditingContent(false);
        setIsStatusEditing(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden w-full md:w-[90%] lg:w-[70%] mx-auto p-4 space-y-4">
      {data?.coverImage && (
        <BlogImageupload image={data?.coverImage} id={data?._id} />
      )}

      <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col text-sm text-gray-600 dark:text-gray-300 gap-2">
          <p>
            📅 {creationDate}, {creationTime}
          </p>
        </div>
        <div>
          {isstatusEditing ? (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BlogStatus)}
              className=" px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
            >
              {["archived", "published"].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex">
              <span
                className={` border border-seconday px-2 py-1 rounded-full ${
                  status === "published"
                    ? "bg-secondary text-primary"
                    : "bg-blue-700 text-white"
                }`}
              >
                {data?.status}
              </span>
            </div>
          )}
          <EditComponent
            setValue={setStatus}
            isEditing={isstatusEditing}
            setIsEditing={setIsStatusEditing}
            value={data?.status as BlogStatus}
            handleSubmit={handleSubmit}
            field="status"
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
          {data?.tags.length && (
            <EditInputArray
              value={data?.tags as string[]}
              handleSubmit={handleSubmit}
              label="tags"
            />
          )}
        </div>
      )}

      <div className="space-y-2">
        <div>
          {isTitleEditing ? (
            <input
              type="text"
              value={title}
              max={50}
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
              }}
              className="px-2 py-1 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {data?.title}
            </h2>
          )}
          <EditComponent
            setValue={setTitle}
            isEditing={isTitleEditing}
            setIsEditing={setIsTitleEditing}
            value={data?.title as string}
            handleSubmit={handleSubmit}
            field="title"
          />
        </div>
        <div>
          {isEditingContent ? (
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                minLength={30}
                maxLength={5000}
                rows={5}
                cols={60}
                className={`px-2 py-1 border rounded-md outline-none ${
                  content.length < 30
                    ? "border-red-500 focus:ring-red-500"
                    : "dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-secondary"
                }`}
              />
              {content.length < 30 && (
                <p className="text-xs text-red-500 mt-1">
                  ❌ content should be at least 30 character.
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-200 text-lg">
              {data?.content}
            </p>
          )}
          <EditComponent
            setValue={setContent}
            isEditing={isEditingContent}
            setIsEditing={setIsEditingContent}
            value={data?.content as string}
            handleSubmit={handleSubmit}
            field="content"
          />
        </div>
      </div>
      <DeletionModal
        name={blogTitletrimmed}
        collection="Blogs"
        handleDelete={handleDelete}
        title="Blog Deletion"
        buttonName="Delete Blog"
      />
    </section>
  );
};

export default MyBlogDetails;
