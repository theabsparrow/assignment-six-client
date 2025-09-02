"use client";

import { Dispatch, SetStateAction } from "react";
import { TDashboardProps } from "./DashboardStats";
import { TShowCharts } from "@/types/stats.types";
import { MdOutlineArrowOutward } from "react-icons/md";
import UserStats from "./UserStats";
import SubscriberStats from "./SubscriberStats";
import KitchenStats from "./KitchenStats";
import MealStats from "./MealStats";
import BlogStats from "./BlogStats";
import OrderStats from "./OrderStats";

interface TMobileResponsiveStatsProps extends TDashboardProps {
  showCharts: TShowCharts;
  setShowCharts: Dispatch<SetStateAction<TShowCharts>>;
}

const MobileResponsive = ({
  data,
  subscriber,
  kitchen,
  meal,
  blog,
  order,
  showCharts,
  setShowCharts,
}: TMobileResponsiveStatsProps) => {
  return (
    <section className="md:hidden space-y-4">
      <div className="space-y-4">
        <button
          onClick={() => setShowCharts("user")}
          className={` px-2 py-2 rounded-xl cursor-pointer w-full ${
            showCharts === "user"
              ? "bg-primary border border-secondary text-white "
              : "bg-secondary border border-primary text-primary hover:bg-primary hover:border hover:border-secondary hover:text-white duration-500"
          }`}
        >
          <p className=" font-bold flex items-center justify-center gap-5">
            Total User{" "}
            <span className="text-xl font-bold">
              {data?.totals?.totalUsers}
            </span>
            <span className="bg-white p-1 rounded-full text-black">
              {" "}
              <MdOutlineArrowOutward />
            </span>
          </p>
        </button>
        {showCharts === "user" && <UserStats data={data} />}
      </div>
      <div className="space-y-4">
        <button
          onClick={() => setShowCharts("subscriber")}
          className={` px-2 py-2 rounded-xl cursor-pointer w-full ${
            showCharts === "subscriber"
              ? "bg-primary border border-secondary text-white "
              : "bg-secondary border border-primary text-primary hover:bg-primary hover:border hover:border-secondary hover:text-white duration-500"
          }`}
        >
          <p className=" font-bold flex items-center justify-center gap-5">
            Total Subscriber{" "}
            <span className="text-xl font-bold">
              {subscriber?.totals?.totalSubscriber}
            </span>
            <span className="bg-white p-1 rounded-full text-black">
              {" "}
              <MdOutlineArrowOutward />
            </span>
          </p>
        </button>
        {showCharts === "subscriber" && <SubscriberStats data={subscriber} />}
      </div>
      <div className="space-y-4">
        <button
          onClick={() => setShowCharts("kitchen")}
          className={` px-2 py-2 rounded-xl cursor-pointer w-full ${
            showCharts === "kitchen"
              ? "bg-primary border border-secondary text-white "
              : "bg-secondary border border-primary text-primary hover:bg-primary hover:border hover:border-secondary hover:text-white duration-500"
          }`}
        >
          <p className=" font-bold flex items-center justify-center gap-5">
            Total Kitchen{" "}
            <span className="text-xl font-bold">
              {kitchen?.totals?.totalKitchen}
            </span>
            <span className="bg-white p-1 rounded-full text-black">
              {" "}
              <MdOutlineArrowOutward />
            </span>
          </p>
        </button>
        {showCharts === "kitchen" && <KitchenStats data={kitchen} />}
      </div>
      <div className="space-y-4">
        <button
          onClick={() => setShowCharts("meal")}
          className={` px-2 py-2 rounded-xl cursor-pointer w-full ${
            showCharts === "meal"
              ? "bg-primary border border-secondary text-white "
              : "bg-secondary border border-primary text-primary hover:bg-primary hover:border hover:border-secondary hover:text-white duration-500"
          }`}
        >
          <p className=" font-bold flex items-center justify-center gap-5">
            Total Meal <span className="text-xl font-bold">{meal?.total}</span>
            <span className="bg-white p-1 rounded-full text-black">
              {" "}
              <MdOutlineArrowOutward />
            </span>
          </p>
        </button>
        {showCharts === "meal" && <MealStats data={meal} />}
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setShowCharts("order")}
          className={` px-2 py-2 rounded-xl cursor-pointer w-full ${
            showCharts === "order"
              ? "bg-primary border border-secondary text-white "
              : "bg-secondary border border-primary text-primary hover:bg-primary hover:border hover:border-secondary hover:text-white duration-500"
          }`}
        >
          <p className=" font-bold flex items-center justify-center gap-5">
            Total Order{" "}
            <span className="text-xl font-bold">{order?.total}</span>
            <span className="bg-white p-1 rounded-full text-black">
              {" "}
              <MdOutlineArrowOutward />
            </span>
          </p>
        </button>
        {showCharts === "order" && <OrderStats data={order} />}
      </div>
      <div className="space-y-4">
        <button
          onClick={() => setShowCharts("blog")}
          className={` px-2 py-2 rounded-xl cursor-pointer w-full ${
            showCharts === "blog"
              ? "bg-primary border border-secondary text-white "
              : "bg-secondary border border-primary text-primary hover:bg-primary hover:border hover:border-secondary hover:text-white duration-500"
          }`}
        >
          <p className=" font-bold flex items-center justify-center gap-5">
            Total Blog <span className="text-xl font-bold">{blog?.total}</span>
            <span className="bg-white p-1 rounded-full text-black">
              {" "}
              <MdOutlineArrowOutward />
            </span>
          </p>
        </button>
        {showCharts === "blog" && <BlogStats data={blog} />}
      </div>
    </section>
  );
};

export default MobileResponsive;
