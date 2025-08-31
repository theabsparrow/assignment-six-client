import MyFeedbackComponent from "@/components/modules/dashboard/customer/myFeedback/MyFeedbackComponent";
import { getMyAllFeedbacks } from "@/services/feedbackService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const MyFeedbackPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getMyAllFeedbacks(query);
  const { meta, result, totalFeedback } = data;
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
