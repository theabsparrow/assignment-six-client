import MyPlanComponent from "@/components/modules/dashboard/myPlans/MyPlanComponent";
import { getMyPlans } from "@/services/mealPlannerService.ts";

const MyPlans = async () => {
  const { data } = await getMyPlans();
  const myPlanner = data?.result;
  const meta = data?.meta;
  return (
    <div className="min-h-screen mx-auto">
      <MyPlanComponent myPlanner={myPlanner} meta={meta} />
    </div>
  );
};

export default MyPlans;
