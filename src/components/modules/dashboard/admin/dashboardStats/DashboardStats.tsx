"use client";

import {
  TKitchen,
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

type TDashboardProps = {
  data: TUserStats;
  subscriber: TSubscribe;
  kitchen: TKitchen;
};

const DashboardStats = ({ data, subscriber, kitchen }: TDashboardProps) => {
  const [showCharts, setShowCharts] = useState<TShowCharts>("user");

  return (
    <section className="p-4 md:p-8 space-y-10 ">
      <div className="hidden md:flex items-center gap-10">
        {statsButtonValues.map((value, index) => (
          <div
            key={index}
            onClick={() => setShowCharts(value.name)}
            className={` p-4  rounded-xl cursor-pointer ${
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
                <span className="text-4xl font-bold">
                  {data?.totals?.totalUsers}
                </span>
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
                <span className="text-4xl font-bold">
                  {data?.totals?.totalUsers}
                </span>
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
                <span className="text-4xl font-bold">
                  {data?.totals?.totalUsers}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      {showCharts === "user" && <UserStats data={data} />}
      {showCharts === "subscriber" && <SubscriberStats data={subscriber} />}
      {showCharts === "kitchen" && <KitchenStats data={kitchen} />}
    </section>
  );
};

export default DashboardStats;
