"use client";

import { TMetaDataProps } from "@/types";
import { TRating } from "@/types/rating.types";
import { convertDate } from "@/utills/dateConverter";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Pagination from "../pagination/Pagination";

type TMealDetailsProps = {
  feedbacks: TRating[];
  meta: TMetaDataProps;
};
const ShowAllFeedback = ({ feedbacks, meta }: TMealDetailsProps) => {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <div className="flex justify-center items-center">
        <button
          className={`px-2 py-1 rounded-xl cursor-pointer duration-500 ${
            open
              ? "bg-gray-600 text-white hover:bg-primary hover:text-secondary"
              : "bg-primary text-secondary hover:bg-gray-600 hover:text-white"
          }`}
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide All Feedback" : "Show All Feedback"}
        </button>
      </div>
      {open && (
        <div className="space-y-4">
          <div className="space-y-6">
            {feedbacks.map((feedback) => {
              const date = convertDate(new Date(feedback?.createdAt));
              return (
                <div key={feedback?._id}>
                  {feedback?.userId?.profileImage ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
                      <Image
                        src={feedback?.userId?.profileImage}
                        alt={feedback?.userId?.name}
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
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {feedback?.userId?.name}
                  </h3>
                  <p className=" text-gray-500 dark:text-gray-400 text-sm">
                    {date?.creationDate}, {date?.creationTime}
                  </p>
                  <div className="flex items-center gap-3">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const starValue = idx + 1;
                      return (
                        <Star
                          key={idx}
                          className={`w-8 h-8 ${
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
                </div>
              );
            })}
          </div>
          {feedbacks.length > 0 && <Pagination totalPage={meta?.totalPage} />}
        </div>
      )}
    </section>
  );
};

export default ShowAllFeedback;
