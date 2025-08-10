import BlogProfile from "@/components/modules/dashboard/admin/blogProfile/BlogProfile";
import { getBlogProfile } from "@/services/blogService";

const BlogProfilePage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const { data } = await getBlogProfile(blogId);
  return (
    <section className=" w-full">
      <BlogProfile data={data} />
    </section>
  );
};

export default BlogProfilePage;
