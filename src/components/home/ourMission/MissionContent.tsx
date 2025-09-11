"use client";

import {
  buttonValue,
  missionOption,
  valueOption,
  visionOption,
} from "@/constant/ourMission.const";
import Image from "next/image";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import MobileResponsive from "./MobileResponsive";

export type TMission = "mission" | "vision" | "value";

const MissionContent = () => {
  const [value, setValue] = useState<TMission>("mission");
  return (
    <section className="space-y-4 w-full">
      <div className="space-y-4">
        <h1 className="text-2xl lg:text-4xl font-semibold">
          Fresh Home Food Delivered At Your Door step
        </h1>
        <p className="text-lg">
          We believe that everyone deserves delicious, wholesome food without
          the hassle of cooking. Our Tiffin service brings you the essence of
          home cooking, using only the freshest ingredients and authentic
          recipes.
        </p>
      </div>

      <div className="hidden md:flex items-center gap-16 text-xl font-semibold">
        {buttonValue.map((item) => (
          <button
            key={item.name}
            onClick={() => setValue(item.value as TMission)}
            className={`${
              item.value === value && " border-b-2"
            }  px-4 py-2 cursor-pointer`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {value === "mission" && (
        <div className="hidden md:flex items-center gap-10">
          <Image
            src="https://i.ibb.co/nNtPx4Yd/mission-image.webp"
            height={1000}
            width={1000}
            alt="customer-image"
            className="w-[17vw] h-[28vh]"
          />
          <div className="space-y-3">
            <h2 className="text-xl ">Quality Ingredients</h2>
            <ul className="space-y-2">
              {missionOption.map((option, i) => (
                <li key={i} className="flex items-center gap-2">
                  {" "}
                  <GiCheckMark className="text-green-600" /> {option.option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {value === "vision" && (
        <div className="hidden md:flex items-center gap-10">
          <Image
            src="https://i.ibb.co/1tdB8Q0g/vission.webp"
            height={1000}
            width={1000}
            alt="customer-image"
            className="w-[17vw] h-[28vh]"
          />
          <div className="space-y-3">
            <h2 className="text-xl ">Quality Ingredients</h2>
            <ul className="space-y-2">
              {visionOption.map((option, i) => (
                <li key={i} className="flex items-center gap-2">
                  {" "}
                  <GiCheckMark className="text-green-600" /> {option.option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {value === "value" && (
        <div className="hidden md:flex items-center gap-10">
          <Image
            src="https://i.ibb.co/9m0Dr9k6/value.webp"
            height={1000}
            width={1000}
            alt="customer-image"
            className="w-[17vw] h-[28vh]"
          />
          <div className="space-y-3">
            <h2 className="text-xl ">Quality Ingredients</h2>
            <ul className="space-y-2">
              {valueOption.map((option, i) => (
                <li key={i} className="flex items-center gap-2">
                  {" "}
                  <GiCheckMark className="text-green-600" /> {option.option}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <MobileResponsive value={value} setValue={setValue} />
      <p className="text-lg">
        Our talented chefs prepare a variety of mouthwatering dishes that cater
        to diverse tastes and dietary needs. From hearty curries and fragrant
        rice.
      </p>
    </section>
  );
};

export default MissionContent;
