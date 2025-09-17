import GetAllOrders from "@/components/modules/dashboard/admin/allOrders/GetAllOrders";
import { getMyOrders } from "@/services/orderService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "Orders - Daily Dish",
  description:
    "All the orders which is active or deliveried or cancelled is here to be controlled and monitored.",
};
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
