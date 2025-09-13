import ProfileCompnent from "@/components/modules/dashboard/profile/ProfileCompnent";
import { getMyProfle } from "@/services/profileService";

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
