import { getFoodPreference } from "@/services/mealService";
import CategoryCard from "../foodCategory/CategoryCard";
import { TCategoryCard, TFoodPreference } from "@/types/mealType";

const PreferenceSection = async () => {
  const { data } = await getFoodPreference();
  return (
    <section className="md:px-24 px-5 mb-20 space-y-8">
      <div className="max-w-4xl mx-auto text-center space-y-4 px-2 md:px-6">
        <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Choose Your Food Preference
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          Explore meals tailored to your lifestyle — whether you prefer
          vegetarian, non-vegetarian, or a mix of both. Find the dishes that
          match your taste.
        </p>
      </div>
      <div
        className="h-[20vw] md:h-[25vh] w-full  bg-cover bg-[center_70%] bg-no-repeat shadow-md"
        style={{ backgroundImage: `url('/food-preference.webp')` }}
      />
      <CategoryCard
        data={data as TCategoryCard<TFoodPreference>[]}
        label="foodPreference"
      />
    </section>
  );
};

export default PreferenceSection;
