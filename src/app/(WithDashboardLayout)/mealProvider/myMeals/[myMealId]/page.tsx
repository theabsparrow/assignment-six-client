import MyMealDetails from "@/components/modules/dashboard/mealProvider/myMealDetails/MyMealDetails";
import { getMyMealDetails } from "@/services/mealService";

const MyMealsDetails = async ({
  params,
}: {
  params: Promise<{ myMealId: string }>;
}) => {
  const { myMealId } = await params;
  const { data } = await getMyMealDetails(myMealId);
  console.log(data);
  return (
    <section className="w-full min-h-screen">
      <MyMealDetails />
    </section>
  );
};

export default MyMealsDetails;
