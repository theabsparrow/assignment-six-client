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
