import Banner from "@/components/home/banner/Banner";
import RecentMeals from "@/components/home/RecentMeals.jsx/RecentMeals";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="space-y-10">
      <Suspense fallback={<div>Loading banner...</div>}>
        <Banner />
      </Suspense>
      <RecentMeals />
    </div>
  );
};

export default HomePage;
