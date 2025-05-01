import { TMealFormData } from "@/types/mealType";
import Image from "next/image";
import Link from "next/link";
import InFlow from "./InFlow";
import ListRow from "./ListRow";

const MealDetails = ({ mealInfo }: { mealInfo: TMealFormData }) => {
  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 h-72 md:h-[500px] rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <Image
          src={mealInfo?.imageUrl}
          alt={mealInfo?.title}
          width={800}
          height={600}
          className="w-full h-full object-contain rounded-2xl"
        />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Title & Description */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white leading-tight mb-3">
              {mealInfo?.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {mealInfo?.description}
            </p>
          </div>

          {/* Information Section */}
          <div className="space-y-4">
            {/* Food Details */}
            <div className="space-y-2">
              <InFlow label="Food Category" value={mealInfo?.foodCategory} />
              <InFlow label="Cuisine Type" value={mealInfo?.cuisineType} />
              <InFlow
                label="Food Preference"
                value={mealInfo?.foodPreference}
              />
              <InFlow label="Portion Size" value={mealInfo?.portionSize} />
            </div>

            {/* List Details */}
            <ListRow
              label="Dietary Preferences"
              items={mealInfo?.dietaryPreferences}
            />
            <ListRow
              label="Ingredients"
              items={mealInfo?.ingredients as string[]}
            />
            <ListRow label="Allergies" items={mealInfo?.allergies} />
            <ListRow label="Available Days" items={mealInfo?.availableDays} />
            <ListRow label="Available Time" items={mealInfo?.availableTime} />
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 border-t border-gray-300 dark:border-gray-700 pt-6">
          <div className="space-y-2">
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Price:{" "}
              <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100 px-3 py-1 rounded-full">
                ${mealInfo?.price?.toFixed(2)}
              </span>
            </p>
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Rating:{" "}
              <span className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 px-3 py-1 rounded-full">
                {mealInfo?.rating} ★
              </span>
            </p>
          </div>

          {mealInfo?.isAvailable ? (
            <Link
              href={`/meals/checkout/${mealInfo?._id}`}
              className="inline-block bg-green-600 hover:bg-green-700 text-white text-base font-semibold px-6 py-3 rounded-2xl transition-all"
            >
              Checkout
            </Link>
          ) : (
            <span className="text-sm text-red-500 font-semibold">
              Not Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
