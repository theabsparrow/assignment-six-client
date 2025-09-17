import GetMySubscribersComponent from "@/components/modules/dashboard/mealProvider/getMySubscribers/GetMySubscribersComponent";
import { getMyAllSubscribers } from "@/services/kitchenSubscriber";
import { Metadata } from "next";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "My Subscribers - Daily Dish",
  description:
    "The subscribers of a certain meal provider`s kitchen all are available here so that a provider can monitor them properly",
};
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
