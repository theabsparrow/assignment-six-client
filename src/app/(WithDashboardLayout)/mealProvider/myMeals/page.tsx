import MyMealsComponent from "@/components/modules/dashboard/mealProvider/myMeals/MyMealsComponent";
import { getMyMeals } from "@/services/mealService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const MyMeals = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getMyMeals(query);
  const meta = data?.meta;
  const result = data?.result;

  return (
    <div className=" w-full">
      <MyMealsComponent meta={meta} result={result} />
    </div>
  );
};

export default MyMeals;
