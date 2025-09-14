import { TMyRatingFeedback } from "@/types/rating.types";
import { convertDate } from "@/utills/dateConverter";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FeedBackDropdown from "../statusDropdown/FeedBackDropdown";

const MyFeedBackCard = ({ feedback }: { feedback: TMyRatingFeedback }) => {
  const date = convertDate(new Date(feedback?.createdAt));
  return (
    <div className="max-w-lg mx-auto w-full px-2 md:px-6 py-3 rounded-2xl shadow-lg border border-primary dark:border-gray-700 transition-colors duration-300 space-y-1 relative group">
      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
        <Image
          src={feedback?.mealId?.imageUrl ?? "/profile-icon.png"}
          alt={feedback?.mealId?.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <Link
          href={`/meals/${feedback?.mealId?._id}`}
          className="font-semibold text-primary dark:text-secondary hover:underline"
        >
          {feedback?.mealId?.title}
        </Link>
        <Link
          href={`/user/myOrders/${feedback?.orderId}`}
          className="font-medium text-sm text-primary dark:text-secondary hover:underline"
        >
          View Order
        </Link>
        <p className=" text-gray-500 dark:text-gray-400 text-sm">
          {date?.creationDate}, {date?.creationTime}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, idx) => {
          const starValue = idx + 1;
          return (
            <Star
              key={idx}
              className={`w-6 h-6 ${
                feedback?.rating >= starValue
                  ? "fill-primary text-secondary"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          );
        })}
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm">
        {feedback?.feedback}
      </p>
      <FeedBackDropdown
        id={feedback?._id}
        feedback={feedback?.feedback}
        rating={feedback?.rating}
      />
    </div>
  );
};

export default MyFeedBackCard;
