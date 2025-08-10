import KitchenDetails from "@/components/kitchenDetails/KitchenDetails";
import { getASingleKitchen } from "@/services/kitchenService";

const KitchenDetailsPage = async ({
  params,
}: {
  params: Promise<{ kitchenId: string }>;
}) => {
  const { kitchenId } = await params;
  const { data } = await getASingleKitchen(kitchenId);
  return (
    <section className=" w-full py-10 md:px-24 px-5">
      <KitchenDetails data={data} />
    </section>
  );
};

export default KitchenDetailsPage;
