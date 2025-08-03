"use client";

import { steps } from "@/constant/howItWorks.const";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HowItWorks = () => {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const introRef = useRef<HTMLDivElement | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasScrolledPastIntro, setHasScrolledPastIntro] = useState(false);

  useEffect(() => {
    const introObserver = new IntersectionObserver(
      ([entry]) => {
        setHasScrolledPastIntro(!entry.isIntersecting);
      },
      {
        threshold: 1,
      }
    );
    if (introRef.current) {
      introObserver.observe(introRef.current);
    }

    return () => {
      if (introRef.current) {
        introObserver.unobserve(introRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasScrolledPastIntro) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = stepRefs.current.findIndex((el) => el === entry.target);
          if (entry.isIntersecting && index !== -1) {
            setCurrentStep(index);
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [hasScrolledPastIntro]);

  return (
    <section className="md:px-24 px-5 mb-20 space-y-8">
      <div
        ref={introRef}
        className="max-w-4xl mx-auto text-center space-y-4 px-2 md:px-6"
      >
        <h2 className="text-2xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          How Daily Dish Works
        </h2>
        <p className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          A simple 5-step journey to bring fresh, home-style meals to your
          table—without the hassle.
        </p>
      </div>
      <div className="hidden md:flex justify-center gap-24 relative">
        <div className="w-[45vw] h-[500px] sticky top-24 hidden md:block">
          <div className="relative w-full h-full">
            <Image
              src={steps[currentStep].image}
              alt="Step Visual"
              fill
              className="object-cover rounded-xl shadow-xl transition-all duration-500"
            />
          </div>
        </div>

        <div className=" w-[25vw] ">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                stepRefs.current[index] = el as HTMLDivElement | null;
              }}
              className="space-y-4 flex items-start gap-4 w-full pb-48 "
            >
              <h1 className="bg-primary text-white rounded-full w-10 h-10 p-4 flex items-center justify-center font-bold text-lg">
                {index + 1}
              </h1>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:hidden space-y-10 ">
        {steps.map((step, index) => (
          <div key={index} className="space-y-4">
            <Image
              src={step.image}
              alt="Step Visual"
              height={500}
              width={500}
              className="object-cover w-full h-[25vh] rounded-xl shadow-xl transition-all duration-500"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
