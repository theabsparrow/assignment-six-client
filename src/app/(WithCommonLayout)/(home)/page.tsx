import Banner from "@/components/home/banner/Banner";
import CuisineSection from "@/components/home/cuisineSection/CuisineSection";
import FoodCategorySection from "@/components/home/foodCategory/FoodCategorySection";
import PreferenceSection from "@/components/home/foodPreference/PreferenceSection";
import OurMission from "@/components/home/ourMission/OurMission";
import RecentMeals from "@/components/home/RecentMeals.jsx/RecentMeals";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <section className="space-y-16">
      <Suspense fallback={<div>Loading banner...</div>}>
        <Banner />
      </Suspense>
      <RecentMeals />
      <OurMission />
      <Suspense fallback={<div>Loading categories...</div>}>
        <FoodCategorySection />
      </Suspense>

      <Suspense fallback={<div>Loading preferences...</div>}>
        <PreferenceSection />
      </Suspense>

      <Suspense fallback={<div>Loading cuisines...</div>}>
        <CuisineSection />
      </Suspense>
    </section>
  );
};

export default HomePage;
