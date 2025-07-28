import Banner from "@/components/home/banner/Banner";
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
    </section>
  );
};

export default HomePage;
