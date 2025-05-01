import MyMealsComponent from "@/components/modules/dashboard/myMeals/MyMealsComponent";
import { getMyMeals } from "@/services/mealService";

const MyMeals = async () => {
  const { data } = await getMyMeals();
  const { meta, result } = data;
  console.log(result);
  return (
    <div className="min-h-screen mx-auto">
      <MyMealsComponent meta={meta} result={result} />
    </div>
  );
};

export default MyMeals;
