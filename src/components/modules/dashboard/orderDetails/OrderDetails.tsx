import { TSingleOrder } from "@/types/orderTypes";

const OrderDetails = ({ order }: { order: TSingleOrder }) => {
  const date = new Date(order?.createdAt);
  const creationDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const creationTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:from-gray-800 dark:to-gray-700 overflow-hidden max-w-4xl mx-auto px-4 py-4 space-y-4 md:space-y-10">
      <p>
        creation: <span>{creationDate}</span> <span>{creationTime}</span>
      </p>
    </section>
  );
};

export default OrderDetails;
