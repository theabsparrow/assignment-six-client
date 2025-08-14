import MyMealDetails from "@/components/modules/dashboard/mealProvider/myMealDetails/MyMealDetails";
import { getMyMealDetails } from "@/services/mealService";

const MyMealsDetails = async ({
  params,
}: {
  params: Promise<{ myMealId: string }>;
}) => {
  const { myMealId } = await params;
  const { data } = await getMyMealDetails(myMealId);

  return (
    <section className=" min-h-screen mx-auto md:w-[70vw]">
      <MyMealDetails data={data} />
    </section>
  );
};

export default MyMealsDetails;
