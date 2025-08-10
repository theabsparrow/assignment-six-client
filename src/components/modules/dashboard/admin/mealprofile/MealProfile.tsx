"use client";
import { TMealProfile } from "@/types/mealType";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineSoupKitchen } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import DeletionModal from "@/components/statusDropdown/DeletionModal";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { deleteMeal } from "@/services/mealService";

const MealProfile = ({ data }: { data: TMealProfile }) => {
  const date = new Date(data?.createdAt);
  const creationDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const creationTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleDelete = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    setLoading(true);
    if (!data?._id) {
      toast.error("falid to remove this meal", { duration: 3000 });
      setLoading(false);
      return;
    }
    const toastId = toast.loading("Removing meal...");
    try {
      const result = await deleteMeal(data?._id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setOpen(false);
        setLoading(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
    setLoading(true);
  };

  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden max-w-4xl mx-auto px-4 py-4 space-y-4 md:space-y-10">
      <div>
        <Image
          src={data?.imageUrl}
          alt="meal-photo"
          width={900}
          height={900}
          className=" border-4 border-white w-full h-[70vh] shadow-xl rounded-xl"
        />
      </div>

      {/* Content Section */}
      <div className=" space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {data?.title}{" "}
            <span className="text-xl">({data?.foodPreference})</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            {data?.description}
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Category</h1>
            <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
              {data?.foodCategory}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Cuisine</h1>
            <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
              {data?.cuisineType}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Portion Size</h1>
            <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
              {data?.portionSize}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Creation</h1>
            <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
              {creationDate}, {creationTime}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Kitchen</h1>
            <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
              {data?.kitchen?.kitchenName}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-semibold"> Availablity</h1>
            <span
              className={`${
                data?.isAvailable
                  ? "bg-primary border border-seconday text-secondary"
                  : "bg-red-300 border border-red-500 text-red-600"
              }  px-2 py-1 rounded-full `}
            >
              {data?.isAvailable ? "Available" : "Not available"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-0 md:gap-10 justify-between md:justify-start">
          <Link
            href={`/admin/manageKitchen/${data?.kitchen?._id}`}
            className="bg-secondary text-primary px-2 py-1 rounded-xl hover:bg-primary hover:text-white cursor-pointer border border-primary duration-500 flex items-center gap-1"
          >
            <MdOutlineSoupKitchen /> Kitchen Profile
          </Link>
          <Link
            href={`/admin/manageUsers/${data?.owner?._id}`}
            className="bg-secondary text-primary px-2 py-1 rounded-xl hover:bg-primary hover:text-white cursor-pointer border border-primary duration-500 flex items-center gap-1"
          >
            <CgProfile /> Owner Profile
          </Link>
        </div>

        <div className="space-y-4">
          {data?.dietaryPreferences && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Dietary Preference:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(data?.dietaryPreferences).map((diatery, i) => (
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
          {data?.ingredients && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Ingredients:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(data?.ingredients).map((ingredient, i) => (
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
          {data?.allergies && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Allergies:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(data?.allergies).map((allergy, i) => (
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
          {data?.availableDays && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Available Day:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(data?.availableDays).map((availableday, i) => (
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
          {data?.availableTime && (
            <div className="space-y-2">
              <h1 className="font-semibold text-xl">Available Time:</h1>
              <ul className="flex flex-wrap gap-2 ">
                {(data?.availableTime).map((time, i) => (
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 border-t border-gray-300 dark:border-gray-700 pt-6">
          <div className="space-y-2">
            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Price:{" "}
              <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100 px-3 py-1 rounded-full">
                ৳{data?.price ? data.price.toFixed(2) : "0.00"}
              </span>
            </p>

            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Rating:{" "}
              {data?.ratingCount && data.ratingCount > 0 ? (
                <span className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 px-3 py-1 rounded-full">
                  {data?.avarageRating?.toFixed(1)} ★ ({data?.ratingCount}{" "}
                  ratings)
                </span>
              ) : (
                <span className="italic text-gray-500">No ratings yet</span>
              )}
            </p>
          </div>
        </div>
      </div>
      <DeletionModal
        name={data?.title}
        collection="Meals"
        handleDelete={handleDelete}
      />
    </section>
  );
};

export default MealProfile;
