import { TMyProfileQUery } from "@/app/(WithCommonLayout)/layout";
import SettingsComponent from "@/components/modules/dashboard/settings/SettingsComponent";
import { getMyProfle } from "@/services/profileService";

const Settings = async () => {
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "settings";
  const result = await getMyProfle(query);
  const data = result?.data || null;
  return (
    <div className="min-h-screen mx-auto">
      {" "}
      <SettingsComponent userData={data} />{" "}
    </div>
  );
};

export default Settings;
