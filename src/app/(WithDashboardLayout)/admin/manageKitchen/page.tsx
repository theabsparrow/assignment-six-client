import GetAllKitchens from "@/components/modules/dashboard/admin/manageKitchen/GetAllKitchens";
import { getAllKitchen } from "@/services/kitchenService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

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
