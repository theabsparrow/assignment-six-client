import { getCuisineType } from "@/services/mealService";
import CategoryCard from "../foodCategory/CategoryCard";
import { TCategoryCard, TcuisineType } from "@/types/mealType";

const CuisineSection = async () => {
  const { data } = await getCuisineType();
  console.log(data);
  return (
    <section className="md:px-24 px-5 mb-20 space-y-8">
      <div className="max-w-4xl mx-auto text-center space-y-4 px-2 md:px-6">
        <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Discover Global Flavors
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          Discover flavorful meals from different culinary traditions. Select
          your preferred cuisine and explore the tastes you love.
        </p>
      </div>
      <div
        className="h-[20vw] md:h-[25vh] w-full  bg-cover bg-[center_70%] bg-no-repeat shadow-md"
        style={{ backgroundImage: `url('/cuisine-type.webp')` }}
      />
      <CategoryCard
        data={data as TCategoryCard<TcuisineType>[]}
        label="cuisineType"
      />
    </section>
  );
};

export default CuisineSection;
