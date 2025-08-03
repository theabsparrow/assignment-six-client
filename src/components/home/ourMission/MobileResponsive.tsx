"use client";
import Image from "next/image";
import { TMission } from "./MissionContent";
import { Dispatch, SetStateAction } from "react";
import {
  missionOption,
  valueOption,
  visionOption,
} from "@/constant/ourMission.const";
import { GiCheckMark } from "react-icons/gi";

const MobileResponsive = ({
  value,
  setValue,
}: {
  value: TMission;
  setValue: Dispatch<SetStateAction<TMission>>;
}) => {
  return (
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
      </div>
    </div>
  );
};

export default MobileResponsive;
