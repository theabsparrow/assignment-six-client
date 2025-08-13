import {
  FoodPreferenceOption,
  TCookingDay,
  TDietaryPreference,
  TMealTime,
} from "./mealType";

export type TMealPlanner = {
  title: string;
  preferredMealTime: TMealTime[];
  preferredMealDay: TCookingDay[];
  foodPreference: FoodPreferenceOption;
  dietaryPreferences: TDietaryPreference[];
  notes: string;
};

export type TMyMealPlanner = {
  _id: string;
  createdAt: string;
  foodPreference: FoodPreferenceOption;
  isActive: boolean;
  preferredMealTime: TMealTime[];
  title: string;
};

export type TmealPlannerDetails = {
  _id: string;
  title: string;
  preferredMealTime: TMealTime[];
  preferredMealDay: TCookingDay[];
  foodPreference: FoodPreferenceOption;
  dietaryPreferences: TDietaryPreference[];
  notes: string;
  isActive: boolean;
  createdAt: string;
};

export type TPlanUpdate = {
  title: string;
  foodPreference: FoodPreferenceOption;
  notes: string;
  isActive: boolean;
  addPreferredMealTime: TMealTime[];
  removePreferredMealTime: TMealTime[];
  addPreferredMealDay: TCookingDay[];
  removePreferredMealDay: TCookingDay[];
  addDietaryPreferences: TDietaryPreference[];
  removeDietaryPreferences: TDietaryPreference[];
};
