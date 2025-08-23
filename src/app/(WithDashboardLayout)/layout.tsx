import Sidebar from "@/components/modules/dashboard/sidebar/Sidebar";
import { getCurrentUser } from "@/services/authService";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userRole } = await getCurrentUser();

  return (
    <div className="md:flex md:bg-gray-200">
      <Sidebar role={userRole} />
      {children}
    </div>
  );
};

export default DashboardLayout;
