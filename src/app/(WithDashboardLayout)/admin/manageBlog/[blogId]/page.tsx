import BlogProfile from "@/components/modules/dashboard/admin/blogProfile/BlogProfile";
import { getBlogProfile } from "@/services/blogService";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;
  const { data } = await getBlogProfile(blogId);
  if (!data) {
    return {
      title: "blog not found - Daily Dish",
      description: "Sorry, this blog could not be found.",
    };
  }
  return {
    title: `${data?.title} - Daily Dish`,
    description:
      "A single blog`s specific details is available here on the eye of an admin, who can controll the flow of the blog",
  };
};
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
