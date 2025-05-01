import { getAllMeals } from "@/services/mealService";
import RecendMealCard from "./RecendMealCard";
import { TMealFormData } from "@/types/mealType";

const RecentMeals = async () => {
  const { data } = await getAllMeals(undefined);

  const mealItems = data.result.slice(0.6);
  return (
    <div className="w-full md:px-16 px-5 py-10 ">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold ">Recent Meals</h2>
          <p className="text-lg  font-medium max-w-2xl mx-auto">
            Discover our freshly made meals crafted with care and passion by
            local chefs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mealItems.map((item: TMealFormData) => (
            <RecendMealCard key={item?._id} meal={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentMeals;
