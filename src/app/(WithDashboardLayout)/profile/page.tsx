import ProfileCompnent from "@/components/modules/dashboard/profile/ProfileCompnent";
import { getMyProfle } from "@/services/profileService";

const Profile = async () => {
  const { data } = await getMyProfle();
  const user = data?.user;
  const userdata = data?.userdata;
  return (
    <div className="min-h-screen mx-auto">
      <ProfileCompnent user={user} userdata={userdata} />
    </div>
  );
};

export default Profile;
