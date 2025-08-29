type TuserRating = {
  profileImage?: string;
  name: string;
};

export type TRating = {
  _id: string;
  userId: TuserRating;
  orderId: string;
  rating: number;
  deliveryNumber?: number;
  feedback: string;
  createdAt: string;
};

export type FeedbackFormData = {
  rating: number;
  feedback: string;
  deliveryNumber?: number;
};
