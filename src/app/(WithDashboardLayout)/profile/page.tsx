import ProfileCompnent from "@/components/modules/dashboard/profile/ProfileCompnent";
import { getMyProfle } from "@/services/profileService";

export const generateMetadata = async () => {
  const { data } = await getMyProfle();
  if (!data) {
    return {
      title: "Profile not found - Daily Dish",
      description: "Sorry, your profile could not be found.",
    };
  }
  return {
    title: `Profile - ${data?.name} - Daily Dish`,
    description:
      "This is user profile where all the user information is shown to edit them if user want to recreate it ",
  };
};

const Profile = async () => {
  const result = await getMyProfle();
  const data = result?.data || null;
  return (
    <section className="min-h-screen mx-auto py-10">
      <ProfileCompnent userdata={data} />
    </section>
  );
};

export default Profile;
