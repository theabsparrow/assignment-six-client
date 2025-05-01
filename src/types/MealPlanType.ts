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
  title: string;
  preferredMealTime: TMealTime[];
  preferredMealDay: TCookingDay[];
  foodPreference: FoodPreferenceOption;
  dietaryPreferences: TDietaryPreference[];
  notes: string;
  _id?: string;
  isActive?: boolean;
};
