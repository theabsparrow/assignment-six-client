import OrderDetails from "@/components/modules/dashboard/orderDetails/OrderDetails";
import { getCurrentUser } from "@/services/authService";
import { getASingleOrder } from "@/services/orderService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: SearchParams;
}) => {
  const { orderId } = await params;
  const query = await searchParams;
  const { data } = await getASingleOrder({ orderId, query });
  const result = data?.isOrderExists;
  if (!result) {
    return {
      title: "meal not found - Daily Dish",
      description: "Sorry, this blog could not be found.",
    };
  }
  return {
    title: `Order | ${result?.mealId?.title} - Daily Dish`,
    description:
      "This page is responsible for the details shown of a specific meal which can be shown and controlled by the admin.",
  };
};
const AdminOrderDeatils = async ({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: SearchParams;
}) => {
  const { orderId } = await params;
  const query = await searchParams;
  const { data } = await getASingleOrder({ orderId, query });
  const { isOrderExists, result: revirewdata, meta, isReviewExists } = data;
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

export default AdminOrderDeatils;
