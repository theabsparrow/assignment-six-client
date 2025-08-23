import { TCookingDay, TMealTime } from "./mealType";
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
  payment: "online" | "cash on delivery" | string;
};
