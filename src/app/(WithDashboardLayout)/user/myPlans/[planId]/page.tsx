import PlanDetails from "@/components/modules/dashboard/customer/planDetails/PlanDetailsPage";
import { getPlanDetails } from "@/services/mealPlannerService.ts";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ planId: string }>;
}) => {
  const { planId } = await params;
  const { data } = await await getPlanDetails(planId);
  if (!data) {
    return {
      title: "plan not found - Daily Dish",
      description: "Sorry, this blog could not be found.",
    };
  }
  return {
    title: ` ${data?.title} - Daily Dish`,
    description:
      "This is the specific plan page of a customer. Where he can see and edit of a specific plan",
  };
};
const PlanDetailsPage = async ({
  params,
}: {
  params: Promise<{ planId: string }>;
}) => {
  const { planId } = await params;
  const { data } = await getPlanDetails(planId);
  return (
    <section className="w-full">
      <PlanDetails data={data} />
    </section>
  );
};

export default PlanDetailsPage;
