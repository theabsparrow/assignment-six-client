import BlogDetailsComponent from "@/components/blog/BlogDetailsComponent";
import { getASingleBlog } from "@/services/blogService";

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
