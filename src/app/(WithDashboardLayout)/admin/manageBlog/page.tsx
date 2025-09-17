import GetAllBlogs from "@/components/modules/dashboard/admin/manageBlog/GetAllBlogs";
import { getAllBlogsList } from "@/services/blogService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "Blogs - Daily Dish",
  description:
    "All the blogs created by the admin , customner or provider is here in one place together to be controlled by the admin",
};
const ManageBlogPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getAllBlogsList(query);
  const meta = data?.meta;
  const result = data?.result || [];
  return (
    <section className=" w-full">
      <GetAllBlogs meta={meta} result={result} />
    </section>
  );
};

export default ManageBlogPage;
