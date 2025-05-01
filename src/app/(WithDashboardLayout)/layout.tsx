import Sidebar from "@/components/modules/dashboard/sidebar/Sidebar";
import { getMyProfle } from "@/services/profileService";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await getMyProfle();
  return (
    <div className="md:flex bg-gray-200">
      <Sidebar
        name={data?.userdata?.name}
        profileImage={data?.userdata?.profileImage}
        role={data?.user?.role}
      />
      {children}
    </div>
  );
};

export default DashboardLayout;
