import MealComponent from "@/components/mealComponent/MealComponent";
import { getAllMeals } from "@/services/mealService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Meals - Daily Dish",
  description:
    "Explore a wide variety of freshly prepared meals on Daily Dish. Browse categories, cuisines, and find your favorite dishes.",
};
const Meal = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getAllMeals(query);
  const { result, meta, totalMeal, maxPrice, minPrice } = data || {};

  return (
    <div className="lg:px-16 px-5">
      <MealComponent
        MealInfo={result}
        meta={meta}
        total={totalMeal}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </div>
  );
};

export default Meal;
