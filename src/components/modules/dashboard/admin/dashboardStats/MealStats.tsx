"use client";

import { TMealStats } from "@/types/stats.types";
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

const MealStats = ({ data }: { data: TMealStats }) => {
  const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#F44336"];
  const cuisineBreakDown = [
    { name: "Bengali", value: data?.cuisine?.Bengali },
    { name: "Indian", value: data?.cuisine?.IndianMeal },
    { name: "Chinese", value: data?.cuisine?.ChineseMeal },
    { name: "Continent", value: data?.cuisine?.ContinentalMeal },
    { name: "Italian", value: data?.cuisine?.ItalianMeal },
    { name: "Thai", value: data?.cuisine?.ThaiMeal },
    { name: "USA", value: data?.cuisine?.AmericanMeal },
    { name: "Mediterian", value: data?.cuisine?.MediterraneanMeal },
    { name: "Mexican", value: data?.cuisine?.MexicanMeal },
    { name: "Turkish", value: data?.cuisine?.TurkishMeal },
    { name: "Persian", value: data?.cuisine?.PersianMeal },
    { name: "Spanish", value: data?.cuisine?.SpanishMeal },
    { name: "French", value: data?.cuisine?.FrenchMeal },
    { name: "Japanese", value: data?.cuisine?.JapaneseMeal },
    { name: "Korean", value: data?.cuisine?.KoreanMeal },
  ];
  const categoryBreakDown = [
    { name: "Breakfast", value: data?.category?.breakFastMeal },
    { name: "Lunch", value: data?.category?.lunchMeal },
    { name: "Dinner", value: data?.category?.dinnerMeal },
    { name: "Snack", value: data?.category?.snackMeal },
  ];
  const preferenceBreakDown = [
    { name: "Mixed", value: data?.preference?.mixedFood },
    { name: "Veg", value: data?.preference?.vegFood },
    { name: "Non-veg", value: data?.preference?.nonVegFood },
  ];
  const sizeBreakDown = [
    { name: "Small", value: data?.size?.smallSize },
    { name: "Medium", value: data?.size?.mediumSize },
    { name: "Large", value: data?.size?.largeSize },
  ];
  const statusBreakDown = [
    { name: "Available", value: data?.status?.available },
    { name: "Not Available", value: data?.status?.notAvailable },
  ];
  const priceBreakDown = [
    {
      name: data?.price?.highestPriceMeal?.title,
      value: data?.price?.highestPriceMeal?.price,
    },
    {
      name: data?.price?.lowestPriceMeal?.title,
      value: data?.price?.lowestPriceMeal?.price,
    },
  ];
  const weeklyMeals = data?.newMealsByWeek.map((week) => ({
    week: `Week ${week._id}`,
    meals: week.count,
  }));
  return (
    <section className="space-y-10">
      <div className="hidden md:flex flex-col md:items-start">
        <h3 className="font-semibold mb-2">Cuisine Breakdown</h3>
        <ResponsiveContainer width={1200} height={500}>
          <BarChart
            data={cuisineBreakDown}
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
      <div className="md:hidden flex flex-col items-center md:items-start">
        <h3 className="font-semibold md:mb-2">Cuisine Breakdown</h3>
        <ResponsiveContainer width={380} height={500}>
          <BarChart
            data={cuisineBreakDown}
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

      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-10 md:gap-0">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold md:mb-2">Category Breakdown</h3>
          <ResponsiveContainer width={350} height={500}>
            <BarChart
              data={categoryBreakDown}
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
          <h3 className="font-semibold md:mb-2">Preference Breakdown</h3>
          <ResponsiveContainer width={350} height={500}>
            <BarChart
              data={preferenceBreakDown}
              margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
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
          <h3 className="font-semibold mb-2">Size Breakdown</h3>
          <ResponsiveContainer width={350} height={500}>
            <BarChart
              data={sizeBreakDown}
              margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-30">
        <div className=" w-full flex flex-col items-center">
          <h3 className="font-semibold ">Price (Higest/Lowest)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priceBreakDown}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {priceBreakDown.map((entry, index) => (
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
          <h3 className="font-semibold ">
            Availablity (available/not-available)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusBreakDown}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {statusBreakDown.map((entry, index) => (
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
      <div className="flex flex-col items-center md:items-start">
        <h3 className="font-semibold md:mb-2">New Meals (Last 4 Weeks)</h3>
        <ResponsiveContainer width={350} height={300}>
          <BarChart
            data={weeklyMeals}
            margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
          >
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="meals" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default MealStats;
