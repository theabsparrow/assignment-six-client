import KitchenDetails from "@/components/kitchenDetails/KitchenDetails";
import { getASingleKitchen } from "@/services/kitchenService";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ kitchenId: string }>;
}) => {
  const { kitchenId } = await params;
  const { data } = await getASingleKitchen(kitchenId);
  const kitchen = data?.result;
  if (!kitchen) {
    return {
      title: "Kitchen not found | Daily Dish",
      description: "Sorry, this kitchen could not be found.",
    };
  }
  return {
    title: `${kitchen.kitchenName} | Daily Dish`,
    description: "Discover this blog on Daily Dish.",
  };
};

const KitchenDetailsPage = async ({
  params,
}: {
  params: Promise<{ kitchenId: string }>;
}) => {
  const { kitchenId } = await params;
  const { data } = await getASingleKitchen(kitchenId);

  return (
    <section className="w-full py-10 lg:px-16 px-5">
      <KitchenDetails data={data} />
    </section>
  );
};

export default KitchenDetailsPage;
