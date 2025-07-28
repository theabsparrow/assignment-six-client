import { getFoodCategory } from "@/services/mealService";
import CategoryCard from "./CategoryCard";
import { TFoodCategory } from "@/types/mealType";

const FoodCategorySection = async () => {
  const { data } = await getFoodCategory();

  return (
    <section className="md:px-24 px-5 mb-20 space-y-8">
      <div className="max-w-4xl mx-auto text-center space-y-4  px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Discover Your Food Mood
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          From hearty dinners to light snacks, browse meals by category and
          discover something delicious for every time of day.
        </p>
      </div>

      <div
        className="h-[20vw] md:h-[25vh] w-full  bg-cover bg-center shadow-md"
        style={{ backgroundImage: `url('/food-category.webp')` }}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-between items-center">
        {data.map((category: TFoodCategory) => (
          <CategoryCard key={category} category={category} />
        ))}
      </div>
    </section>
  );
};

export default FoodCategorySection;
