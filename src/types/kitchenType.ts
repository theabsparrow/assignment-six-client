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
export type TKitchenType = "Home-based" | "Commercial";
export type TKitchen = {
  kitchenName: string;
  kitchenType: TKitchenType;
  location: string;
  kitchenPhoto: string;
  hygieneCertified: boolean;
  hygieneCertificate?: string;
  licenseOrCertificate?: string;
  foodPreference: FoodPreferenceOption[];
  mealTimePerDay: TMealTime[];
  cookingDays: TCookingDay[];
  specialEquipments?: string | string[];
};

export interface TExtendedKitchen extends TKitchen {
  addFoodPreference: FoodPreferenceOption[];
  removeFoodPreference: FoodPreferenceOption[];
  addMealTimePerDay: TMealTime[];
  removeMealTimePerDay: TMealTime[];
  addCookingDays: TCookingDay[];
  removeCookingDays: TCookingDay[];
  addSpecialEquipments: string[];
  removeSpecialEquipments: string[];
}

export interface KitchenProfileCardProps {
  kitchenName: string;
  kitchenType: "Home-based" | "Commercial";
  owner: string;
  location: string;
  kitchenPhoto: string;
  hygieneCertified: boolean;
  hygieneCertificate?: string;
  licenseOrCertificate?: string;
  foodPreference: string[];
  mealTimePerDay: string[];
  cookingDays: string[];
  specialEquipments?: string[];
  _id?: string;
  isActive?: boolean;
}

export type TArrayEditProps<T> = {
  value: T[];
  valueOptions?: T[];
  handleSubmit: (
    field: string,
    addOptions: T[] | [],
    removeOptions: T[]
  ) => Promise<void>;
  label: string;
  styleClass?: string;
  style?: string;
};
