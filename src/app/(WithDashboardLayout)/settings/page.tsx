import { TMyProfileQUery } from "@/app/(WithCommonLayout)/layout";
import SettingsComponent from "@/components/modules/dashboard/settings/SettingsComponent";
import { getMyProfle } from "@/services/profileService";

export const generateMetadata = async () => {
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "navbar";
  const { data } = await getMyProfle(query);
  if (!data) {
    return {
      title: "Profile not found - Daily Dish",
      description: "Sorry, your profile could not be found.",
    };
  }
  return {
    title: `Settings - ${data?.name} - Daily Dish`,
    description:
      "This is user profile where all the user information is shown to edit them if user want to recreate it ",
  };
};

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
