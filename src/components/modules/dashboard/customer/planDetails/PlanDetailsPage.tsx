"use client";

import EditComponent from "@/components/modules/editComponent/EditComponent";
import StatusDropdown from "@/components/statusDropdown/StatusDropdown";
import { deletePlan, updatePlan } from "@/services/mealPlannerService.ts";
import { FoodPreferenceOption } from "@/types/kitchenType";
import { TmealPlannerDetails, TPlanUpdate } from "@/types/MealPlanType";
import { TStatus } from "@/types/subscriber.types";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { foodPreferance } from "../../mealProvider/kitchenProfile/kitchen.const";
import EditArray from "@/components/modules/editArrayComponent/EditArray";
import { TDietaryPreference, TMealDay, TMealTime } from "@/types/mealType";
import {
  diateryPreference,
  mealTime,
  weekDays,
} from "../../mealProvider/createMeal/createMeal.const";
import DeletionModal from "@/components/statusDropdown/DeletionModal";

const PlanDetails = ({ data }: { data: TmealPlannerDetails }) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [title, settitle] = useState(data?.title ?? "");

  const [isNoteEditing, setisNoteEditing] = useState(false);
  const [notes, setNotes] = useState(data?.notes ?? "");
  const [isPreferenceEditing, setIsPreferenceEditing] = useState(false);
  const [preference, setPreference] = useState(data?.foodPreference ?? "");

  const status = data?.isActive ? "active" : "blocked";
  const id = data?._id;
  const date = new Date(data?.createdAt);
  const creatDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const createTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleSubmit = async (
    field: string,
    addOptions: string[] | [],
    removeOptions: string[]
  ) => {
    const updatedData: Partial<TPlanUpdate> = {};
    if (field === "title") {
      if (title.trim() === data?.title) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.title = title.trim();
        setIsTitleEditing(false);
      }
    }
    if (field === "notes") {
      if (notes.trim() === data?.notes) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.notes = notes.trim();
        setisNoteEditing(false);
      }
    }
    if (field === "foodPreference") {
      if (preference === data?.foodPreference) {
        toast.error("nothing to update", { duration: 3000 });
        return;
      } else {
        updatedData.notes = notes.trim();
        setisNoteEditing(false);
      }
    }
    if (field === "Meal Time") {
      if (addOptions?.length > 0) {
        updatedData.addPreferredMealTime = addOptions as TMealTime[];
      }
      if (removeOptions.length > 0) {
        updatedData.removePreferredMealTime = removeOptions as TMealTime[];
      }
    }
    if (field === "Meal Day") {
      if (addOptions?.length > 0) {
        updatedData.addPreferredMealDay = addOptions as TMealDay[];
      }
      if (removeOptions.length > 0) {
        updatedData.removePreferredMealDay = removeOptions as TMealDay[];
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
    const toastId = toast.loading("updating pnal data...");

    try {
      const result = await updatePlan(updatedData, id);
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
    const data: Partial<TPlanUpdate> = {
      isActive: value,
    };
    const toastId = toast.loading("updating status...");
    try {
      const result = await updatePlan(data, id);
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
    if (!id) {
      toast.error("falid to remove plan", { duration: 3000 });
      setLoading(false);
      return;
    }
    const toastId = toast.loading("Removing plan...");
    try {
      const result = await deletePlan(id);
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
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden max-w-2xl mx-auto p-10 space-y-4">
      <div className=" border-b-2 border-secondary pb-6 space-y-4">
        <div>
          {isTitleEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                settitle(value);
              }}
              className="px-2 py-1 border rounded-md w-44 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          ) : (
            <h2 className="text-3xl font-bold text-green-800">{data?.title}</h2>
          )}
          <EditComponent
            setValue={settitle}
            isEditing={isTitleEditing}
            setIsEditing={setIsTitleEditing}
            value={data?.title as string}
            handleSubmit={handleSubmit}
            field="title"
          />
        </div>
        <div>
          {isNoteEditing ? (
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="px-2 py-1 border rounded-md w-66 h-24 resize-none outline-none"
            />
          ) : (
            <p className="text-gray-600 whitespace-pre-line"> {data?.notes}</p>
          )}
          <EditComponent
            setValue={setNotes}
            isEditing={isNoteEditing}
            setIsEditing={setisNoteEditing}
            value={data?.notes as string}
            handleSubmit={handleSubmit}
            field="notes"
          />
        </div>
        <p className=" text-gray-500">
          Created on {creatDate}, {createTime}
        </p>
        <div className="flex items-start justify-between mt-6">
          <div>
            {isPreferenceEditing ? (
              <select
                value={preference}
                onChange={(e) =>
                  setPreference(e.target.value as FoodPreferenceOption)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-700"
              >
                {foodPreferance.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-base text-gray-600">
                {data?.foodPreference || "N/A"}
              </p>
            )}
            <EditComponent
              setValue={setPreference}
              isEditing={isPreferenceEditing}
              setIsEditing={setIsPreferenceEditing}
              value={data?.foodPreference as FoodPreferenceOption}
              handleSubmit={handleSubmit}
              field="foodPreference"
            />
          </div>
          <div>
            <StatusDropdown
              status={status as TStatus}
              options={["active", "blocked"]}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 border-b-2 border-secondary pb-6">
        {data?.preferredMealTime.length && (
          <EditArray
            value={data?.preferredMealTime as TMealTime[]}
            valueOptions={mealTime}
            handleSubmit={handleSubmit}
            label="Meal Time"
            styleClass="bg-secondary text-primary px-3 py-1 rounded-full "
            style="flex flex-col justify-start items-start"
          />
        )}
        {data?.preferredMealDay.length && (
          <EditArray
            value={data?.preferredMealDay as TMealDay[]}
            valueOptions={weekDays}
            handleSubmit={handleSubmit}
            label="Meal Day"
            styleClass="bg-secondary text-primary px-3 py-1 rounded-full "
            style="flex flex-col justify-start items-start"
          />
        )}
        {data?.dietaryPreferences.length && (
          <EditArray
            value={data?.dietaryPreferences as TDietaryPreference[]}
            valueOptions={diateryPreference}
            handleSubmit={handleSubmit}
            label="Diatery Preference"
            styleClass="bg-secondary text-primary px-3 py-1 rounded-full "
            style="flex flex-col justify-start items-start"
          />
        )}
      </div>

      <DeletionModal
        name={data?.title}
        collection="Meal plan"
        handleDelete={handleDelete}
        title="Plan Delation"
        buttonName="delete Plan"
      />
    </section>
  );
};

export default PlanDetails;
