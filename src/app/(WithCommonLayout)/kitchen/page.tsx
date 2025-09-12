import KitchenComponent from "@/components/kitchen/KitchenComponent";
import { getAllKitchen } from "@/services/kitchenService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

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
