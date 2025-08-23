import { CreditCard, Wallet } from "lucide-react";

export const orderType = ["once", "regular"];

export const orderMethod = [
  {
    key: "online",
    label: "Online Payment",
    icon: CreditCard,
  },
  {
    key: "cash on delivery",
    label: "Cash on Delivery",
    icon: Wallet,
  },
];
