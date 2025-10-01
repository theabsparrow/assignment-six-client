import MyMealsComponent from "@/components/modules/dashboard/mealProvider/myMeals/MyMealsComponent";
import { getMyMeals } from "@/services/mealService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "My Meals - Daily Dish",
  description:
    "All the meals by a specific are shown together in one field. the owner of that meals can monitor all the mmeals and take controll on that meals",
};
const MyMeals = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getMyMeals(query);
  const { meta, result, totalMeal, minPrice, maxPrice } = data || {};

  return (
    <div className=" w-full">
      <MyMealsComponent
        meta={meta}
        result={result}
        total={totalMeal}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
};

export default MyMeals;
