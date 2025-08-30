import OrderDetails from "@/components/modules/dashboard/orderDetails/OrderDetails";
import { getCurrentUser } from "@/services/authService";
import { getASingleOrder } from "@/services/orderService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const MealProviderOrderDetails = async ({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: SearchParams;
}) => {
  const { orderId } = await params;
  const query = await searchParams;
  const result = await getASingleOrder({ orderId, query });
  const { isOrderExists, result: revirewdata, meta, isReviewExists } = result;
  const user = (await getCurrentUser()) || null;
  return (
    <section className="w-full">
      <OrderDetails
        order={isOrderExists}
        role={user?.userRole}
        review={revirewdata}
        meta={meta}
        isReview={isReviewExists}
      />
    </section>
  );
};

export default MealProviderOrderDetails;
