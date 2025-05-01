import { getMyProfle } from "@/services/profileService";
import KitchenProfile from "./KitchenProfile";
import CreateKitchen from "./createKtchen/CreateKitchen";
import { getMyKitchen } from "@/services/kitchenService";

const KitchenComponent = async () => {
  const { data } = await getMyProfle();
  const userdata = data?.userdata;

  const { data: kitchenInfo } = await getMyKitchen();

  return (
    <div>
      {userdata?.hasKitchen ? (
        <KitchenProfile kitchenInfo={kitchenInfo} />
      ) : (
        <CreateKitchen />
      )}
    </div>
  );
};

export default KitchenComponent;
