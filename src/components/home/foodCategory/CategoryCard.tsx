"use client";
import { TCategoryCard } from "@/types/mealType";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import Marquee from "react-fast-marquee";

const CategoryCard = <TId,>({
  data,
  label,
}: {
  data: TCategoryCard<TId>[];
  label: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategory = (category: ReactNode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(label, category!.toString());
    router.push(`/meals?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="hidden md:flex">
        {data?.length > 0 && (
          <Marquee pauseOnHover>
            <div className="flex items-stretch">
              {data.map((category, i) => (
                <div
                  key={i}
                  className="w-full p-6 rounded-2xl border border-primary shadow-sm bg-white dark:bg-gray-900 space-y-4 transition-all hover:shadow-md ml-6 flex flex-col"
                >
                  <div className="space-y-4 flex-grow">
                    <Image
                      src={category?.imageUrl}
                      alt={`${category?.title} image`}
                      width={800}
                      height={800}
                      className="w-full h-[250px] object-cover rounded-xl"
                    />

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
                      {category?.title} ({category?._id as ReactNode})
                    </h2>
                  </div>

                  <div className="flex justify-between items-center ">
                    <Link
                      className="px-4 py-2 text-sm font-medium border border-primary text-primary bg-secondary hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors duration-500"
                      href={`/meals/${category?.id}`}
                    >
                      View This Meal
                    </Link>
                    <button
                      onClick={() => handleCategory(category?._id as ReactNode)}
                      className="px-4 py-2 text-sm font-medium border border-primary text-primary bg-secondary hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors duration-500 cursor-pointer"
                    >
                      See all
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        )}
      </div>
      <div className="md:hidden">
        {data?.length > 0 && (
          <div className="flex flex-col items-center gap-4">
            {data.map((item, i) => (
              <div
                key={i}
                className="w-full p-2 rounded-2xl border border-primary shadow-sm bg-white dark:bg-gray-900 space-y-2 transition-all hover:shadow-md "
              >
                <Image
                  src={item?.imageUrl}
                  alt={`${item?.title} image`}
                  width={800}
                  height={800}
                  className="w-full h-[250px] object-cover rounded-xl"
                />

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
                  {item?.title} ({item?._id as ReactNode} )
                </h2>

                <div className="flex justify-between items-center ">
                  <Link
                    className="px-4 py-2 text-sm font-medium border border-primary text-primary bg-secondary hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors duration-500"
                    href={`/meals/${item?.id}`}
                  >
                    View This Meal
                  </Link>
                  <button
                    onClick={() => handleCategory(item?._id as ReactNode)}
                    className="px-4 py-2 text-sm font-medium border border-primary text-primary bg-secondary hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors duration-500 cursor-pointer"
                  >
                    See all
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryCard;
