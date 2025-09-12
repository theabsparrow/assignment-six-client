import MealComponent from "@/components/mealComponent/MealComponent";
import { getAllMeals } from "@/services/mealService";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
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
