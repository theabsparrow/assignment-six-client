import CustomerProfile from "@/components/modules/dashboard/mealProvider/customerProfile/CustomerProfile";
import { getUserProfile } from "@/services/userService";
import React from "react";

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
