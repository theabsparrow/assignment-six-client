import CHeckoutMeal from "@/components/checkout/CHeckoutMeal";
import { getCheckoutMeal } from "@/services/mealService";

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ checkoutId: string }>;
}) => {
  const { checkoutId } = await params;
  const { data } = await getCheckoutMeal(checkoutId);
  return (
    <div className="w-full py-10 lg:px-16 px-5">
      <CHeckoutMeal checkoutInfo={data} />
    </div>
  );
};

export default CheckoutPage;
