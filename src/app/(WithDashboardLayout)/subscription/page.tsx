import GetMySubscription from "@/components/modules/dashboard/subscriptions/GetMySubscription";
import { getMyAllSubscription } from "@/services/kitchenSubscriber";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "Subscriptions - Daily Dish",
  description:
    "This is the subscription page. if a user subscribe to a kitchen he can see here that which kitchens are subscribed by them.",
};
const SubscriptionPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getMyAllSubscription(query);
  const meta = data?.meta;
  const result = data?.results || [];

  return (
    <section className=" w-full">
      <GetMySubscription meta={meta} result={result} />
    </section>
  );
};

export default SubscriptionPage;
