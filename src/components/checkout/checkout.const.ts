import { TConfirmModal } from "@/types/orderTypes";

export const confirmModal: TConfirmModal = {
  quantity: 0,
  deliveryTime: [],
  deliveryDays: [],
  deliveryMode: "",
  orderType: "",
  note: "",
  deliveryAddress: "",
  payment: "",
};
// export const confirmModal: TConfirmModal = {
//   quantity: 3,
//   deliveryTime: ["Breakfast", "Dinner"],
//   deliveryDays: ["Monday", "Sunday"],
//   deliveryMode: "manual",
//   orderType: "once",
//   note: "this is a note to confirm a order. ",
//   deliveryAddress: "Badda, road no. 2, house no. 10",
//   payment: "cash on delivery",
// };
