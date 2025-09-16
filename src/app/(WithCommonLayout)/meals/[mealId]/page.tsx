import MealDetails from "@/components/mealDetails/MealDetails";
import { getAllMealsOfAMeal } from "@/services/feedbackService";
import { getASingleMeal } from "@/services/mealService";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) => {
  const mealId = await params;
  const { data } = await getASingleMeal(mealId?.mealId);
  const meal = data?.isMealExists;

  if (!meal) {
    return {
      title: "Meal not found - Daily Dish",
      description: "Sorry, this meal could not be found.",
    };
  }

  return {
    title: `${meal?.title} - Daily Dish`,
    description:
      meal?.description || "Discover this delicious meal on Daily Dish.",
  };
};

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
