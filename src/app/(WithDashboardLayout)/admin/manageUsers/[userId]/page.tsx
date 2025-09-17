import UserProfile from "@/components/modules/dashboard/admin/userProfile/UserProfile";
import { getUserProfile } from "@/services/userService";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userId = await params;
  const { data } = await getUserProfile(userId?.userId);
  if (!data) {
    return {
      title: "user not found - Daily Dish",
      description: "Sorry, this blog could not be found.",
    };
  }
  return {
    title: `${data?.name} - Daily Dish`,
    description:
      "this page take the responsibility to show the specific details of a single user for the admin to take action.",
  };
};

const UserProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const { data } = await getUserProfile(userId);
  return (
    <section className=" w-full">
      <UserProfile data={data} />
    </section>
  );
};

export default UserProfilePage;
