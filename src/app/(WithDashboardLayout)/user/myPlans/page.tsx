import MyPlanComponent from "@/components/modules/dashboard/customer/myPlans/MyPlanComponent";
import { getMyPlans } from "@/services/mealPlannerService.ts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const MyPlans = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getMyPlans(query);
  const myPlans = data?.result;
  const meta = data?.meta;
  return (
    <section className=" w-full">
      <MyPlanComponent myPlans={myPlans} meta={meta} />
    </section>
  );
};

export default MyPlans;
