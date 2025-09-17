import GetAllKitchens from "@/components/modules/dashboard/admin/manageKitchen/GetAllKitchens";
import { getAllKitchen } from "@/services/kitchenService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "Kitchens - Daily Dish",
  description:
    "All the kitchens are here to be controlled through the admin. The kitchens are here with filter pagination searching.",
};
const ManageKitchenPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getAllKitchen(query);
  const meta = data?.meta;
  const result = data?.result || [];
  return (
    <section className=" w-full">
      <GetAllKitchens meta={meta} result={result} />
    </section>
  );
};

export default ManageKitchenPage;
