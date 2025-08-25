import BlogComponent from "@/components/blog/BlogComponent";
import { getCurrentUser } from "@/services/authService";
import { getAllBlogs } from "@/services/blogService";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Blogs = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const user = await getCurrentUser();
  const { data: blogData } = await getAllBlogs(query);
  const blogInfo = blogData?.result || [];
  const meta = blogData?.meta;

  return (
    <section className="md:px-24 px-5">
      <BlogComponent role={user?.userRole} blogInfo={blogInfo} meta={meta} />
    </section>
  );
};

export default Blogs;
