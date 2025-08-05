export type TStatus = "active" | "blocked";
export type TSubscriber = {
  _id: string;
  email: string;
  status: TStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
