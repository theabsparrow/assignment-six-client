"use client";
import { TKitchen } from "@/types/stats.types";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const KitchenStats = ({ data }: { data: TKitchen }) => {
  const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"];

  const categoryDAta = [
    { name: "Commercial", value: data?.totals?.commercialKitchen },
    { name: "Home Based", value: data.totals?.homeKitchen },
  ];

  const hygieneStatsdata = [
    { name: "Hygiene", value: data?.hygieneStatus?.hygiene },
    { name: "Not higiene", value: data?.hygieneStatus?.notHygiene },
  ];

  const activeStatusData = [
    { name: "Active", value: data?.status?.active },
    { name: "Inactive", value: data?.status?.notActive },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between">
      <div className=" w-full flex flex-col items-center">
        <h3 className="font-semibold ">
          Category Status (Commercial/Home-Based)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryDAta}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {categoryDAta.map((entry, index) => (
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
        <h3 className="font-semibold ">Active Status (Yes/No)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={activeStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {activeStatusData.map((entry, index) => (
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
        <h3 className="font-semibold ">Hygiene Status (Yes/No)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={hygieneStatsdata}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {hygieneStatsdata.map((entry, index) => (
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

export default KitchenStats;
