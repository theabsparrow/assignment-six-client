import CreateKitchen from "@/components/modules/dashboard/kitchen/createKtchen/CreateKitchen";
import KitchenProfile from "@/components/modules/dashboard/kitchen/KitchenProfile";
import { getMyKitchen } from "@/services/kitchenService";
import { getMyProfle } from "@/services/profileService";

const MyKitchn = async () => {
  const { data } = await getMyProfle();
  const userdata = data?.userdata;
  const user = data?.user;
  const { data: kitchenInfo } = await getMyKitchen();
  return (
    <div className="mx-auto">
      {userdata?.hasKitchen ? (
        <KitchenProfile
          kitchenInfo={kitchenInfo}
          verifiedEmail={user?.verifiedWithEmail}
        />
      ) : (
        <CreateKitchen verifiedEmail={user?.verifiedWithEmail} />
      )}
    </div>
  );
};

export default MyKitchn;
