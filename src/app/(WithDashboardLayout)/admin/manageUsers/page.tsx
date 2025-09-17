import GetAllUsers from "@/components/modules/dashboard/admin/manageUser/GetAllUsers";
import { getAllUsers } from "@/services/userService";
import { Metadata } from "next";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export const metadata: Metadata = {
  title: "Users - Daily Dish",
  description:
    "All the users activity is monitored here. admin can keep his eyes here to monitor users activity and ohers things.",
};
const ManageUser = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = await searchParams;
  const { data } = await getAllUsers(query);
  const meta = data?.meta;
  const result = data?.result || [];
  return (
    <section className=" w-full">
      <GetAllUsers meta={meta} result={result} />
    </section>
  );
};

export default ManageUser;
