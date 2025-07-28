"use client";
import { cuisineTypePhoto } from "@/constant/cuisineType.const";
import { TcuisineType } from "@/types/mealType";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Marquee from "react-fast-marquee";

const CuisineCard = ({ data }: { data: TcuisineType[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCuisine = (cuisine: TcuisineType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cuisineType", cuisine.toString());
    router.push(`/meals?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {
        <div className="flex gap-4 items-center">
          <Marquee className="overflow-hidden" pauseOnHover>
            {data.map((cuisine: TcuisineType) => (
              <div
                key={cuisine}
                className="min-w-[75vw] sm:min-w-[60vw] md:min-w-[45vw] lg:min-w-[22vw] p-4 sm:p-6 mx-2 rounded-2xl border border-primary shadow-sm bg-white dark:bg-gray-900 space-y-4 transition-all hover:shadow-md"
              >
                <Image
                  src={cuisineTypePhoto[cuisine]}
                  alt={`${cuisine} image`}
                  width={800}
                  height={800}
                  className="w-full h-[200px] sm:h-[240px] object-cover rounded-xl"
                />

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white text-center">
                  {cuisine} Meals
                </h2>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleCuisine(cuisine)}
                    className="px-3 py-2 text-sm font-medium border border-primary text-primary bg-secondary hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 cursor-pointer"
                  >
                    See all
                  </button>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      }
    </>
  );
};

export default CuisineCard;
