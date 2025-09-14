import { USER_ROLE } from "@/constant";
import { TUSerRole } from "@/types";
import { TRating } from "@/types/rating.types";
import { convertDate } from "@/utills/dateConverter";
import { Star } from "lucide-react";
import Image from "next/image";
import FeedBackDropdown from "../statusDropdown/FeedBackDropdown";
import DeleteFeedbackModal from "../statusDropdown/DeleteFeedbackModal";
import Link from "next/link";

type FeedbackCardProps = {
  feedbackData: TRating;
  classInfo?: string;
  role?: TUSerRole;
};

const FeedBackcard = ({ feedbackData, classInfo, role }: FeedbackCardProps) => {
  const date = convertDate(new Date(feedbackData?.createdAt));
  return (
    <div
      className={`w-full px-2 md:px-6 py-3 rounded-2xl shadow-lg border border-primary dark:border-gray-700 transition-colors duration-300 space-y-2 relative group ${
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
        {role ? (
          <>
            {(role === USER_ROLE.admin || role === USER_ROLE.superAdmin) && (
              <Link
                href={`/admin/manageUsers/${feedbackData?.userId?._id}`}
                className="text-primary dark:text-secondary font-semibold hover:font-bold duration-500"
              >
                {feedbackData?.userId?.name}
              </Link>
            )}
            {role === USER_ROLE.mealProvider && (
              <Link
                href={`/mealProvider/customer/${feedbackData?.userId?._id}`}
                className="text-primary dark:text-secondary font-semibold hover:font-bold duration-500"
              >
                {feedbackData?.userId?.name}
              </Link>
            )}
            {role === USER_ROLE.customer && (
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {feedbackData?.userId?.name}
              </h3>
            )}
          </>
        ) : (
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {feedbackData?.userId?.name}
          </h3>
        )}

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
      {role && (
        <>
          {role === USER_ROLE.customer ? (
            <FeedBackDropdown
              id={feedbackData?._id}
              feedback={feedbackData?.feedback}
              rating={feedbackData?.rating}
            />
          ) : (
            <DeleteFeedbackModal id={feedbackData?._id} />
          )}
        </>
      )}
    </div>
  );
};

export default FeedBackcard;
