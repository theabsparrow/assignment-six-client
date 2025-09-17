import MealProviderOrder from "@/components/modules/dashboard/mealProvider/MealProviderOrder/MealProviderOrder";
import { getMyOrders } from "@/services/orderService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "My Orders - Daily Dish",
  description:
    "All the orders which is active or deliveried or cancelled is here to be controlled and monitored.",
};
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
