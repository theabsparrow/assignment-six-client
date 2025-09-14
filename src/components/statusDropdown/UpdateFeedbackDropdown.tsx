"use client";

import { FeedbackFormData } from "@/types/rating.types";
import { Star } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { validateFeedback } from "../modules/dashboard/orderDetails/orderDetails.utills";
import { updateMyFeedback } from "@/services/feedbackService";
import { toast } from "sonner";

type TFeedbackProps = {
  id: string;
  feedback: string;
  rating: number;
  vlaue: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
};

const UpdateFeedbackDropdown = ({
  id,
  feedback,
  rating,
  vlaue,
  setValue,
}: TFeedbackProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FeedbackFormData>({
    defaultValues: {
      feedback: feedback || "",
      rating: rating || 0,
    },
  });
  const feedbackValue = watch("feedback");
  const currentCount = feedbackValue?.length;

  const onSubmit = async (data: FeedbackFormData) => {
    const payload: Partial<FeedbackFormData> = {};
    if (data.feedback !== feedback) {
      payload.feedback = data.feedback;
    }
    if (data.rating !== rating) {
      payload.rating = data.rating;
    }
    if (Object(payload).length === 0) {
      toast.error("No changes to update", { duration: 3000 });
      setValue(false);
      return;
    }
    try {
      const result = await updateMyFeedback(id, payload);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
        setValue(false);
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      {vlaue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="relative max-w-lg mx-auto shadow-md rounded-xl px-6 py-3 bg-gradient-to-br from-green-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 md:text-center">
              Update Your Feedback
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Rate Us
                </label>
                <Controller
                  name="rating"
                  control={control}
                  rules={{ required: "Rating is required", min: 1 }}
                  render={({ field }) => (
                    <div className="flex items-center gap-2 md:gap-4">
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const starValue = idx + 1;
                        return (
                          <Star
                            key={idx}
                            onClick={() => field.onChange(starValue)}
                            className={`w-10 h-10 md:w-16 md:h-16 cursor-pointer transition-colors ${
                              field.value >= starValue
                                ? "fill-primary text-secondary"
                                : "text-gray-300"
                            }`}
                          />
                        );
                      })}
                    </div>
                  )}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm">
                    {errors.rating.message?.toString()}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Feedback
                </label>
                <textarea
                  rows={4}
                  {...register("feedback", { validate: validateFeedback })}
                  maxLength={350}
                  className={`w-full rounded-lg px-3 py-2 focus:ring-2 outline-none resize-none border  ${
                    errors.feedback
                      ? " border-red-400 ring-red-400"
                      : " border-green-600 ring-primary"
                  }`}
                  placeholder="Write your feedback here..."
                />
                <div className="flex justify-between text-sm">
                  <span
                    className={
                      errors.feedback ? "text-red-500" : "text-gray-500"
                    }
                  >
                    {currentCount}/{350}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setValue(false);
                    reset();
                  }}
                  type="button"
                  className="bg-white text-gray-700 py-1 px-2 rounded-lg font-semibold border border-gray-400 hover:bg-gray-600 hover:text-white transition duration-500 shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-white"
                >
                  Not Now
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secondary text-primary px-2 py-1 rounded-lg font-bold hover:bg-primary hover:text-white duration-500 cursor-pointer transition border border-primary disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-white"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateFeedbackDropdown;
