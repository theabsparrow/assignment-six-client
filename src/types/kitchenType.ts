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
  kitchenType: TKitchenType;
  owner: string;
  location: string;
  kitchenPhoto: string;
  hygieneCertified: boolean;
  hygieneCertificate?: string;
  licenseOrCertificate?: string;
  foodPreference: FoodPreferenceOption[];
  mealTimePerDay: TMealTime[];
  cookingDays: TCookingDay[];
  specialEquipments?: string[];
  _id?: string;
  isActive?: boolean;
  subscriber: number;
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

type TOwner = {
  name: string;
  _id: string;
};

export type TAllKitchenType = {
  kitchenName: string;
  kitchenType: TKitchenType;
  owner: TOwner;
  location: string;
  kitchenPhoto: string;
  hygieneCertified: boolean;
  _id: string;
  isActive: boolean;
  createdAt: string;
  subscriber: number;
};

export type TKitchenProfile = {
  _id: string;
  owner: {
    name: string;
    _id: string;
  };
  cookingDays: TCookingDay[];
  createdAt: string;
  foodHandlerExperience: string;
  foodPreference: FoodPreferenceOption[];
  hygieneCertificate?: string;
  hygieneCertified: boolean;
  isActive: boolean;
  kitchenName: string;
  kitchenPhoto: string;
  kitchenType: TKitchenType;
  licenseOrCertificate?: string;
  location: string;
  mealTimePerDay: TMealTime[];
  specialEquipments?: string[];
  subscriber: number;
};
