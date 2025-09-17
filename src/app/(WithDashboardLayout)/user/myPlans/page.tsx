import MyPlanComponent from "@/components/modules/dashboard/customer/myPlans/MyPlanComponent";
import { getMyPlans } from "@/services/mealPlannerService.ts";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "My Plans - Daily Dish",
  description:
    "This is the order info page of a customer where he can monitor of all his orders and controll them",
};
const MyPlans = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getMyPlans(query);

  return (
    <section className=" w-full">
      <MyPlanComponent myPlans={data} />
    </section>
  );
};

export default MyPlans;
