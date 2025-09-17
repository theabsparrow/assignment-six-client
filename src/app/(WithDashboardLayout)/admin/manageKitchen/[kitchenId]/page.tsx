import KitchenProfile from "@/components/modules/dashboard/admin/kitchenProfile/KitchenProfile";
import { getKitchenProfile } from "@/services/kitchenService";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ kitchenId: string }>;
}) => {
  const kitchenId = await params;
  const { data } = await getKitchenProfile(kitchenId?.kitchenId);
  const result = data?.isKitchenExists;
  if (!result) {
    return {
      title: "kitchen not found - Daily Dish",
      description: "Sorry, this blog could not be found.",
    };
  }
  return {
    title: `${result?.kitchenName} - Daily Dish`,
    description:
      "A kitchen`s detail information is available here for the admin who can controll the flow of the kitchen ",
  };
};
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
