import MealProviderOrder from "@/components/modules/dashboard/MealProviderOrder/MealProviderOrder";
import { getMealProviderOrder } from "@/services/orderService";

const MyOrders = async () => {
  const { data } = await getMealProviderOrder();
  const { meta, result } = data;
  return (
    <div className="min-h-screen mx-auto">
      {" "}
      <MealProviderOrder meta={meta} result={result} />{" "}
    </div>
  );
};

export default MyOrders;
