import { TOrderStatus, TSteps } from "@/types/orderTypes";
import {
  CheckCircle2,
  Clock,
  CookingPot,
  Home,
  Package,
  Truck,
} from "lucide-react";

export const orderStatus: TOrderStatus[] = [
  "Pending",
  "Confirmed",
  "Delivered",
  "Cancelled",
  "Cooking",
  "ReadyForPickup",
  "OutForDelivery",
];

export const statusStyles: Record<TOrderStatus, string> = {
  Pending: "text-yellow-700 bg-yellow-100 hover:bg-yellow-200",
  Confirmed: "text-blue-700 bg-blue-100 hover:bg-blue-200",
  Delivered: "text-green-700 bg-green-100 hover:bg-green-200",
  Cancelled: "text-red-800 bg-red-300 hover:bg-red-500",
  Cooking: "text-orange-700 bg-orange-100 hover:bg-orange-200",
  ReadyForPickup: "text-indigo-700 bg-indigo-100 hover:bg-indigo-200",
  OutForDelivery: "text-purple-700 bg-purple-100 hover:bg-purple-200",
};

export const activeStatusStyle: Record<"Yes" | "No", string> = {
  Yes: "text-green-700 bg-green-100 hover:bg-green-200",
  No: "text-red-800 bg-red-300 hover:bg-red-500",
};

export const steps: TSteps[] = [
  { key: "Pending", label: "Pending", icon: Clock },
  {
    key: "Confirmed",
    label: "Confirmed",
    icon: CheckCircle2,
  },
  {
    key: "Cooking",
    label: "Cooking",
    icon: CookingPot,
  },
  {
    key: "ReadyForPickup",
    label: "Ready for Pickup",
    icon: Package,
  },
  {
    key: "OutForDelivery",
    label: "Out for Delivery",
    icon: Truck,
  },
  { key: "Delivered", label: "Delivered", icon: Home },
];
