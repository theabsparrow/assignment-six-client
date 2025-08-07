import DashboardStats from "@/components/modules/dashboard/admin/dashboardStats/DashboardStats";
import {
  getKitchenStats,
  getSubscriberStats,
  getUSerStats,
} from "@/services/statsService";

const DashboardStatistic = async () => {
  const { data } = await getUSerStats();
  const { data: subscriber } = await getSubscriberStats();
  const { data: kitchen } = await getKitchenStats();

  return (
    <section className=" w-full">
      <DashboardStats data={data} subscriber={subscriber} kitchen={kitchen} />
    </section>
  );
};

export default DashboardStatistic;
