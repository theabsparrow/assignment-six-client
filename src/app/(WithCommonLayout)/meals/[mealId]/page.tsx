import MealDetails from "@/components/mealDetails/MealDetails";
import { getASingleMeal } from "@/services/mealService";

const MealInfo = async ({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) => {
  const mealId = await params;
  const { data } = await getASingleMeal(mealId?.mealId);
  const { isMealExists, feedbackResult } = data;
  return (
    <div className="w-full py-10 lg:px-16 px-5">
      <MealDetails mealInfo={isMealExists} feedback={feedbackResult} />
    </div>
  );
};

export default MealInfo;
