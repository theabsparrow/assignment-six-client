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
  specialEquipments?: string | string[];
};

export interface TExtendedKitchen extends TKitchen {
  addFoodPreference: FoodPreferenceOption[];
  removeFoodPreference: FoodPreferenceOption[];
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
  specialEquipments?: string[];
  subscriber: number;
};

export type TKitchenDetails = {
  _id: string;
  foodHandlerExperience: string;
  foodPreference: FoodPreferenceOption[];
  hygieneCertified: boolean;
  kitchenName: string;
  kitchenPhoto: string;
  kitchenType: TKitchenType;
  location: string;
  specialEquipments?: string[];
  subscriber: number;
};
