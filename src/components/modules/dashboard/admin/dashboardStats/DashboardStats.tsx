"use client";

import {
  TBlogsStats,
  TKitchen,
  TMealStats,
  TOrderStats,
  TShowCharts,
  TSubscribe,
  TUserStats,
} from "@/types/stats.types";
import { useState } from "react";
import UserStats from "./UserStats";
import { statsButtonValues } from "@/constant/stats.const";
import SubscriberStats from "./SubscriberStats";
import { MdOutlineArrowOutward } from "react-icons/md";
import KitchenStats from "./KitchenStats";
import MealStats from "./MealStats";
import BlogStats from "./BlogStats";
import MobileResponsive from "./MobileResponsive";
import OrderStats from "./OrderStats";

export type TDashboardProps = {
  data: TUserStats;
  subscriber: TSubscribe;
  kitchen: TKitchen;
  meal: TMealStats;
  blog: TBlogsStats;
  order: TOrderStats;
};

const DashboardStats = ({
  data,
  subscriber,
  kitchen,
  meal,
  blog,
  order,
}: TDashboardProps) => {
  const [showCharts, setShowCharts] = useState<TShowCharts>("user");

  return (
    <section className="p-4 space-y-10 ">
      <div className="hidden lg:flex items-center gap-6">
        {statsButtonValues.map((value, index) => (
          <div
            key={index}
            onClick={() => setShowCharts(value.name)}
            className={` p-2 rounded-xl cursor-pointer ${
              showCharts === value.name
                ? "bg-primary border border-secondary text-white "
                : "bg-secondary border border-primary text-primary hover:bg-primary hover:border hover:border-secondary hover:text-white duration-500"
            }`}
          >
            {value.name === "user" && (
              <div>
                <p className=" font-bold flex items-center gap-10">
                  {value.label}{" "}
                  <span className="bg-white p-2 rounded-full text-black">
                    {" "}
                    <MdOutlineArrowOutward />
                  </span>
                </p>
                <span className="text-4xl font-bold">
                  {data?.totals?.totalUsers}
                </span>
              </div>
            )}
            {value.name === "subscriber" && (
              <div>
                <p className=" font-bold flex items-center gap-10">
                  {value.label}{" "}
                  <span className="bg-white p-2 rounded-full text-black">
                    {" "}
                    <MdOutlineArrowOutward />
                  </span>
                </p>
                <span className="text-4xl font-bold">
                  {subscriber?.totals?.totalSubscriber}
                </span>
              </div>
            )}
            {value.name === "kitchen" && (
              <div>
                <p className=" font-bold flex items-center gap-10">
                  {value.label}{" "}
                  <span className="bg-white p-2 rounded-full text-black">
                    {" "}
                    <MdOutlineArrowOutward />
                  </span>
                </p>
                <span className="text-4xl font-bold">
                  {kitchen?.totals?.totalKitchen}
                </span>
              </div>
            )}
            {value.name === "meal" && (
              <div>
                <p className=" font-bold flex items-center gap-10">
                  {value.label}{" "}
                  <span className="bg-white p-2 rounded-full text-black">
                    {" "}
                    <MdOutlineArrowOutward />
                  </span>
                </p>
                <span className="text-4xl font-bold">{meal?.total}</span>
              </div>
            )}
            {value.name === "order" && (
              <div>
                <p className=" font-bold flex items-center gap-10">
                  {value.label}{" "}
                  <span className="bg-white p-2 rounded-full text-black">
                    {" "}
                    <MdOutlineArrowOutward />
                  </span>
                </p>
                <span className="text-4xl font-bold">{order?.total}</span>
              </div>
            )}
            {value.name === "blog" && (
              <div>
                <p className=" font-bold flex items-center gap-10">
                  {value.label}{" "}
                  <span className="bg-white p-2 rounded-full text-black">
                    {" "}
                    <MdOutlineArrowOutward />
                  </span>
                </p>
                <span className="text-4xl font-bold">{blog?.total}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="hidden md:flex flex-col">
        {showCharts === "user" && <UserStats data={data} />}
        {showCharts === "subscriber" && <SubscriberStats data={subscriber} />}
        {showCharts === "kitchen" && <KitchenStats data={kitchen} />}
        {showCharts === "meal" && <MealStats data={meal} />}
        {showCharts === "blog" && <BlogStats data={blog} />}
        {showCharts === "order" && <OrderStats data={order} />}
      </div>
      <MobileResponsive
        data={data}
        subscriber={subscriber}
        kitchen={kitchen}
        meal={meal}
        blog={blog}
        order={order}
        showCharts={showCharts}
        setShowCharts={setShowCharts}
      />
    </section>
  );
};

export default DashboardStats;
