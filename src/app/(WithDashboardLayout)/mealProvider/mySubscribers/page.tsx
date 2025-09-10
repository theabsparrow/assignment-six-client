import GetMySubscribersComponent from "@/components/modules/dashboard/mealProvider/getMySubscribers/GetMySubscribersComponent";
import { getMyAllSubscribers } from "@/services/kitchenSubscriber";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const MySubscribersPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getMyAllSubscribers(query);
  const { mySubscribers, meta, totalSubscribers } = data;
  return (
    <section className=" w-full min-h-screen">
      <GetMySubscribersComponent
        data={mySubscribers}
        meta={meta}
        totalSubscribers={totalSubscribers}
      />
    </section>
  );
};

export default MySubscribersPage;
