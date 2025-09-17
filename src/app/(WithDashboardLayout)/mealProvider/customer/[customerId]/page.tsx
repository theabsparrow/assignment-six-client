import CustomerProfile from "@/components/modules/dashboard/mealProvider/customerProfile/CustomerProfile";
import { getUserProfile } from "@/services/userService";
import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) => {
  const { customerId } = await params;
  const { data } = await getUserProfile(customerId);
  if (!data) {
    return {
      title: "user not found - Daily Dish",
      description: "Sorry, this blog could not be found.",
    };
  }
  return {
    title: `${data?.name} - Daily Dish`,
    description:
      "A single users info is here to monitor for the provider who is the subscribers of his dedicated kitchen",
  };
};
const CustomerDetails = async ({
  params,
}: {
  params: Promise<{ customerId: string }>;
}) => {
  const { customerId } = await params;
  const { data } = await getUserProfile(customerId);

  return (
    <section className=" w-full">
      <CustomerProfile customerData={data} />
    </section>
  );
};

export default CustomerDetails;
