import { TGender } from "./customerRegistration";

type TKitchendata = {
  _id: string;
  isActive: boolean;
  kitchenName: string;
  kitchenType: "Home-based" | "Commercial";
  location: string;
};

export type TKItchenSubscriber = {
  _id: string;
  createdAt: string;
  kitchen: TKitchendata;
};

export type TGetAllSubscribersType = {
  _id: string;
  createdAt: string;
  subscriberInfo: {
    gender: TGender;
    name: string;
    _id: string;
  };
};
