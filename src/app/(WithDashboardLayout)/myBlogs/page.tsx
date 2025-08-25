import GetMyBlogs from "@/components/modules/dashboard/myBlogs/GetMyBlogs";
import { getMyBlogs } from "@/services/blogService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
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
