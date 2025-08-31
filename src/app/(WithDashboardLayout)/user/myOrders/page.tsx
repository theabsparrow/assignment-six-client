import MyOrderCOmponent from "@/components/modules/dashboard/customer/myOrders/MyOrderCOmponent";
import { getMyOrders } from "@/services/orderService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
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
