import { TMyProfileQUery } from "@/app/(WithCommonLayout)/layout";
import CreateKitchen from "@/components/modules/dashboard/mealProvider/createKtchen/CreateKitchen";
import KitchenProfile from "@/components/modules/dashboard/mealProvider/kitchenProfile/KitchenProfile";
import { getMyKitchen } from "@/services/kitchenService";
import { getMyProfle } from "@/services/profileService";

const MyKitchn = async () => {
  const query: Record<string, TMyProfileQUery | undefined> = {};
  query.for = "kitchen";
  const result = await getMyProfle(query);
  const data = result?.data || null;
  const { user } = data;
  const { data: kitchenInfo } = await getMyKitchen();
  return (
    <section className=" min-h-screen mx-auto py-10">
      {data?.hasKitchen ? (
        <KitchenProfile
          kitchenInfo={kitchenInfo}
          verifiedEmail={user?.verifiedWithEmail}
        />
      ) : (
        <CreateKitchen verifiedEmail={user?.verifiedWithEmail} />
      )}
    </section>
  );
};

export default MyKitchn;
