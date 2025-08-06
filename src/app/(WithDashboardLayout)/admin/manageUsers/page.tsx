import GetAllUsers from "@/components/modules/dashboard/admin/manageUser/GetAllUsers";
import { getAllUsers } from "@/services/userService";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
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
