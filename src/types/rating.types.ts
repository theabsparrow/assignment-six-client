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

export type TMyRatingFeedback = {
  _id: string;
  orderId: string;
  mealId: {
    _id: string;
    imageUrl: string;
    title: string;
  };
  rating: number;
  feedback: string;
  createdAt: string;
};
