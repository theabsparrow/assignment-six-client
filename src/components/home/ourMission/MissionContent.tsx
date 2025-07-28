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

type TMission = "mission" | "vision" | "value";

const MissionContent = () => {
  const [value, setValue] = useState<TMission>("mission");
  return (
    <section className="md:w-[45vw] space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-5xl font-semibold">
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
            className="w-[13vw] h-[28vh] border-8 border-white "
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
            className="w-[13vw] h-[28vh] border-8 border-white "
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
            className="w-[13vw] h-[28vh] border-8 border-white "
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

      <div className="md:hidden space-y-4">
        <div className="space-y-3">
          <button
            onClick={() => setValue("mission")}
            className={`${
              value === "mission" && " bg-secondary text-primary "
            }  w-full border border-primary text-lg font-medium py-2 cursor-pointer rounded-xl`}
          >
            Our Mission
          </button>
          {value === "mission" && (
            <div className="flex flex-col md:flex-row md:items-center">
              <Image
                src="https://i.ibb.co/nNtPx4Yd/mission-image.webp"
                height={1000}
                width={1000}
                alt="customer-image"
                className="w-[60vw] md:w-[13vw] h-[28vh] border-8 border-white "
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
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setValue("vision")}
            className={`${
              value === "vision" && " bg-secondary text-primary "
            }  w-full border border-primary text-lg font-medium py-2 cursor-pointer rounded-xl`}
          >
            Our Vision
          </button>
          {value === "vision" && (
            <div className="flex flex-col md:flex-row md:items-center">
              <Image
                src="https://i.ibb.co/1tdB8Q0g/vission.webp"
                height={1000}
                width={1000}
                alt="customer-image"
                className="w-[60vw] md:w-[13vw] h-[28vh] border-8 border-white "
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
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setValue("value")}
            className={`${
              value === "value" && " bg-secondary text-primary "
            }  w-full border border-primary text-lg font-medium py-2 cursor-pointer rounded-xl`}
          >
            Our Value
          </button>
          {value === "value" && (
            <div className="flex flex-col md:flex-row md:items-center">
              <Image
                src="https://i.ibb.co/9m0Dr9k6/value.webp"
                height={1000}
                width={1000}
                alt="customer-image"
                className="w-[60vw] md:w-[13vw] h-[28vh] border-8 border-white "
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
        </div>
      </div>
      <p className="text-lg">
        Our talented chefs prepare a variety of mouthwatering dishes that cater
        to diverse tastes and dietary needs. From hearty curries and fragrant
        rice.
      </p>
    </section>
  );
};

export default MissionContent;
