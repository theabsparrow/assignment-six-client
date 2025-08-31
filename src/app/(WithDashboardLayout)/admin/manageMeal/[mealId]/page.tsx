import { getAMealProfile } from "@/services/mealService";
import MealProfile from "../../../../../components/modules/dashboard/admin/mealprofile/MealProfile";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
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
