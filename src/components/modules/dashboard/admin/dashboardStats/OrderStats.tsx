import { TOrderStats } from "@/types/stats.types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const OrderStats = ({ data }: { data: TOrderStats }) => {
  const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"];
  const topOrders = data?.topOrder.map(
    (order: { deliveredCount: number; mealId: { title: string } }) => ({
      title:
        order?.mealId?.title.length > 25
          ? order?.mealId?.title.slice(0, 25) + "..."
          : order?.mealId?.title,
      delivery: order?.deliveredCount,
    })
  );
  const weeklyOrders = data?.newBlogsByWeek.map((week) => ({
    week: `Week ${week._id}`,
    orders: week.count,
  }));
  const statusBreakDown = [
    { name: "Cancelled", value: data?.status?.cancel },
    { name: "Pending", value: data?.status?.pending },
    { name: "Confirmed", value: data?.status?.confirm },
    { name: "Cooking", value: data?.status?.cooking },
    { name: "ReadyForPickup", value: data?.status?.readyForPickup },
    { name: "OutForDelivery", value: data?.status?.OutForDelivery },
    { name: "Delivered", value: data?.status?.delivered },
  ];
  const typeBreakdown = [
    { name: "once", value: data?.types?.singleOrder },
    { name: "regular", value: data?.types?.regularOrder },
  ];
  const modeBreakdown = [
    { name: "manual", value: data?.types?.manualDelivery },
    { name: "mealPlanner", value: data?.types.planDelivery },
  ];
  const paymentBreakdown = [
    { name: "online", value: data?.types?.onlineDelivery },
    { name: "cash on delivery", value: data?.types.cashOnDelivery },
  ];
  const activityBreakdown = [
    { name: "Active", value: data?.types?.activeOrder },
    { name: "Deactive", value: data?.types.inActiveOrder },
  ];
  return (
    <section className="space-y-10">
      {/* status breakdown */}
      <div className="hidden md:flex flex-col items-start text-xs">
        <h3 className="font-semibold mb-2">Status Breakdown</h3>
        <ResponsiveContainer width={1000} height={500}>
          <BarChart
            data={statusBreakDown}
            margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="lg:hidden flex flex-col items-center text-xs">
        <h3 className="font-semibold md:mb-2">Status Breakdown</h3>
        <ResponsiveContainer width={380} height={500}>
          <BarChart
            data={statusBreakDown}
            margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* top meals by delivery */}
      <div className="hidden lg:flex flex-col items-start text-xs">
        <h3 className="font-semibold">Top Meals by delivery</h3>
        <ResponsiveContainer width={700} height={500}>
          <BarChart
            data={topOrders}
            margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
          >
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="delivery" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="lg:hidden flex flex-col items-center text-xs">
        <h3 className="font-semibold">Top Meals by delivery</h3>
        <ResponsiveContainer width={380} height={500}>
          <BarChart
            data={topOrders}
            margin={{ top: 20, right: 20, left: -20, bottom: 20 }}
          >
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="delivery" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col items-center md:items-start">
        <h3 className="font-semibold md:mb-2">New Meals (Last 4 Weeks)</h3>
        <ResponsiveContainer width={350} height={300}>
          <BarChart
            data={weeklyOrders}
            margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
          >
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="meals" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
        <div className=" w-full flex flex-col items-center">
          <h3 className="font-semibold ">Order Type (Once/regular)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeBreakdown}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {typeBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className=" w-full flex flex-col items-center">
          <h3 className="font-semibold ">Order Mode (Manual/Meal Plan)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={modeBreakdown}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {modeBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
        <div className=" w-full flex flex-col items-center">
          <h3 className="font-semibold ">
            Payment Method (Online/Cash on Delivery)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentBreakdown}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {paymentBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className=" w-full flex flex-col items-center">
          <h3 className="font-semibold ">Order Activity (Active/Deactive)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityBreakdown}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {activityBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default OrderStats;
