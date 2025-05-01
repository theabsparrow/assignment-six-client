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

export type TKitchen = {
  kitchenName: string;
  kitchenType: "Home-based" | "Commercial";
  location: string;
  phoneNumber: string;
  email?: string;
  kitchenPhotos: string;
  hygieneCertified: boolean;
  licenseOrCertificate?: string;
  foodHandlerExperience: string;
  foodPreference?: FoodPreferenceOption[];
  mealTimePerDay: TMealTime[];
  cookingDays: TCookingDay[];
  specialEquipments?: string | string[];
};

export interface KitchenProfileCardProps {
  kitchenName: string;
  kitchenType: "Home-based" | "Commercial";
  owner: string;
  location: string;
  phoneNumber: string;
  email: string;
  kitchenPhotos: string;
  hygieneCertified: boolean;
  licenseOrCertificate?: string;
  foodHandlerExperience: string;
  foodPreference?: string[];
  mealTimePerDay: string[];
  cookingDays: string[];
  specialEquipments?: string[];
  _id?: string;
  isActive?: boolean;
}
