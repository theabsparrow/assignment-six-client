import PlanDetails from "@/components/modules/dashboard/customer/planDetails/PlanDetailsPage";
import { getPlanDetails } from "@/services/mealPlannerService.ts";

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
