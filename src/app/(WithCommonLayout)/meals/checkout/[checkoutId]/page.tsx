import CHeckoutMeal from "@/components/checkout/CHeckoutMeal";
import { getCheckoutMeal } from "@/services/mealService";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ checkoutId: string }>;
}) => {
  const { checkoutId } = await params;
  const { data } = await getCheckoutMeal(checkoutId);

  if (!data) {
    return {
      title: "Kitchen not found - Daily Dish",
      description: "Sorry, this meal checkout could not be found.",
    };
  }

  return {
    title: `Checkout- ${data?.isMealExists?.title} - Daily Dish`,
    description:
      "Checkout this meal to order this. Before place the order please fill up all the data and ensure about our order",
  };
};

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
