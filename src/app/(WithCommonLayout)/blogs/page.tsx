import BlogComponent from "@/components/blog/BlogComponent";
import { getAllBlogs } from "@/services/blogService";
import { getMyProfle } from "@/services/profileService";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Blogs = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getMyProfle();
  const { data: blogData } = await getAllBlogs(query);
  const blogInfo = blogData?.result || [];
  const meta = blogData?.meta;

  return (
    <section className="md:px-24 px-5">
      <BlogComponent role={data?.user?.role} blogInfo={blogInfo} meta={meta} />
    </section>
  );
};

export default Blogs;
