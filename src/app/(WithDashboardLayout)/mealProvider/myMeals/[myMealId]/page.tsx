import MyMealDetails from "@/components/modules/dashboard/mealProvider/myMealDetails/MyMealDetails";
import { getMyMealDetails } from "@/services/mealService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ myMealId: string }>;
}) => {
  const myMealId = await params;
  const { data } = await getMyMealDetails(myMealId?.myMealId);
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
      "A specific meal`s details are properly shown in one page to know everything about the meal. which is controlled by the owner of the meal.",
  };
};
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
