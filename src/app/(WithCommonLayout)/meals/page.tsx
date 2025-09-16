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
  const MealInfo = data?.result;
  const meta = data?.meta;
  return (
    <div className="lg:px-16 px-5">
      <MealComponent MealInfo={MealInfo} meta={meta} />
    </div>
  );
};

export default Meal;
