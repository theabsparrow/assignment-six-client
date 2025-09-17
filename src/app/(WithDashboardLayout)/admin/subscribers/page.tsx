import GetAllSubscribers from "@/components/modules/dashboard/admin/subscribers/GetAllSubscribers";
import { getAllSubscribers } from "@/services/newsLetterService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "Subscribers - Daily Dish",
  description:
    "This page is responsible for showing the users who subscribed dalydish. the subscribed users will notify user through email",
};
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
