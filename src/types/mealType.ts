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
  | "Mediterranean"
  | "Mexican"
  | "Turkish"
  | "Persian"
  | "Spanish"
  | "French"
  | "Japanese"
  | "Korean";

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
  | "Diabetic-Friendly"
  | "Low-Fat"
  | "High-Protein"
  | "Dairy-Free"
  | "Nut-Free"
  | "High Fiber"
  | "Low-Sodium"
  | "Raw Food"
  | "Organic"
  | "Plant-Based";

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

export type TSixMealData = {
  _id?: string;
  title: string;
  imageUrl: string;
  price: number;
  cuisineType: TcuisineType;
  foodPreference: FoodPreferenceOption;
  foodCategory: TFoodCategory;
};

export type TMealListing = {
  _id?: string;
  kitchen: { _id: string; kitchenName: string };
  title: string;
  foodCategory: TFoodCategory;
  cuisineType: TcuisineType;
  foodPreference: FoodPreferenceOption;
  portionSize: TPortionSize;
  price: number;
  isAvailable?: boolean;
  createdAt: string;
};

export type TMealProfile = {
  _id: string;
  kitchen: {
    kitchenName: string;
    _id: string;
  };
  owner: {
    name: string;
    _id: string;
  };
  allergies: TAlergies[];
  availableDays: TCookingDay[];
  availableTime: TMealTime[];
  avarageRating: number;
  createdAt: string;
  cuisineType: TcuisineType;
  description: string;
  dietaryPreferences: TDietaryPreference[];
  foodCategory: TFoodCategory;
  foodPreference: FoodPreferenceOption;
  imageUrl: string;
  ingredients: string[];
  isAvailable: boolean;
  portionSize: TPortionSize;
  price: number;
  ratingCount: number;
  title: string;
};
