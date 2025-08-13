import MyPlanComponent from "@/components/modules/dashboard/customer/myPlans/MyPlanComponent";
import { getMyPlans } from "@/services/mealPlannerService.ts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
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
