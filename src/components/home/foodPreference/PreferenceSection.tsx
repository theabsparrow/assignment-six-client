import { getFoodPreference } from "@/services/mealService";
import CategoryCard from "../foodCategory/CategoryCard";
import { TCategoryCard, TFoodPreference } from "@/types/mealType";
import LoadingCategory from "@/components/loadingComponent/LoadingCategory";

const PreferenceSection = async () => {
  const preference = (await getFoodPreference()) || [];
  const data = preference?.data || [];
  return (
    <section className="w-full lg:px-16 px-4 space-y-6">
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
      {data?.length > 0 ? (
        <div>
          <CategoryCard
            data={data as TCategoryCard<TFoodPreference>[]}
            label="foodPreference"
          />
        </div>
      ) : (
        <LoadingCategory />
      )}
    </section>
  );
};

export default PreferenceSection;
