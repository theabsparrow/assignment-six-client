"use client";
import {
  flavourOptions,
  hygieneOptions,
  serviceOptions,
} from "@/constant/magicSection.const";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import { TMagicSection } from "./KitchenSection";
import { Dispatch, SetStateAction } from "react";

const ForMobile = ({
  value,
  setValue,
}: {
  value: TMagicSection;
  setValue: Dispatch<SetStateAction<TMagicSection>>;
}) => {
  return (
    <div className="md:hidden space-y-4">
      <div className="space-y-3">
        <button
          onClick={() => setValue("service")}
          className={`${
            value === "service" ? " bg-secondary text-primary " : "text-white"
          }  w-full border border-primary text-lg font-medium py-2 cursor-pointer rounded-xl `}
        >
          Our Service
        </button>
        {value === "service" && (
          <div className="flex flex-col md:flex-row md:items-center">
            <Image
              src="https://i.ibb.co/99N3D9Kz/service.webp"
              height={1000}
              width={1000}
              alt="customer-image"
              className="w-[60vw] md:w-[13vw] h-[28vh]  "
            />
            <div className="space-y-3 text-white/70">
              <h2 className="text-xl ">Our Kitchen Services</h2>
              <ul className="space-y-2">
                {serviceOptions.map((option, i) => (
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
          onClick={() => setValue("hygiene")}
          className={`${
            value === "hygiene" ? " bg-secondary text-primary " : "text-white"
          }  w-full border border-primary text-lg font-medium py-2 cursor-pointer rounded-xl`}
        >
          Our Hygiene
        </button>
        {value === "hygiene" && (
          <div className="flex flex-col md:flex-row md:items-center">
            <Image
              src="https://i.ibb.co/B23V328M/hygiene.webp"
              height={1000}
              width={1000}
              alt="customer-image"
              className="w-[60vw] md:w-[13vw] h-[28vh] "
            />
            <div className="space-y-3 text-white">
              <h2 className="text-xl ">Hygiene & Quality Standards</h2>
              <ul className="space-y-2">
                {hygieneOptions.map((option, i) => (
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
          onClick={() => setValue("flavour")}
          className={`${
            value === "flavour" ? " bg-secondary text-primary " : "text-white"
          }  w-full border border-primary text-lg font-medium py-2 cursor-pointer rounded-xl `}
        >
          Our Value
        </button>
        {value === "flavour" && (
          <div className="flex flex-col md:flex-row md:items-center">
            <Image
              src="https://i.ibb.co/f6v5jXm/flavour.webp"
              height={1000}
              width={1000}
              alt="customer-image"
              className="w-[60vw] md:w-[13vw] h-[28vh] "
            />
            <div className="space-y-3 text-white">
              <h2 className="text-xl ">Behind the Flavors</h2>
              <ul className="space-y-2">
                {flavourOptions.map((option, i) => (
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

export default ForMobile;
