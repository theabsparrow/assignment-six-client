import GetAllOrders from "@/components/modules/dashboard/admin/allOrders/GetAllOrders";
import { getMyOrders } from "@/services/orderService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const AllOrderPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
  const { data } = await getMyOrders(query);
  const { meta, result } = data;
  return (
    <div className=" w-full">
      <GetAllOrders meta={meta} allOrders={result} />
    </div>
  );
};

export default AllOrderPage;
