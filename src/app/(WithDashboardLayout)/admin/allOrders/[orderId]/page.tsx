import OrderDetails from "@/components/modules/dashboard/orderDetails/OrderDetails";
import { getASingleOrder } from "@/services/orderService";

const AdminOrderDeatils = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;
  const { data } = await getASingleOrder(orderId);

  return (
    <section className="w-full">
      <OrderDetails order={data} />
    </section>
  );
};

export default AdminOrderDeatils;
