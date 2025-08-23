import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

type OrderSuccessProps = {
  mealName: string;
  KitchenName: string;
};
const SuccessComponent = ({ mealName, KitchenName }: OrderSuccessProps) => {
  return (
    <section className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-8 space-y-8">
        {/* Success Icon & Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Order Confirmed 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Your meal request has been placed successfully. We’re excited to
            serve you!
          </p>
        </div>

        {/* Meal Details */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 shadow-sm space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Meal Ordered
          </h3>
          <p className="text-primary font-medium">{mealName}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            The meal provider from{" "}
            <span className="font-semibold">{KitchenName}</span> has been
            notified via email about your Order.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/user/myOrders"
            className="w-full md:w-auto inline-flex justify-center items-center px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:bg-primary/90 transition duration-300"
          >
            Go to My Orders
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessComponent;
