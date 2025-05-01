import MyOrderCOmponent from "@/components/modules/dashboard/myOrders.tsx/MyOrderCOmponent";
import { getCustomerOrder } from "@/services/orderService";

const MyOrders = async () => {
  const { data } = await getCustomerOrder();
  const { meta, result } = data;
  return (
    <div className="min-h-screen mx-auto">
      <MyOrderCOmponent meta={meta} result={result} />
    </div>
  );
};

export default MyOrders;
