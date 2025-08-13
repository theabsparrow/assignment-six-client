import CreateKitchen from "@/components/modules/dashboard/mealProvider/createKtchen/CreateKitchen";
import KitchenProfile from "@/components/modules/dashboard/mealProvider/kitchenProfile/KitchenProfile";
import { getMyKitchen } from "@/services/kitchenService";
import { getMyProfle } from "@/services/profileService";

const MyKitchn = async () => {
  const { data } = await getMyProfle();
  const userdata = data?.userdata;
  const user = data?.user;
  const { data: kitchenInfo } = await getMyKitchen();
  return (
    <section className=" min-h-screen mx-auto">
      {userdata?.hasKitchen ? (
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
