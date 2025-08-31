import MealProviderOrder from "@/components/modules/dashboard/mealProvider/MealProviderOrder/MealProviderOrder";
import { getMyOrders } from "@/services/orderService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const MyOrders = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getMyOrders(query);
  const { meta, result } = data;

  return (
    <section className=" w-full min-h-screen">
      <MealProviderOrder meta={meta} myOrders={result} />
    </section>
  );
};

export default MyOrders;
