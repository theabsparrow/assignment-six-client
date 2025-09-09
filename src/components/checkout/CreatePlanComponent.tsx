"use client";

import { createMealPlan } from "@/services/mealPlannerService.ts";
import {
  TcheckoutMeal,
  TDietaryPreference,
  TMealDay,
  TMealTime,
} from "@/types/mealType";
import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

const CreatePlanComponent = ({ meal }: { meal: TcheckoutMeal }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [preferredMealTime, setPreferredMealTime] = useState<TMealTime[]>(
    meal?.availableTime || []
  );
  const [preferredMealDay, setPreferredMealDay] = useState<TMealDay[]>(
    meal?.availableDays || []
  );
  const [dietaryPreferences, setDietaryPreferences] = useState<
    TDietaryPreference[]
  >(meal?.dietaryPreferences || []);

  const handleRemove = (type: string, value: string) => {
    if (type === "time")
      setPreferredMealTime((prev) => prev.filter((v) => v !== value));
    if (type === "day")
      setPreferredMealDay((prev) => prev.filter((v) => v !== value));
    if (type === "diatery")
      setDietaryPreferences((prev) => prev.filter((v) => v !== value));
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !notes ||
      preferredMealTime.length < 1 ||
      preferredMealDay.length < 1 ||
      dietaryPreferences.length < 1 ||
      !meal?.foodPreference
    ) {
      toast.error("Please provide all the necessary data to create a plan", {
        duration: 3000,
      });
      return;
    }
    const payload = {
      title,
      notes,
      foodPreference: meal?.foodPreference,
      preferredMealTime,
      preferredMealDay,
      dietaryPreferences,
    };
    try {
      const result = await createMealPlan(payload);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
        setOpen(false);
        setTitle("");
        setNotes("");
        setPreferredMealTime(meal?.availableTime);
        setPreferredMealDay(meal?.availableDays);
        setDietaryPreferences(meal?.dietaryPreferences);
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="mt-4">
      <button
        onClick={() => setOpen(true)}
        disabled={open}
        className="w-full rounded-xl bg-secondary border border-primary text-primary px-4 py-2 text-sm font-semibold hover:text-white shadow-md hover:bg-primary transition ease-in-out duration-500 cursor-pointer disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed"
      >
        Create New Plan for This Meal
      </button>
      {open && (
        <div className="p-4 rounded-xl border shadow-md bg-white space-y-2 absolute -top-1 md:top-0 -right-0 w-full md:w-[23vw] ">
          <div className="flex justify-between items-center ">
            <button
              onClick={() => {
                setTitle("");
                setNotes("");
                setPreferredMealTime(meal?.availableTime);
                setPreferredMealDay(meal?.availableDays);
                setDietaryPreferences(meal?.dietaryPreferences);
              }}
              className="text-primary text-xl hover:scale-130 duration-500 cursor-pointer"
            >
              <GrPowerReset />
            </button>
            <button
              onClick={() => {
                setOpen(false);
                setTitle("");
                setNotes("");
                setPreferredMealTime(meal?.availableTime);
                setPreferredMealDay(meal?.availableDays);
                setDietaryPreferences(meal?.dietaryPreferences);
              }}
              className="cursor-pointer text-red-800 text-xl hover:scale-130 duration-500"
            >
              <RxCross2 />
            </button>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-transparent 
              border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-secondary focus:dark:border-blue-400"
              placeholder=" plan title"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Notes <span className="text-red-500">*</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="notes for your plan"
              minLength={10}
              maxLength={300}
              className={`peer w-full px-4 py-2 rounded-xl border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-secondary focus:dark:border-blue-400  ${
                notes.length > 0 && notes.length < 10
                  ? "border-red-500 focus:ring-red-500"
                  : "dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-secondary"
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimum 10 characters, maximum 300 characters.
            </p>

            {notes.length > 0 && notes.length < 10 && (
              <p className="text-xs text-red-500 mt-1">
                ❌ Please enter at least 10 characters.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Food Preference <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={meal?.foodPreference}
              disabled
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500">
              This value is fixed from the meal.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Preferred Meal Time <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {preferredMealTime.map((time) => (
                <span
                  key={time}
                  className="flex items-center gap-2 rounded-full bg-secondary text-primary px-3 py-1 text-xs font-semibold"
                >
                  {time}
                  <button
                    onClick={() => handleRemove("time", time)}
                    className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              You can remove but not add new times.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Preferred Meal Days <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {preferredMealDay.map((day) => (
                <span
                  key={day}
                  className="flex items-center gap-2 rounded-full bg-secondary text-primary px-3 py-1 text-xs font-semibold"
                >
                  {day}
                  <button
                    onClick={() => handleRemove("day", day)}
                    className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              You can remove but not add new days.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Dietary Preferences <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {dietaryPreferences.map((diet) => (
                <span
                  key={diet}
                  className="flex items-center gap-2 rounded-full bg-secondary text-primary px-3 py-1 text-xs font-semibold"
                >
                  {diet}
                  <button
                    onClick={() => handleRemove("diatery", diet)}
                    className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              You can remove but not add new preferences.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleSubmit}
              className="px-2 py-1 rounded-lg bg-primary text-white font-medium shadow-md hover:bg-primary/90 cursor-pointer"
            >
              Save Plan
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreatePlanComponent;
