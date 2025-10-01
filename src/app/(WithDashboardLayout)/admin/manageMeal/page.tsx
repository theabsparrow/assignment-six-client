import GetAllMeals from "@/components/modules/dashboard/admin/manageMeals/GetAllMeals";
import { getAllMealList } from "@/services/mealService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "Meals - Daily Dish",
  description:
    "All the meals are shown together in one field. And admin can monitor all the mmeals and take controll on that meals",
};
const ManageMealPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getAllMealList(query);
  const { meta, result, totalMeal, maxPrice, minPrice } = data || {};

  return (
    <section className=" w-full">
      <GetAllMeals
        meta={meta}
        result={result}
        total={totalMeal}
        maxPrice={maxPrice}
        minPrice={minPrice}
      />
    </section>
  );
};

export default ManageMealPage;
