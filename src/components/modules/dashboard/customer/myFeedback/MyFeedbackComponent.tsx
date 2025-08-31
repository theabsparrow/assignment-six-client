import MyFeedBackCard from "@/components/feedback/MyFeedBackCard";
import Pagination from "@/components/pagination/Pagination";
import { TMetaDataProps } from "@/types";
import { TMyRatingFeedback } from "@/types/rating.types";

type TFeedbackComponentProps = {
  feedbacks: TMyRatingFeedback[];
  meta: TMetaDataProps;
  total: number;
};

const MyFeedbackComponent = ({
  feedbacks,
  meta,
  total,
}: TFeedbackComponentProps) => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:from-gray-800 dark:to-gray-700 overflow-hidden  mx-auto px-1 md:px-4 py-4 space-y-4">
      {!(feedbacks as TMyRatingFeedback[])?.length && (
        <div className="flex flex-col items-center justify-center py-10 px-4 ">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            No feedback Available Right Now
          </h1>
        </div>
      )}
      <div>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-1">
          Total Feedbacks:{" "}
          <span className="text-primary font-semibold">{total}</span>
        </p>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium mt-1">
          Feedbacks in this page:{" "}
          <span className="text-primary font-semibold">
            {feedbacks?.length ?? 0}
          </span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feedbacks?.map((feedback) => (
          <MyFeedBackCard key={feedback?._id} feedback={feedback} />
        ))}
      </div>
      {feedbacks.length > 0 && <Pagination totalPage={meta?.totalPage} />}
    </section>
  );
};

export default MyFeedbackComponent;
