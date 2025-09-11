import Banner from "@/components/home/banner/Banner";
import CuisineSection from "@/components/home/cuisineSection/CuisineSection";
import FaqSection from "@/components/home/FaqSection/FaqSection";
import FoodCategorySection from "@/components/home/foodCategory/FoodCategorySection";
import PreferenceSection from "@/components/home/foodPreference/PreferenceSection";
import HowItWorks from "@/components/home/howItWorks/HowItWorks";
import KitchenSection from "@/components/home/kitchenSection/KitchenSection";
import LatestArticle from "@/components/home/latestArticle/LatestArticle";
import GetMostSearchedMeals from "@/components/home/mostSearchedMeals/GetMostSearchedMeals";
import NewsLetter from "@/components/home/newsLetter/NewsLetter";
import OurMission from "@/components/home/ourMission/OurMission";
import RecentMeals from "@/components/home/RecentMeals.jsx/RecentMeals";
import LoadingBanner from "@/components/loadingComponent/LoadingBanner";
import LoadingCategory from "@/components/loadingComponent/LoadingCategory";
import LoadingCuisine from "@/components/loadingComponent/LoadingCuisine";
import LoadingPreference from "@/components/loadingComponent/LoadingPreference";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <section className="space-y-8 lg:space-y-16">
      <Suspense fallback={<LoadingBanner />}>
        <Banner />
      </Suspense>
      <RecentMeals />
      <Suspense fallback={<LoadingCategory />}>
        <FoodCategorySection />
      </Suspense>
      <Suspense fallback={<LoadingPreference />}>
        <PreferenceSection />
      </Suspense>
      <Suspense fallback={<LoadingCuisine />}>
        <CuisineSection />
      </Suspense>
      <GetMostSearchedMeals />
      <LatestArticle />
      <OurMission />
      <KitchenSection />
      <HowItWorks />
      <FaqSection />
      <NewsLetter />
    </section>
  );
};

export default HomePage;
