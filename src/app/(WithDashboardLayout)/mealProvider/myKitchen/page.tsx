import CreateKitchen from "@/components/modules/dashboard/kitchen/createKtchen/CreateKitchen";
import KitchenProfile from "@/components/modules/dashboard/kitchen/KitchenProfile";
import { getMyKitchen } from "@/services/kitchenService";
import { getMyProfle } from "@/services/profileService";

const MyKitchn = async () => {
  const { data } = await getMyProfle();
  const userdata = data?.userData;
  const user = data?.user;
  const { data: kitchenInfo } = await getMyKitchen();
  return (
    <div>
      {userdata?.hasKitchen ? (
        <KitchenProfile kitchenInfo={kitchenInfo} />
      ) : (
        <CreateKitchen verifiedEmail={user?.verifiedWithEmail} />
      )}
    </div>
  );
};

export default MyKitchn;
