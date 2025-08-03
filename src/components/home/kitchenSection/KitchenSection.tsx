"use client";
import {
  flavourOptions,
  hygieneOptions,
  magicTabs,
  serviceOptions,
} from "@/constant/magicSection.const";
import Image from "next/image";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import ForMobile from "./ForMobile";

export type TMagicSection = "service" | "hygiene" | "flavour";
const KitchenSection = () => {
  const [value, setValue] = useState<TMagicSection>("service");
  return (
    <>
      <div className="max-w-4xl mx-auto text-center space-y-4 px-2 md:px-6">
        <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Where the Magic Happens
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          At Daily Dish, every meal begins in a thoughtfully organized kitchen
          where quality, cleanliness, and care come first. While you won’t see
          the kitchen itself, what you will experience is the result of high
          standards behind the scenes.
        </p>
      </div>
      <section className="md:px-24 px-5 mb-20 space-y-8 bg-primary min-h-[70vh] flex flex-col-reverse md:flex-row justify-between">
        <div className="py-10 space-y-4">
          <h1 className="text-2xl md:text-5xl text-white font-medium">
            HomeStyle Tiffins Bringing Family Recipes to You
          </h1>
          <div className="hidden md:flex items-center gap-16 text-xl font-semibold">
            {magicTabs.map((item) => (
              <button
                key={item.name}
                onClick={() => setValue(item.value as TMagicSection)}
                className={`${
                  item.value === value && " border-b-2"
                }  px-4 py-2 cursor-pointer text-white`}
              >
                {item.name}
              </button>
            ))}
          </div>
          {value === "service" && (
            <div className="hidden md:flex items-center gap-4">
              <Image
                src="https://i.ibb.co/99N3D9Kz/service.webp"
                height={1000}
                width={1000}
                alt="customer-image"
                className="w-[13vw] h-[28vh]"
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
          {value === "hygiene" && (
            <div className="hidden md:flex items-center gap-4">
              <Image
                src="https://i.ibb.co/B23V328M/hygiene.webp"
                height={1000}
                width={1000}
                alt="customer-image"
                className="w-[13vw] h-[28vh]"
              />
              <div className="space-y-3 text-white/70">
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
          {value === "flavour" && (
            <div className="hidden md:flex items-center gap-4">
              <Image
                src="https://i.ibb.co/f6v5jXm/flavour.webp"
                height={1000}
                width={1000}
                alt="customer-image"
                className="w-[13vw] h-[28vh]"
              />
              <div className="space-y-3 text-white/70">
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
          <ForMobile value={value} setValue={setValue} />
        </div>
        <div>
          <Image
            src="https://i.ibb.co/cX3z3JNL/cooking.webp"
            alt="magic section"
            height={1000}
            width={1000}
            className="object-cover md:w-[70vw] md:h-[70vh] shadow-xl transition-all duration-500"
          />
        </div>
      </section>
    </>
  );
};

export default KitchenSection;
