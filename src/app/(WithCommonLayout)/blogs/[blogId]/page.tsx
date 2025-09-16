import BlogDetailsComponent from "@/components/blog/BlogDetailsComponent";
import { getASingleBlog } from "@/services/blogService";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const blogId = await params;
  const { data } = await getASingleBlog(blogId?.blogId);
  if (!data) {
    return {
      title: "Blog not found - Daily Dish",
      description: "Sorry, this blog could not be found.",
    };
  }

  return {
    title: `${data?.title} - Daily Dish`,
    description: data?.excerpts || "Discover this blog on Daily Dish.",
  };
};

const Blogdetails = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const blogId = await params;
  const { data } = await getASingleBlog(blogId?.blogId);
  return (
    <section className="w-full py-10 lg:px-16 px-5">
      <BlogDetailsComponent blog={data} />
    </section>
  );
};

export default Blogdetails;
