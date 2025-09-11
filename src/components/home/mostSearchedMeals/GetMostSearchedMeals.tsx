import MealCard from "@/components/mealCard/MealCard";
import { getMostSearchedmeals } from "@/services/mealService";
import { TMealFormData } from "@/types/mealType";

const GetMostSearchedMeals = async () => {
  const { data } = await getMostSearchedmeals();

  return (
    <section className="w-full lg:px-16 px-4 space-y-6">
      <div className="max-w-4xl mx-auto text-center space-y-4 px-2 md:px-6">
        <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Most Searched Meals
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          Explore the dishes that are trending among our food lovers. These
          meals have captured the attention and taste buds of users across our
          platform
        </p>
      </div>

      {data ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {data.map((item: TMealFormData) => (
            <MealCard key={item?._id} meal={item} />
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary dark:text-secondary">
            No data available right now
          </h2>
        </div>
      )}
    </section>
  );
};

export default GetMostSearchedMeals;
