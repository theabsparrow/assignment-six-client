"use client";

import {
  FoodPreferenceOption,
  TCookingDay,
  TcuisineType,
  TDietaryPreference,
  TFoodCategory,
  TMealTime,
  TMyMealDetails,
  TPortionSize,
  TUpdatemealData,
} from "@/types/mealType";
import ImageUploadmeal from "./ImageUploadmeal";
import { Dispatch, SetStateAction, useState } from "react";
import EditComponent from "@/components/modules/editComponent/EditComponent";
import { toast } from "sonner";
import {
  cuisineType,
  diateryPreference,
  foodCategory,
  portionSize,
} from "../createMeal/createMeal.const";
import {
  foodPreferance,
  mealTime,
  weekDays,
} from "../kitchenProfile/kitchen.const";
import StatusDropdown from "@/components/statusDropdown/StatusDropdown";
import { TStatus } from "@/types/subscriber.types";
import { deleteMeal, updateMeal } from "@/services/mealService";
import EditArray from "@/components/modules/editArrayComponent/EditArray";
import { TAlergies } from "@/types/customerRegistration";
import { allergyOptions } from "@/components/modules/auth/register/register.const";
import EditInputArray from "@/components/modules/editArrayComponent/EditInputArray";
import DeletionModal from "@/components/statusDropdown/DeletionModal";
import { TbCurrencyTaka } from "react-icons/tb";

const MyMealDetails = ({ data }: { data: TMyMealDetails }) => {
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
  const status = data?.isAvailable ? "active" : "blocked";
  const id = data?._id;

  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [title, setTitle] = useState(data?.title ?? "");
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [description, setDescription] = useState(data?.description ?? "");
  const [isCategoryEditing, setIsCategoryEditing] = useState(false);
  const [categoryOption, setCategoryOption] = useState(
    data?.foodCategory ?? ""
  );
  const [isEditingPreference, setIsEditingPreference] = useState(false);
  const [preferenceOption, setPreferenceOption] = useState(
    data?.foodPreference ?? ""
  );
  const [isCuisingEditing, setIsCuisingEditing] = useState(false);
  const [cuisineOptions, setCuisineOptions] = useState(data?.cuisineType ?? "");
  const [isSizeEditing, setIsSizeEditing] = useState(false);
  const [sizeOptions, setSizeOptions] = useState(data?.portionSize ?? "");
  const [isPriceEditing, setIsPriceEditing] = useState(false);
  const [price, setPrice] = useState<string>((data?.price).toString() ?? "");

  const handleSubmit = async (
    field: string,
    addOptions: string[] | [],
    removeOptions: string[]
  ) => {
    const updatedData: Partial<TUpdatemealData> = {};
    if (field === "title") {
      const trimedValue = title.trim();
      if (trimedValue === data?.title) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.title = trimedValue;
        setIsTitleEditing(false);
      }
    }
    if (field === "description") {
      const trimedValue = description.trim();
      if (trimedValue === data?.description) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.description = trimedValue;
        setIsDescriptionEditing(false);
      }
    }
    if (field === "price") {
      const trimedValue = Number(Number(price.trim()).toFixed(2));
      if (trimedValue === data?.price) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.price = trimedValue;
        setIsPriceEditing(false);
      }
    }
    if (field === "foodCategory") {
      if (categoryOption === data?.foodCategory) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.foodCategory = categoryOption;
        setIsCategoryEditing(false);
      }
    }
    if (field === "foodPreferance") {
      if (preferenceOption === data?.foodPreference) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.foodPreference = preferenceOption;
        setIsEditingPreference(false);
      }
    }
    if (field === "cuisineType") {
      if (cuisineOptions === data?.cuisineType) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.cuisineType = cuisineOptions;
        setIsEditingPreference(false);
      }
    }
    if (field === "portionSize") {
      if (sizeOptions === data?.portionSize) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.portionSize = sizeOptions;
        setIsSizeEditing(false);
      }
    }

    if (field === "Available Days") {
      if (addOptions?.length > 0) {
        updatedData.addAvailableDays = addOptions as TCookingDay[];
      }
      if (removeOptions.length > 0) {
        updatedData.removeAvailableDays = removeOptions as TCookingDay[];
      }
    }
    if (field === "Meal Time") {
      if (addOptions?.length > 0) {
        updatedData.addAvailableTime = addOptions as TMealTime[];
      }
      if (removeOptions.length > 0) {
        updatedData.removeAvailableTime = removeOptions as TMealTime[];
      }
    }
    if (field === "Allergies") {
      if (addOptions?.length > 0) {
        updatedData.addAllergies = addOptions as TAlergies[];
      }
      if (removeOptions.length > 0) {
        updatedData.removeAllergies = removeOptions as TAlergies[];
      }
    }
    if (field === "Diatery Preference") {
      if (addOptions?.length > 0) {
        updatedData.addDietaryPreferences = addOptions as TDietaryPreference[];
      }
      if (removeOptions.length > 0) {
        updatedData.removeDietaryPreferences =
          removeOptions as TDietaryPreference[];
      }
    }
    if (field === "Ingredients") {
      if (addOptions?.length > 0) {
        updatedData.addIngredients = addOptions as string[];
      }
      if (removeOptions.length > 0) {
        updatedData.removeIngredients = removeOptions as string[];
      }
    }
    const toastId = toast.loading("updating meal info...");
    try {
      const result = await updateMeal(updatedData, id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleChange = async (
    option: TStatus,
    setDropdownOpen: Dispatch<SetStateAction<boolean>>
  ) => {
    if (!option) {
      toast.error("falid to update status", { duration: 3000 });
      return;
    }
    if (status === option) {
      toast.error(`status is already ${status}`, { duration: 3000 });
      return;
    }
    const value = option === "active";
    const updatedData: Partial<TUpdatemealData> = {
      isAvailable: value,
    };
    const toastId = toast.loading("updating status...");
    try {
      const result = await updateMeal(updatedData, id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setDropdownOpen(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

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
    <section className="space-y-10 w-full bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900 dark:to-blue-900 px-4 md:px-16 py-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-36 rounded-xl w-full">
        <ImageUploadmeal image={data?.imageUrl} id={data?._id} />
        <div className="text-left space-y-4 w-full">
          <div>
            {isTitleEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  const value = e.target.value;
                  setTitle(value);
                }}
                className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            ) : (
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                {data?.title}{" "}
              </h2>
            )}
            <EditComponent
              setValue={setTitle}
              isEditing={isTitleEditing}
              setIsEditing={setIsTitleEditing}
              value={data?.title as string}
              handleSubmit={handleSubmit}
              field="title"
            />
          </div>
          <div>
            {isDescriptionEditing ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-2 py-1 border rounded-md w-66 h-24 resize-none outline-none"
              />
            ) : (
              <p className="text-lg font-light text-gray-500 italic mt-2">
                {data?.description || "No description provided."}
              </p>
            )}
            <EditComponent
              setValue={setDescription}
              isEditing={isDescriptionEditing}
              setIsEditing={setIsDescriptionEditing}
              value={data?.description as string}
              handleSubmit={handleSubmit}
              field="description"
            />
          </div>
          <div className="flex justify-between">
            <div>
              {isCategoryEditing ? (
                <select
                  value={categoryOption}
                  onChange={(e) =>
                    setCategoryOption(e.target.value as TFoodCategory)
                  }
                  className=" px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
                >
                  {foodCategory.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex">
                  <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary flex">
                    {data?.foodCategory}
                  </span>
                </div>
              )}
              <EditComponent
                setValue={setCategoryOption}
                isEditing={isCategoryEditing}
                setIsEditing={setIsCategoryEditing}
                value={data?.foodCategory as TFoodCategory}
                handleSubmit={handleSubmit}
                field="foodCategory"
              />
            </div>
            <div>
              {isEditingPreference ? (
                <select
                  value={preferenceOption}
                  onChange={(e) =>
                    setPreferenceOption(e.target.value as FoodPreferenceOption)
                  }
                  className=" px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
                >
                  {foodPreferance.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex">
                  <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary flex">
                    {data?.foodPreference}
                  </span>
                </div>
              )}
              <EditComponent
                setValue={setPreferenceOption}
                isEditing={isEditingPreference}
                setIsEditing={setIsEditingPreference}
                value={data?.foodPreference as FoodPreferenceOption}
                handleSubmit={handleSubmit}
                field="foodPreferance"
              />
            </div>
            <div>
              {isCuisingEditing ? (
                <select
                  value={cuisineOptions}
                  onChange={(e) =>
                    setCuisineOptions(e.target.value as TcuisineType)
                  }
                  className=" px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
                >
                  {cuisineType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex">
                  <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary flex">
                    {data?.cuisineType}
                  </span>
                </div>
              )}
              <EditComponent
                setValue={setCuisineOptions}
                isEditing={isCuisingEditing}
                setIsEditing={setIsCuisingEditing}
                value={data?.cuisineType as TcuisineType}
                handleSubmit={handleSubmit}
                field="cuisineType"
              />
            </div>
            <div>
              {isSizeEditing ? (
                <select
                  value={sizeOptions}
                  onChange={(e) =>
                    setSizeOptions(e.target.value as TPortionSize)
                  }
                  className=" px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
                >
                  {portionSize.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex">
                  <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary flex">
                    {data?.portionSize}
                  </span>
                </div>
              )}
              <EditComponent
                setValue={setSizeOptions}
                isEditing={isSizeEditing}
                setIsEditing={setIsSizeEditing}
                value={data?.portionSize as TPortionSize}
                handleSubmit={handleSubmit}
                field="portionSize"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
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
            <div className="space-y-1">
              <h1 className="text-lg font-semibold"> Creation</h1>
              <span className="bg-primary border border-seconday px-2 py-1 rounded-full text-secondary">
                {creationDate}, {creationTime}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {isPriceEditing ? (
                <input
                  type="text"
                  value={price}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPrice(value);
                  }}
                  className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                />
              ) : (
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <span>Price:</span>
                  <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <TbCurrencyTaka />{" "}
                    {data?.price ? data.price.toFixed(2) : "0.00"}
                  </span>
                </p>
              )}
              <EditComponent
                setValue={setPrice}
                isEditing={isPriceEditing}
                setIsEditing={setIsPriceEditing}
                value={(data?.price).toString()}
                handleSubmit={handleSubmit}
                field="price"
              />
            </div>
            <StatusDropdown
              status={status as TStatus}
              options={["active", "blocked"]}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className=" border-t border-primary pt-6 grid grid-cols-1 md:grid-cols-3 space-x-10 justify-between space-y-10 w-full">
        {data?.availableDays.length && (
          <EditArray
            value={data?.availableDays as TCookingDay[]}
            valueOptions={weekDays}
            handleSubmit={handleSubmit}
            label="Available Days"
            styleClass="bg-secondary text-primary px-3 py-1 rounded-full "
            style="flex flex-col justify-start items-start"
          />
        )}
        {data?.availableTime.length && (
          <EditArray
            value={data?.availableTime as TMealTime[]}
            valueOptions={mealTime}
            handleSubmit={handleSubmit}
            label="Meal Time"
            styleClass="bg-secondary text-primary px-3 py-1 rounded-full "
            style="flex flex-col justify-start items-start"
          />
        )}
        {data?.allergies.length && (
          <EditArray
            value={data?.allergies as TAlergies[]}
            valueOptions={allergyOptions}
            handleSubmit={handleSubmit}
            label="Allergies"
            styleClass="bg-secondary text-primary px-3 py-1 rounded-full "
            style="flex flex-col justify-start items-start"
          />
        )}

        {data?.availableTime.length && (
          <EditArray
            value={data?.dietaryPreferences as TDietaryPreference[]}
            valueOptions={diateryPreference}
            handleSubmit={handleSubmit}
            label="Diatery Preference"
            styleClass="bg-secondary text-primary px-3 py-1 rounded-full "
            style="flex flex-col justify-start items-start"
          />
        )}
        {data?.ingredients.length && (
          <EditInputArray
            value={data?.ingredients as string[]}
            handleSubmit={handleSubmit}
            label="Ingredients"
          />
        )}
      </div>
      <DeletionModal
        name={data?.title}
        collection="Meals"
        handleDelete={handleDelete}
        title="Meal Deletion"
        buttonName="Delete meal"
      />
    </section>
  );
};

export default MyMealDetails;
