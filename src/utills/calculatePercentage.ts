import { TcheckoutMeal, TCheckoutPlan } from "@/types/mealType";

type TMatchedType = {
  foodPreference: { meal: string; plan: string; matched: boolean };
  dietary: {
    meal: string[];
    plan: string[];
    matchedItems: string[];
    notMatchedItems: string[];
  };
  days: {
    meal: string[];
    plan: string[];
    matchedItems: string[];
    notMatchedItems: string[];
  };
  times: {
    meal: string[];
    plan: string[];
    matchedItems: string[];
    notMatchedItems: string[];
  };
};

export const checkPlanMatch = (plan: TCheckoutPlan, meal: TcheckoutMeal) => {
  let matchedCount = 0;
  let totalCount = 0;

  const details: TMatchedType = {
    foodPreference: {
      meal: meal.foodPreference,
      plan: plan.foodPreference,
      matched: false,
    },
    dietary: {
      meal: meal.dietaryPreferences,
      plan: plan.dietaryPreferences,
      matchedItems: [],
      notMatchedItems: [],
    },
    days: {
      meal: meal.availableDays,
      plan: plan.preferredMealDay,
      matchedItems: [],
      notMatchedItems: [],
    },
    times: {
      meal: meal.availableTime,
      plan: plan.preferredMealTime,
      matchedItems: [],
      notMatchedItems: [],
    },
  };

  // --- Food Preference ---

  if (plan.foodPreference === meal.foodPreference) {
    totalCount++;
    matchedCount++;
    details.foodPreference.matched = true;
  }

  // --- Dietary Preferences ---
  plan.dietaryPreferences.forEach((d) => {
    totalCount++;
    if (meal?.dietaryPreferences.includes(d)) {
      matchedCount++;
      details.dietary.matchedItems.push(d);
    } else {
      details.dietary.notMatchedItems.push(d);
    }
  });

  // --- Days ---
  plan?.preferredMealDay.forEach((day) => {
    totalCount++;
    if (meal?.availableDays.includes(day)) {
      matchedCount++;
      details.days.matchedItems.push(day);
    } else {
      details.days.notMatchedItems.push(day);
    }
  });

  // --- Times ---
  plan.preferredMealTime.forEach((time) => {
    totalCount++;
    if (meal?.availableTime.includes(time)) {
      matchedCount++;
      details.times.matchedItems.push(time);
    } else {
      details.times.notMatchedItems.push(time);
    }
  });

  // --- Validation (subset check for days + times) ---
  const preferenceValid = meal?.foodPreference === plan?.foodPreference;
  const daysValid = plan.preferredMealDay.every((d) =>
    meal?.availableDays.includes(d)
  );
  const timesValid = plan.preferredMealTime.every((t) =>
    meal?.availableTime.includes(t)
  );

  const percentage = totalCount > 0 ? (matchedCount / totalCount) * 100 : 0;

  return {
    percentage,
    isValid: preferenceValid && daysValid && timesValid,
  };
};
