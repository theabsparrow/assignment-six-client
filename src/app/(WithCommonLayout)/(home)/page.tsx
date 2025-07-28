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
      <FoodCategorySection />
      <PreferenceSection />
      <CuisineSection />
    </section>
  );
};

export default HomePage;
