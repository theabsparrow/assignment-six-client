import MyBlogDetails from "@/components/modules/dashboard/myBlogDetails/MyBlogDetails";
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
      "A single blog`s specific details is available here on the eye of its creator, who can controll the flow of the blog",
  };
};
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
