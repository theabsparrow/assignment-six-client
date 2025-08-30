import { TRating } from "@/types/rating.types";
import { convertDate } from "@/utills/dateConverter";
import { Star } from "lucide-react";
import Image from "next/image";

type FeedbackCardProps = {
  feedbackData: TRating;
  classInfo?: string;
};

const FeedBackcard = ({ feedbackData, classInfo }: FeedbackCardProps) => {
  const date = convertDate(new Date(feedbackData?.createdAt));
  return (
    <div
      className={`w-full px-2 md:px-6 py-3 rounded-2xl shadow-lg border border-primary dark:border-gray-700 transition-colors duration-300 space-y-2 ${
        classInfo ? `${classInfo}` : "max-w-lg mx-auto"
      }`}
    >
      {feedbackData?.userId?.profileImage ? (
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
          <Image
            src={feedbackData?.userId?.profileImage}
            alt={feedbackData?.userId?.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
          <Image
            src="/profile-icon.png"
            alt="user-profile"
            fill
            className="object-cover"
          />
        </div>
      )}

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {feedbackData?.userId?.name}
        </h3>
        <p className=" text-gray-500 dark:text-gray-400 text-sm">
          {date?.creationDate}, {date?.creationTime}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {Array.from({ length: 5 }).map((_, idx) => {
          const starValue = idx + 1;
          return (
            <Star
              key={idx}
              className={`w-8 h-8 ${
                feedbackData?.rating >= starValue
                  ? "fill-primary text-secondary"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          );
        })}
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm">
        {feedbackData?.feedback}
      </p>
    </div>
  );
};

export default FeedBackcard;
