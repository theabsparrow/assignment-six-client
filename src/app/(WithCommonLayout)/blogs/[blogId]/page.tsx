import BlogDetailsComponent from "@/components/blog/BlogDetailsComponent";
import BlogCardSceleton from "@/components/sceleton/BlogCardSceleton";
import { getASingleBlog } from "@/services/blogService";

const Blogdetails = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const blogId = await params;
  const { data } = await getASingleBlog(blogId?.blogId);
  return (
    <section className="md:px-24 px-5">
      {data ? <BlogDetailsComponent blog={data} /> : <BlogCardSceleton />}
    </section>
  );
};

export default Blogdetails;
