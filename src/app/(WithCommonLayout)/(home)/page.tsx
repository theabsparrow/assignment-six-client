import Banner from "@/components/home/banner/Banner";
import RecentMeals from "@/components/home/RecentMeals.jsx/RecentMeals";

const HomePage = () => {
  return (
    <div className="space-y-10">
      <Banner />
      <RecentMeals />
    </div>
  );
};

export default HomePage;
