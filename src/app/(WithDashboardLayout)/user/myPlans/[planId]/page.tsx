const PlanDetailsPage = async ({
  params,
}: {
  params: Promise<{ planId: string }>;
}) => {
  const { planId } = await params;
  console.log(planId);
  return <div>this is my plan</div>;
};

export default PlanDetailsPage;
