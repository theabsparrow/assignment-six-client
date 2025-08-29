import { LucideIcon } from "lucide-react";
import { TGender } from "./customerRegistration";
import {
  FoodPreferenceOption,
  TCookingDay,
  TcuisineType,
  TFoodCategory,
  TMealTime,
  TPortionSize,
} from "./mealType";
export type TOrderType = "once" | "regular";
export type TDeliveryMode = "mealPlanner" | "manual";
export type TOrderStatus =
  | "Pending"
  | "Confirmed"
  | "Delivered"
  | "Cancelled"
  | "Cooking"
  | "ReadyForPickup"
  | "OutForDelivery";

export type TPaymentOption = "online" | "cash on delivery";

export type TOrder = {
  _id: string;
  mealId: { _id: string; title: string };
  kitchenId?: { _id: string; kitchenName: string };
  customerId?: { _id: string; name: string };
  deliveryMode: TDeliveryMode;
  orderType: TOrderType;
  status: TOrderStatus;
  payment: TPaymentOption;
  createdAt?: string;
  endDate?: string;
  isActive: boolean;
  quantity?: number;
  totalPrice?: number;
  deliveredCount?: number;
  deliveryAddress?: string;
};

export type TPercentage = {
  percentage: number;
  isValid: boolean;
};

export type TConfirmModal = {
  quantity: number;
  deliveryTime: TMealTime[];
  deliveryDays: TCookingDay[];
  deliveryMode: TDeliveryMode | "";
  orderType: TOrderType | string;
  note?: string;
  deliveryAddress: string;
  payment: TPaymentOption | string;
};

type TKitchen = {
  _id: string;
  kitchenName: string;
};
type TCustomer = {
  _id: string;
  name: string;
  address: string;
  gender: TGender;
};
type TMeal = {
  _id: string;
  title: string;
  foodCategory: TFoodCategory;
  cuisineType: TcuisineType;
  foodPreference: FoodPreferenceOption;
  price: number;
  imageUrl: string;
  portionSize: TPortionSize;
};

export type TSingleOrder = {
  _id: string;
  createdAt: string;
  deliveryAddress: string;
  deliveryDays: TCookingDay[];
  deliveryTime: TMealTime[];
  deliveryMode: TDeliveryMode;
  orderType: TOrderType;
  payment: TPaymentOption;
  quantity: number;
  status: TOrderStatus;
  totalPrice: number;
  mealId: TMeal;
  isActive?: boolean;
  kitchenId?: TKitchen;
  customerId?: TCustomer;
  note?: string;
  deliveredCount?: number;
  endDate?: string;
};

export type TSteps = { key: TOrderStatus; label: string; icon: LucideIcon };
