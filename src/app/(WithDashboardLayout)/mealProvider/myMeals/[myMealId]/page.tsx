import MyMealDetails from "@/components/modules/dashboard/mealProvider/myMealDetails/MyMealDetails";
import { getMyMealDetails } from "@/services/mealService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const MyMealsDetails = async ({
  params,
  searchParams,
}: {
  params: Promise<{ myMealId: string }>;
  searchParams: SearchParams;
}) => {
  const { myMealId } = await params;
  const query = await searchParams;
  const { data } = await getMyMealDetails(myMealId, query);
  const { isMealExists, feedbackResult, meta } = data;

  return (
    <section className=" min-h-screen mx-auto md:w-[70vw]">
      <MyMealDetails
        data={isMealExists}
        feedback={feedbackResult}
        meta={meta}
      />
    </section>
  );
};

export default MyMealsDetails;
