import KitchenComponent from "@/components/kitchen/KitchenComponent";
import { getAllKitchen } from "@/services/kitchenService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Kitchens - Daily Dish",
  description:
    "Explore the kitchens of daily dish. find your prefer kitchen and know more about others kitchen also.",
};
const Kitchens = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  query.isActive = "true";
  const { data } = await getAllKitchen(query);
  const kitchenInfo = data?.result || [];
  const meta = data?.meta;
  return (
    <div className="lg:px-16 px-5">
      <KitchenComponent kitchenInfo={kitchenInfo} meta={meta} />
    </div>
  );
};

export default Kitchens;
