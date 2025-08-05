import GetAllMeals from "@/components/modules/dashboard/admin/manageMeals/GetAllMeals";
import { getAllMealList } from "@/services/mealService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ManageMealPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getAllMealList(query);
  const meta = data?.meta;
  const result = data?.result;
  return (
    <section className=" w-full">
      <GetAllMeals meta={meta} result={result} />
    </section>
  );
};

export default ManageMealPage;
