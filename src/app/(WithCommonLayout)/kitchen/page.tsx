import KitchenComponent from "@/components/modules/kitchen/KitchenComponent";
import { getAllKitchen } from "@/services/kitchenService";

const Kitchens = async () => {
  const { data } = await getAllKitchen();
  const kitchenInfo = data?.result;
  const meta = data?.meta;
  return (
    <div className="md:px-16 px-5">
      <KitchenComponent kitchenInfo={kitchenInfo} meta={meta} />
    </div>
  );
};

export default Kitchens;
