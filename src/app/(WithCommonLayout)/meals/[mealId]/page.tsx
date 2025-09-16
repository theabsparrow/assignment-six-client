import MealDetails from "@/components/mealDetails/MealDetails";
import { getAllMealsOfAMeal } from "@/services/feedbackService";
import { getASingleMeal } from "@/services/mealService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const MealInfo = async ({
  params,
  searchParams,
}: {
  params: Promise<{ mealId: string }>;
  searchParams: SearchParams;
}) => {
  const mealId = await params;
  const query = await searchParams;
  const { data } = await getASingleMeal(mealId?.mealId);
  const { isMealExists, feedbackResult } = data;
  const { data: feedback } = await getAllMealsOfAMeal(mealId?.mealId, query);
  const feedbackInfo = feedback?.result;
  const meta = feedback?.meta;
  return (
    <div className="w-full py-10 lg:px-16 px-5">
      <MealDetails
        mealInfo={isMealExists}
        feedback={feedbackResult}
        feedbackInfo={feedbackInfo}
        meta={meta}
      />
    </div>
  );
};

export default MealInfo;
