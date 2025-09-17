import MyFeedbackComponent from "@/components/modules/dashboard/customer/myFeedback/MyFeedbackComponent";
import { getMyAllFeedbacks } from "@/services/feedbackService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "My Feedbacks - Daily Dish",
  description:
    "The user`s feedback activity is gere . from where he can controlled the feedback edit and delete",
};
const MyFeedbackPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const feedback = await getMyAllFeedbacks(query);
  const { meta, result, totalFeedback } = feedback?.data;
  return (
    <section className=" w-full md:px-10">
      <MyFeedbackComponent
        feedbacks={result}
        meta={meta}
        total={totalFeedback}
      />
    </section>
  );
};

export default MyFeedbackPage;
