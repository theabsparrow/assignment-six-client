import { TAlergies } from "./customerRegistration";

export type TMealTime = "Breakfast" | "Lunch" | "Dinner";
export type TCookingDay =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type FoodPreferenceOption = "Veg" | "Non-Veg" | "Mixed";

export type TFoodCategory = TMealTime | "Snack";
export type TcuisineType =
  | "Bengali"
  | "Indian"
  | "Chinese"
  | "Continental"
  | "Italian"
  | "Thai"
  | "American"
  | "Mediterranean";

export type TPortionSize = "Small" | "Medium" | "Large";

export type TDietaryPreference =
  | "Vegan"
  | "Vegetarian"
  | "Keto"
  | "Paleo"
  | "Gluten-Free"
  | "Regular"
  | "Halal"
  | "Low-Carb"
  | "Diabetic-Friendly";

export type TMealFormData = {
  title: string;
  description: string;
  dietaryPreferences: TDietaryPreference[];
  foodCategory: TFoodCategory;
  cuisineType: TcuisineType;
  foodPreference: FoodPreferenceOption;
  ingredients: string[] | string;
  allergies: TAlergies[];
  portionSize: TPortionSize;
  price: number;
  imageUrl: string;
  availableDays: TCookingDay[];
  availableTime: TMealTime[];
  _id?: string;
  rating?: number;
  isAvailable?: boolean;
};
