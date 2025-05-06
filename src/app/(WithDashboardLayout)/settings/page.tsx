import SettingsComponent from "@/components/modules/dashboard/settings/SettingsComponent";
import { getMyProfle } from "@/services/profileService";

const Settings = async () => {
  const { data } = await getMyProfle();
  // const { data: user } = await getMyInfo();
  // const user = data?.result;
  const user = data?.user;
  return (
    <div className="min-h-screen mx-auto">
      {" "}
      <SettingsComponent user={user} />{" "}
    </div>
  );
};

export default Settings;
