import {
  TcuisineType,
  TDietaryPreference,
  TFoodCategory,
  TMealDay,
  TMealTime,
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

export const portionSize: TPortionSize[] = ["Small", "Medium", "Large"];

export const weekDays: TMealDay[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const mealTime: TMealTime[] = [
  "Breakfast",
  "Brunch",
  "Lunch",
  "Snack",
  "Dinner",
  "Supper",
  "Tea Time",
  "Midnight Snack",
] as const;

export const foodCategory: TFoodCategory[] = [
  ...mealTime,
  "Appetizer",
  "Dessert",
  "Beverage",
  "Side Dish",
  "Sea Food",
  "Street Food & Fast Food",
  "Healthy Meal",
];
