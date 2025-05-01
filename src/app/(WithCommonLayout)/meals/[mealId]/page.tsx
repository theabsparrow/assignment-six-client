import MealDetails from "@/components/mealDetails/MealDetails";
import { getASingleMeal } from "@/services/mealService";

const MealInfo = async ({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) => {
  const mealId = await params;
  const { data } = await getASingleMeal(mealId?.mealId);
  return (
    <div className="md:px-16 px-5">
      <MealDetails mealInfo={data} />
    </div>
  );
};

export default MealInfo;
