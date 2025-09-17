import MyOrderCOmponent from "@/components/modules/dashboard/customer/myOrders/MyOrderCOmponent";
import { getMyOrders } from "@/services/orderService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "My Orders - Daily Dish",
  description:
    "This is the order info page of a customer where he can monitor of all his orders and controll them",
};
const MyOrders = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getMyOrders(query);
  const { meta, result } = data;

  return (
    <section className=" w-full">
      <MyOrderCOmponent myOrders={result} meta={meta} />
    </section>
  );
};

export default MyOrders;
