"use cient";

import { TSubscribe } from "@/types/stats.types";
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
} from "recharts";

const SubscriberStats = ({ data }: { data: TSubscribe }) => {
  const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"];

  const activeBlockedData = [
    { name: "Active", value: data?.totals?.totalActive },
    { name: "Blocked", value: data.totals.totalBlocked },
  ];
  const weeklyUsers = data?.newUsersByWeek.map((week) => ({
    week: `Week ${week._id}`,
    subscribers: week.count,
  }));
  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between">
      <div>
        <h3 className="font-semibold mb-2">New Subscriber (Last 4 Weeks)</h3>
        <ResponsiveContainer width={400} height={300}>
          <BarChart data={weeklyUsers}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="subscribers" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className=" w-full flex flex-col items-center">
        <h3 className="font-semibold ">Subscriber Status (Active/Blocked)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={activeBlockedData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {activeBlockedData.map((entry, index) => (
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
  );
};

export default SubscriberStats;
