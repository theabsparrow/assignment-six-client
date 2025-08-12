import GetMySubscription from "@/components/modules/dashboard/subscriptions/GetMySubscription";
import { getMyAllSubscription } from "@/services/kitchenSubscriber";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

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
