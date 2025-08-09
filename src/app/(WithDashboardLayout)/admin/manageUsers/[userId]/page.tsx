import UserProfile from "@/components/modules/dashboard/admin/userProfile/UserProfile";
import { getUserProfile } from "@/services/userService";

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
