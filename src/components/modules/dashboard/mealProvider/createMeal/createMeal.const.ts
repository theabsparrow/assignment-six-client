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
  "Low-Fat",
  "High-Protein",
  "Dairy-Free",
  "Nut-Free",
  "High Fiber",
  "Low-Sodium",
  "Raw Food",
  "Organic",
  "Plant-Based",
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
  "Mexican",
  "Turkish",
  "Persian",
  "Spanish",
  "French",
  "Japanese",
  "Korean",
];

export const foodCategory: TFoodCategory[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
];

export const portionSize: TPortionSize[] = ["Small", "Medium", "Large"];
