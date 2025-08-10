import { getAMealProfile } from "@/services/mealService";
import MealProfile from "../../../../../components/modules/dashboard/admin/mealprofile/MealProfile";

const MealProfilePage = async ({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) => {
  const { mealId } = await params;
  const { data } = await getAMealProfile(mealId);

  return (
    <section className=" w-full">
      <MealProfile data={data} />
    </section>
  );
};

export default MealProfilePage;
