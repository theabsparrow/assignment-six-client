"use client";

import { useForm } from "react-hook-form";
import InputType from "../../formInput/InputType";
import { TMealPlanner } from "@/types/MealPlanType";
import InputTextArea from "../../formInput/InputTextArea";
import InputCheckboxArray from "../../formInput/InputCheckboxArray";
import { foodPreferance, mealTime, weekDays } from "../kitchen/kitchen.const";
import { diateryPreference } from "../meal/createMeal/createMeal.const";
import InputSelect from "../../formInput/InputSelect";
import { createMealPlan } from "@/services/mealPlannerService.ts";
import { toast } from "sonner";

const CreateMyPlan = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TMealPlanner>();
  const onSubmit = async (data: TMealPlanner) => {
    try {
      const result = await createMealPlan(data);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
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
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        Create a plan
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-starts">
          <InputType
            label="Planner Title"
            name="title"
            register={register}
            error={errors.title}
            required={true}
          />
          <InputSelect
            register={register}
            name="foodPreference"
            label="Food Preferance"
            error={errors.foodPreference}
            options={foodPreferance}
            required={true}
          />
          <InputTextArea
            label="Description of your Plan"
            name="notes"
            placeholder="write about this meal"
            register={register}
            error={errors.notes}
            required={true}
          />
        </div>
        <InputCheckboxArray
          label="Meal Time"
          register={register}
          options={mealTime}
          name="preferredMealTime"
          errors={errors}
          required={true}
        />

        <InputCheckboxArray
          label="Preferred Meal Day"
          register={register}
          options={weekDays}
          name="preferredMealDay"
          errors={errors}
          required={true}
        />
        <InputCheckboxArray
          label="Dietary preference"
          register={register}
          options={diateryPreference}
          name="dietaryPreferences"
          errors={errors}
          required={true}
        />
        <button
          type="submit"
          className="w-full bg-[#00823e] hover:bg-green-800 dark:bg-blue-400 dark:hover:bg-blue-500 duration-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition disabled:bg-gray-400 cursor-pointer"
        >
          {isSubmitting ? "Creating" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateMyPlan;
