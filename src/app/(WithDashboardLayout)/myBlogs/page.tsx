import GetMyBlogs from "@/components/modules/dashboard/myBlogs/GetMyBlogs";
import { getMyBlogs } from "@/services/blogService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "My Blogs - Daily Dish",
  description:
    "All the blogs created by the admin , customner or provider is here in one place together to be controlled by them",
};
const MyBlogsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getMyBlogs(query);
  const meta = data?.meta;
  const result = data?.result || [];
  return (
    <section className=" w-full">
      <GetMyBlogs myBlogs={result} meta={meta} />
    </section>
  );
};

export default MyBlogsPage;
