"use client";

import { TUserStats } from "@/types/stats.types";
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

const UserStats = ({ data }: { data: TUserStats }) => {
  const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"];
  const totalUserBreakdown = [
    { name: "Admins", value: data?.totals?.totalAdmins },
    { name: "Customers", value: data?.totals?.totalCustomers },
    { name: "Meal Providers", value: data?.totals?.totalMealProviders },
  ];

  const activeBlockedData = [
    { name: "Active", value: data?.status?.activeUsers },
    { name: "Blocked", value: data.status.blockedUsers },
  ];

  const verificationData = [
    { name: "Verified", value: data?.verification?.verifiedUsers },
    { name: "Unverified", value: data?.verification?.unverifiedUsers },
  ];
  const providerKitchen = [
    { name: "Has Kitchen", value: data?.providerKitchen?.providerHasKitchen },
    {
      name: "Has no Kitchen",
      value: data?.providerKitchen?.providerHasNoKitchen,
    },
  ];

  const weeklyUsers = data?.newUsersByWeek.map((week) => ({
    week: `Week ${week._id}`,
    users: week.count,
  }));
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-5 md:gap-20">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold md:mb-2">User Role Breakdown</h3>
          <ResponsiveContainer width={350} height={500}>
            <BarChart
              data={totalUserBreakdown}
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

        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold md:mb-2">New Users (Last 4 Weeks)</h3>
          <ResponsiveContainer width={350} height={300}>
            <BarChart
              data={weeklyUsers}
              margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
            >
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-30">
        <div className=" w-full flex flex-col items-center">
          <h3 className="font-semibold ">User Status (Active/Blocked)</h3>
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

        <div className=" w-full flex flex-col items-center">
          <h3 className="font-semibold">Email Verification Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={verificationData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {verificationData.map((entry, index) => (
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
          <h3 className="font-semibold ">Provider Owned Kitchen (Yes/No)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={providerKitchen}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {providerKitchen.map((entry, index) => (
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
    </div>
  );
};

export default UserStats;
