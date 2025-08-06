import GetAllBlogs from "@/components/modules/dashboard/admin/manageBlog/GetAllBlogs";
import { getAllBlogsList } from "@/services/blogService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
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
