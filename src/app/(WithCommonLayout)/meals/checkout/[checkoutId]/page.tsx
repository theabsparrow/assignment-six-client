import CHeckoutMeal from "@/components/checkout/CHeckoutMeal";
import { getASingleMeal } from "@/services/mealService";

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ checkoutId: string }>;
}) => {
  const checkoutId = await params;
  const { data } = await getASingleMeal(checkoutId?.checkoutId);
  return (
    <div className="md:px-16 px-5">
      <CHeckoutMeal checkoutInfo={data} />
    </div>
  );
};

export default CheckoutPage;
