import BlogComponent from "@/components/blog/BlogComponent";
import { getCurrentUser } from "@/services/authService";
import { getAllBlogs } from "@/services/blogService";
import { Metadata } from "next";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Blogs - Daily Dish",
  description:
    "Explore our blogs related to healthy food. About diet, delicious food menu, reciepi for certain food",
};

const Blogs = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const user = await getCurrentUser();
  const { data: blogData } = await getAllBlogs(query);
  const blogInfo = blogData?.result || [];
  const meta = blogData?.meta;

  return (
    <section className="lg:px-16 px-5">
      <BlogComponent role={user?.userRole} blogInfo={blogInfo} meta={meta} />
    </section>
  );
};

export default Blogs;
