import DashboardStats from "@/components/modules/dashboard/admin/dashboardStats/DashboardStats";
import {
  getBlogStats,
  getKitchenStats,
  getMealStats,
  getOrderStats,
  getSubscriberStats,
  getUSerStats,
} from "@/services/statsService";

const DashboardStatistic = async () => {
  const { data } = await getUSerStats();
  const { data: subscriber } = await getSubscriberStats();
  const { data: kitchen } = await getKitchenStats();
  const { data: meal } = await getMealStats();
  const { data: blog } = await getBlogStats();
  const { data: order } = await getOrderStats();

  return (
    <section className=" w-full">
      <DashboardStats
        data={data}
        subscriber={subscriber}
        kitchen={kitchen}
        meal={meal}
        blog={blog}
        order={order}
      />
    </section>
  );
};

export default DashboardStatistic;
