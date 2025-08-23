import { TcheckoutMeal, TCheckoutPlan } from "@/types/mealType";
import { TPercentage } from "@/types/orderTypes";
import { CheckCircle, XCircle } from "lucide-react";

type TPercentageComponentProps = {
  matchResult: TPercentage;
  meal: TcheckoutMeal;
  selectedPlan: TCheckoutPlan;
};

const PercentageComponent = ({
  matchResult,
  meal,
  selectedPlan,
}: TPercentageComponentProps) => {
  return (
    <section className="space-y-6 ">
      <div>
        <p className="font-semibold mb-2">
          Match Percentage: {matchResult.percentage.toFixed(0)}%
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${matchResult.percentage}%` }}
          ></div>
        </div>
      </div>

      {/* --- Food Preference --- */}
      <div className="flex justify-between items-center gap-20">
        <div>
          <p className="text-sm text-gray-500">Meal Preference</p>
          <p className="font-medium">{meal?.foodPreference}</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-gray-500">Plan Preference</p>
          <p className="font-medium flex items-center gap-2">
            {selectedPlan?.foodPreference}{" "}
            {meal?.foodPreference === selectedPlan.foodPreference ? (
              <span className="text-green-600 text-sm">✅</span>
            ) : (
              <span className="text-red-600 text-sm">❌</span>
            )}
          </p>
        </div>
      </div>

      {/* --- Dietary Preferences --- */}
      <div className="flex justify-between gap-20">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Meal Dietary</p>
          <div>
            {meal?.dietaryPreferences.map((d) => {
              const matched = selectedPlan?.dietaryPreferences.includes(d);
              return (
                <div key={d} className="flex items-center gap-2">
                  <span>{d}</span>
                  {matched ? (
                    <span className="text-green-600 text-sm">✅</span>
                  ) : (
                    <span className="text-gray-400"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-1 flex flex-col items-end">
          <p className="text-sm text-gray-500 ">Plan Dietary</p>
          <div className="flex flex-col items-end">
            {selectedPlan.dietaryPreferences.map((d) => {
              const matched = meal.dietaryPreferences.includes(d);
              return (
                <div key={d} className="flex items-center gap-2">
                  <span>{d}</span>
                  {matched ? (
                    <span className="text-green-600 text-sm">✅</span>
                  ) : (
                    <span className="text-red-600 text-sm">❌</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Days --- */}
      <div className="flex justify-between gap-20">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Meal Days</p>
          <div>
            {meal.availableDays.map((day) => {
              const matched = selectedPlan.preferredMealDay.includes(day);
              return (
                <div key={day} className="flex items-center gap-2">
                  <span>{day}</span>
                  {matched ? (
                    <span className="text-green-600 text-sm">✅</span>
                  ) : (
                    <span className="text-gray-400"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500 flex flex-col items-end">
            Plan Days
          </p>
          <div className="flex flex-col items-end">
            {selectedPlan.preferredMealDay.map((day) => {
              const matched = meal.availableDays.includes(day);
              return (
                <div key={day} className="flex items-center gap-2">
                  <span>{day}</span>
                  {matched ? (
                    <span className="text-green-600 text-sm">✅</span>
                  ) : (
                    <span className="text-red-600 text-sm">❌</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* times */}
      <div className="flex justify-between gap-20">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Meal Times</p>
          <div>
            {meal.availableTime.map((time) => {
              const matched = selectedPlan.preferredMealTime.includes(time);
              return (
                <div key={time} className="flex items-center gap-2">
                  <span>{time}</span>
                  {matched ? (
                    <span className="text-green-600 text-sm">✅</span>
                  ) : (
                    <span className="text-gray-400"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-1 ">
          <p className="text-sm text-gray-500 flex flex-col items-end">
            Plan Times
          </p>
          <div className="flex flex-col items-end">
            {selectedPlan.preferredMealTime.map((time) => {
              const matched = meal.availableTime.includes(time);
              return (
                <div key={time} className="flex items-center gap-2">
                  <span>{time}</span>
                  {matched ? (
                    <span className="text-green-600 text-sm">✅</span>
                  ) : (
                    <span className="text-red-600 text-sm">❌</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 md:w-[20vw]">
        <div
          className={`flex gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
            matchResult.isValid
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {matchResult.isValid ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <XCircle className="w-4 h-4 text-red-600" />
          )}
          <div>
            {matchResult.isValid ? (
              <p className="flex flex-col">
                <span> Plan is valid – </span>{" "}
                <span>
                  all preferences, days, and times are included in the meal
                </span>
              </p>
            ) : (
              <p className="flex flex-col">
                <span> Plan is not valid – </span>{" "}
                <span>
                  some preferences, days, or times are missing in the meal
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PercentageComponent;
