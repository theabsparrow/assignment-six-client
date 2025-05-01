import { TMealFormData } from "@/types/mealType";
import Image from "next/image";
import Link from "next/link";

const BannerMeals = ({ meal }: { meal: TMealFormData }) => {
  return (
    <Link href={`meals/${meal?._id}`}>
      <div className=" shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row items-center p-4 gap-4  md:h-[20vw] hover:scale-110 duration-500">
        <div className="relative ">
          <Image
            src={meal?.imageUrl}
            alt={meal?.title}
            width={300}
            height={30}
            objectFit="contain"
            className="object-cover rounded-xl "
          />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {meal?.title}
          </h2>
          <p className="text-gray-600 mb-2 line-clamp-3">{meal?.description}</p>
          <span className="text-primary font-bold text-lg">
            ${meal?.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BannerMeals;
