import { getAllMeals } from "@/services/mealService";
import { TMealFormData } from "@/types/mealType";
import BannerMeals from "./BannerMeals";
import BannerButton from "./BannerButton";

const Banner = async () => {
  const res = await getAllMeals(undefined);
  const bannerMeals = (res?.data?.result).slice(0, 2);

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 py-20 px-6 text-white relative overflow-hidden rounded-2xl shadow-lg md:h-[672px] md:px-16 ">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-6xl px-4">
        {bannerMeals.map((meal: TMealFormData) => (
          <BannerMeals key={meal?._id} meal={meal} />
        ))}
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full "
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff33"
          d="M0,128L30,160C60,192,120,256,180,256C240,256,300,192,360,176C420,160,480,192,540,186.7C600,181,660,139,720,117.3C780,96,840,96,900,122.7C960,149,1020,203,1080,208C1140,213,1200,171,1260,160C1320,149,1380,171,1410,181.3L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        />
      </svg>
      <div className=" mt-[350px] relative z-10">
        <BannerButton />
      </div>
    </div>
  );
};

export default Banner;
