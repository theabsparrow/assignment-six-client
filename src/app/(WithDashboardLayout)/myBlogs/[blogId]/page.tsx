import MyBlogDetails from "@/components/modules/dashboard/myBlogDetails/MyBlogDetails";
import { getBlogProfile } from "@/services/blogService";

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const { data } = await getBlogProfile(blogId);
  return (
    <section className=" w-full">
      <MyBlogDetails data={data} />
    </section>
  );
};

export default BlogDetailsPage;
