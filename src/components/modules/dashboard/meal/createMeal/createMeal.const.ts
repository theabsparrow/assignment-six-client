import {
  TcuisineType,
  TDietaryPreference,
  TFoodCategory,
  TPortionSize,
} from "@/types/mealType";

export const diateryPreference: TDietaryPreference[] = [
  "Vegan",
  "Vegetarian",
  "Keto",
  "Paleo",
  "Gluten-Free",
  "Regular",
  "Halal",
  "Low-Carb",
  "Diabetic-Friendly",
];

export const cuisineType: TcuisineType[] = [
  "Bengali",
  "Indian",
  "Chinese",
  "Continental",
  "Italian",
  "Thai",
  "American",
  "Mediterranean",
];

export const foodCategory: TFoodCategory[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
];

export const portionSize: TPortionSize[] = ["Small", "Medium", "Large"];
