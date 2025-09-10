import { TAlergies } from "./customerRegistration";
import { FoodPreferenceOption } from "./kitchenType";

export type TMealTime =
  | "Breakfast"
  | "Brunch"
  | "Lunch"
  | "Snack"
  | "Dinner"
  | "Supper"
  | "Tea Time"
  | "Midnight Snack";

export type TMealDay =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type TFoodCategory =
  | TMealTime
  | "Appetizer"
  | "Dessert"
  | "Beverage"
  | "Side Dish"
  | "Sea Food"
  | "Street Food & Fast Food"
  | "Healthy Meal";

export type TFoodPreference =
  | FoodPreferenceOption
  | "Vegan"
  | "Pescatarian"
  | "Eggetarian"
  | "Halal"
  | "Kosher"
  | "Jain";

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
  foodPreference: TFoodPreference;
  ingredients: string[] | string;
  allergies: TAlergies[];
  portionSize: TPortionSize;
  price: number;
  imageUrl: string;
  availableDays: TMealDay[];
  availableTime: TMealTime[];
  _id?: string;
  avarageRating?: number;
  ratingCount?: number;
  isAvailable?: boolean;
};

export type TMyMealsList = {
  _id: string;
  avarageRating: number;
  createdAt: string;
  cuisineType: TcuisineType;
  foodCategory: TFoodCategory;
  foodPreference: TFoodPreference;
  isAvailable: boolean;
  portionSize: TPortionSize;
  price: number;
  title: string;
};

export type TSixMealData = {
  _id?: string;
  title: string;
  imageUrl: string;
  price: number;
  cuisineType: TcuisineType;
  foodPreference: TFoodPreference;
  foodCategory: TFoodCategory;
};

export type TMealListing = {
  _id?: string;
  kitchen: { _id: string; kitchenName: string };
  title: string;
  foodCategory: TFoodCategory;
  cuisineType: TcuisineType;
  foodPreference: TFoodPreference;
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
  availableDays: TMealDay[];
  availableTime: TMealTime[];
  avarageRating: number;
  createdAt: string;
  cuisineType: TcuisineType;
  description: string;
  dietaryPreferences: TDietaryPreference[];
  foodCategory: TFoodCategory;
  foodPreference: TFoodPreference;
  imageUrl: string;
  ingredients: string[];
  isAvailable: boolean;
  portionSize: TPortionSize;
  price: number;
  ratingCount: number;
  title: string;
};

export type TUpdatemealData = {
  title: string;
  description: string;
  foodCategory: TFoodCategory;
  cuisineType: TcuisineType;
  foodPreference: TFoodPreference;
  portionSize: TPortionSize;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  addDietaryPreferences: TDietaryPreference[];
  removeDietaryPreferences: TDietaryPreference[];
  addIngredients: string[];
  removeIngredients: string[];
  addAllergies: TAlergies[];
  removeAllergies: TAlergies[];
  addAvailableDays: TMealDay[];
  removeAvailableDays: TMealDay[];
  addAvailableTime: TMealTime[];
  removeAvailableTime: TMealTime[];
};

export type TMyMealDetails = {
  _id: string;
  title: string;
  description: string;
  foodCategory: TFoodCategory;
  foodPreference: TFoodPreference;
  cuisineType: TcuisineType;
  portionSize: TPortionSize;
  imageUrl: string;
  avarageRating: number;
  ratingCount: number;
  price: number;
  allergies: TAlergies[];
  availableDays: TMealDay[];
  availableTime: TMealTime[];
  ingredients: string[];
  dietaryPreferences: TDietaryPreference[];
  createdAt: string;
  isAvailable: boolean;
};

export type TcheckoutMeal = {
  _id: string;
  title: string;
  kitchen: { _id: string; kitchenName: string };
  availableDays: TMealDay[];
  availableTime: TMealTime[];
  dietaryPreferences: TDietaryPreference[];
  foodPreference: TFoodPreference;
  price: number;
};

export type TCheckoutPersonInfo = {
  email: string;
  name: string;
  phone: string;
  verified: boolean;
};

export type TCheckoutPlan = {
  _id: string;
  title: string;
  dietaryPreferences: TDietaryPreference[];
  foodPreference: TFoodPreference;
  preferredMealDay: TMealDay[];
  preferredMealTime: TMealTime[];
};

export type Tcheckoutprops = {
  isMealExists: TcheckoutMeal;
  personalInfo: TCheckoutPersonInfo;
  result: TCheckoutPlan[];
};

export type TCategoryCard<TId = string> = {
  id: string;
  imageUrl: string;
  title: string;
  _id: TId;
};
