import KitchenProfile from "@/components/modules/dashboard/admin/kitchenProfile/KitchenProfile";
import { getKitchenProfile } from "@/services/kitchenService";

const KitchenPage = async ({
  params,
}: {
  params: Promise<{ kitchenId: string }>;
}) => {
  const { kitchenId } = await params;
  const { data } = await getKitchenProfile(kitchenId);
  return (
    <section className=" w-full">
      <KitchenProfile data={data} />
    </section>
  );
};

export default KitchenPage;
