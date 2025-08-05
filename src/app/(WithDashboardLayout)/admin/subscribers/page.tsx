import GetAllSubscribers from "@/components/modules/dashboard/admin/subscribers/GetAllSubscribers";
import { getAllSubscribers } from "@/services/newsLetterService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const SubscribersPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getAllSubscribers(query);
  const meta = data?.meta;
  const result = data?.result;
  return (
    <section className=" w-full md:px-10">
      <GetAllSubscribers meta={meta} result={result} />
    </section>
  );
};

export default SubscribersPage;
