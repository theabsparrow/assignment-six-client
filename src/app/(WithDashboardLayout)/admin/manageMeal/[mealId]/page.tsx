import { getAMealProfile } from "@/services/mealService";
import MealProfile from "../../../../../components/modules/dashboard/admin/mealprofile/MealProfile";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) => {
  const mealId = await params;
  const { data } = await getAMealProfile(mealId?.mealId);
  const result = data?.isMealExists;
  if (!result) {
    return {
      title: "meal not found - Daily Dish",
      description: "Sorry, this blog could not be found.",
    };
  }
  return {
    title: `${result?.title} - Daily Dish`,
    description:
      "A specific meal`s details are properly shown in one page to know everything about the meal. which is controlled by the admin.",
  };
};
const MealProfilePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ mealId: string }>;
  searchParams: SearchParams;
}) => {
  const { mealId } = await params;
  const query = await searchParams;
  const { data } = await getAMealProfile(mealId, query);
  const { isMealExists, feedbackResult, meta } = data;
  return (
    <section className=" w-full">
      <MealProfile data={isMealExists} feedback={feedbackResult} meta={meta} />
    </section>
  );
};

export default MealProfilePage;
