"use client";

import InputCheckboxArray from "@/components/modules/formInput/InputCheckboxArray";
import InputTextArea from "@/components/modules/formInput/InputTextArea";
import InputType from "@/components/modules/formInput/InputType";
import { TMealFormData } from "@/types/mealType";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  cuisineType,
  diateryPreference,
  foodCategory,
  portionSize,
} from "./createMeal.const";
import InputSelect from "@/components/modules/formInput/InputSelect";
import {
  foodPreferance,
  mealTime,
  weekDays,
} from "../../kitchen/kitchen.const";
import { allergyOptions } from "@/components/modules/auth/register/register.const";
import ImagePreviewer from "@/components/modules/imageUploader/ImagePreviewer";
import ImageUploader from "@/components/modules/imageUploader/ImageUploader";
import { imageUpload } from "@/utills/imageUploader";
import { toast } from "sonner";
import { createMeal } from "@/services/mealService";
import Link from "next/link";

const CreateMeal = ({ hasKitchen }: { hasKitchen: boolean }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TMealFormData>();
  const [imageFile, setImageFile] = useState<File | "">("");
  const [imagePreview, setImagePreview] = useState<string>("");

  const onSubmit = async (data: TMealFormData) => {
    const ingredients = data?.ingredients as string;
    const ingredientsArray = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);
    data.ingredients = ingredientsArray;
    data.price = Number(data.price);
    try {
      const mealImage = imageFile ? await imageUpload(imageFile) : undefined;
      if (!mealImage) {
        toast.error("faild to upload image", { duration: 3000 });
      }
      data.imageUrl = mealImage as string;
      const result = await createMeal(data);

      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
        setImagePreview("");
        reset();
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className=" mx-auto p-6 bg-gray-200 dark:bg-gray-900 rounded-2xl shadow-xl text-gray-800 dark:text-white">
      {!hasKitchen ? (
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-blue-700 dark:text-blue-400">
            You Don`t Have a Kitchen Yet
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Create your kitchen to start adding your delicious meals!
          </p>
          <Link
            href="/mealProvider/myKitchen"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
          >
            Create Kitchen
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
            Add a meal
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-starts">
              <InputType
                label="Meal Name"
                name="title"
                register={register}
                error={errors.title}
                required={true}
              />
              <InputSelect
                register={register}
                name="foodCategory"
                label="food category"
                error={errors.foodCategory}
                options={foodCategory}
                required={true}
              />
              <InputSelect
                register={register}
                name="cuisineType"
                label="cuisine type"
                error={errors.cuisineType}
                options={cuisineType}
                required={true}
              />
              <InputSelect
                register={register}
                name="foodPreference"
                label="food preference"
                error={errors.foodPreference}
                options={foodPreferance}
                required={true}
              />
              <InputSelect
                register={register}
                name="portionSize"
                label="portion size"
                error={errors.portionSize}
                options={portionSize}
                required={true}
              />
              <InputType
                label="Meal Price"
                name="price"
                register={register}
                error={errors.price}
                type="number"
                required={true}
              />
              <div className="mb-4">
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ingredients
                </label>
                <input
                  id="ingredients"
                  type="text"
                  placeholder="e.g. Lentils, Garlic, Cauliflower"
                  {...register("ingredients", {
                    required: "at least one ingredients is required",
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm placeholder-gray-400"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate items with commas ( , )
                </p>
                {errors.ingredients && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ingredients.message}
                  </p>
                )}
              </div>
              <InputTextArea
                label="Description"
                name="description"
                placeholder="write about this meal"
                register={register}
                error={errors.description}
                required={true}
              />
              {imagePreview ? (
                <ImagePreviewer
                  setImageFile={setImageFile}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              ) : (
                <div>
                  <p>
                    Photo uploader <span className="text-red-500">*</span>
                  </p>
                  <ImageUploader
                    setImageFile={setImageFile}
                    setImagePreview={setImagePreview}
                  />
                </div>
              )}
            </div>
            <InputCheckboxArray
              label="dietary preference"
              register={register}
              options={diateryPreference}
              name="dietaryPreferences"
              errors={errors}
              required={true}
            />
            <InputCheckboxArray
              label="allergies"
              register={register}
              options={allergyOptions}
              name="allergies"
              errors={errors}
              required={true}
            />
            <InputCheckboxArray
              label="Available days"
              register={register}
              options={weekDays}
              name="availableDays"
              errors={errors}
              required={true}
            />
            <InputCheckboxArray
              label="Available Time"
              register={register}
              options={mealTime}
              name="availableTime"
              errors={errors}
              required={true}
            />
            <button
              type="submit"
              className="w-full bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition disabled:bg-gray-400 cursor-pointer"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateMeal;
