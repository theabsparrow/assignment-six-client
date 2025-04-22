import Sidebar from "@/components/modules/dashboard/sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-gray-200">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
