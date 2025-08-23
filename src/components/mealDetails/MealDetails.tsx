import { USER_ROLE } from "@/constant";
import { getCurrentUser } from "@/services/authService";
import { TMealProfile } from "@/types/mealType";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSoupKitchen } from "react-icons/md";

const MealDetails = async ({ mealInfo }: { mealInfo: TMealProfile }) => {
  const user = (await getCurrentUser()) || null;

  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden max-w-4xl mx-auto px-4 py-4 space-y-4 md:space-y-10">
      <div>
        <Image
          src={mealInfo?.imageUrl}
          alt="meal-photo"
          width={900}
          height={900}
          className=" border-4 border-white w-full md:h-[70vh] shadow-xl rounded-xl"
        />
      </div>

      {/* Content Section */}
      <div className=" space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {mealInfo?.title}{" "}
            <span className="text-xl">({mealInfo?.foodPreference})</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            {mealInfo?.description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Category</h1>
            <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
              {mealInfo?.foodCategory}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Cuisine</h1>
            <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
              {mealInfo?.cuisineType}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Portion Size</h1>
            <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
              {mealInfo?.portionSize}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Kitchen</h1>
            <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
              {mealInfo?.kitchen?.kitchenName}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Availablity</h1>
            <span
              className={`${
                mealInfo?.isAvailable
                  ? "bg-primary border border-seconday text-secondary"
                  : "bg-red-300 border border-red-500 text-red-600"
              }  px-2 py-1 rounded-full `}
            >
              {mealInfo?.isAvailable ? "Available" : "Not available"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-0 md:gap-10 justify-between md:justify-start">
          <Link
            href={`/kitchen/${mealInfo?.kitchen?._id}`}
            className="bg-secondary text-primary px-2 py-1 rounded-xl hover:bg-primary hover:text-white cursor-pointer border border-primary duration-500 flex items-center gap-1"
          >
            <MdOutlineSoupKitchen /> Kitchen Profile
          </Link>
        </div>

        <div className="space-y-4">
          {mealInfo?.dietaryPreferences && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Dietary Preference:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(mealInfo?.dietaryPreferences).map((diatery, i) => (
                  <li
                    key={i}
                    className="bg-primary text-secondary px-2 py-1 rounded-xl"
                  >
                    {diatery}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {mealInfo?.ingredients && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Ingredients:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(mealInfo?.ingredients).map((ingredient, i) => (
                  <li
                    key={i}
                    className="bg-primary text-secondary px-2 py-1 rounded-xl"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {mealInfo?.allergies && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Allergies:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(mealInfo?.allergies).map((allergy, i) => (
                  <li
                    key={i}
                    className="bg-primary text-secondary px-2 py-1 rounded-xl"
                  >
                    {allergy}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {mealInfo?.availableDays && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Available Day:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(mealInfo?.availableDays).map((availableday, i) => (
                  <li
                    key={i}
                    className="bg-primary text-secondary px-2 py-1 rounded-xl"
                  >
                    {availableday}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {mealInfo?.availableTime && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Available Time:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(mealInfo?.availableTime).map((time, i) => (
                  <li
                    key={i}
                    className="bg-primary text-secondary px-2 py-1 rounded-xl"
                  >
                    {time}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-start justify-between border-t border-gray-300 dark:border-gray-700 py-4">
          <div className="space-y-2">
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Price:{" "}
              <span className="bg-indigo-100 text-primary dark:bg-indigo-700 dark:text-secondary  px-3 py-1 rounded-full">
                ৳{mealInfo?.price ? mealInfo.price.toFixed(2) : "0.00"}
              </span>
            </p>

            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Rating:{" "}
              {mealInfo?.ratingCount && mealInfo.ratingCount > 0 ? (
                <span className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 px-3 py-1 rounded-full">
                  {mealInfo?.avarageRating?.toFixed(1)} ★ (
                  {mealInfo.ratingCount}{" "}
                  {mealInfo.ratingCount === 1
                    ? "person has rated"
                    : "people have rated"}
                  )
                </span>
              ) : (
                <span className="italic text-gray-500">No ratings yet</span>
              )}
            </p>
          </div>
          {user &&
            user?.userRole === USER_ROLE.customer &&
            mealInfo?.isAvailable && (
              <Link
                href={`/meals/checkout/${mealInfo?._id}`}
                className="bg-secondary text-primary border border-primary hover:bg-primary hover:text-white px-2 py-1 rounded-lg duration-500"
              >
                Checkout
              </Link>
            )}
        </div>
      </div>
    </section>
  );
};

export default MealDetails;
