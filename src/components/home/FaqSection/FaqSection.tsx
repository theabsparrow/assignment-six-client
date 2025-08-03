"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggle = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  const faqs = [
    {
      question: "What is Daily Dish?",
      answer:
        "Daily Dish is a modern web platform designed to help users discover diverse and curated meal recipes. It features trending dishes, ingredient-based search, and personalized food recommendations tailored to your taste.",
    },
    {
      question: "Is there a cost to using Daily Dish?",
      answer:
        "No, Daily Dish is entirely free to use. Users can browse recipes, view trending meals, and explore content without any subscription or payment requirements.",
    },
    {
      question: "How does Daily Dish determine trending meals?",
      answer:
        "Trending meals are identified based on real-time user search behavior and keyword frequency. The system dynamically updates the list to showcase the most popular and in-demand dishes at any given time.",
    },
    {
      question: "Can I save or bookmark meals I like?",
      answer:
        "Meal saving and bookmarking features are currently in development. Once available, users will be able to create personal collections and revisit their favorite dishes with ease.",
    },
    {
      question: "Do I need to create an account to use Daily Dish?",
      answer:
        "No account is required to explore meals or search recipes. However, registering an account in the future will unlock personalized features like saved meals, tailored suggestions, and subscription preferences.",
    },
  ];
  return (
    <section className="w-full md:px-24 px-5 py-10  space-y-10 ">
      <div className="md:hidden max-w-4xl mx-auto text-center space-y-4 px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className=" font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          From how our platform works to what features you can explore — we`ve
          answered the most common questions to help you get the best out of
          your food journey.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <Image
            src="https://i.ibb.co/RRP1q4F/faq-banner.webp"
            alt="faq image"
            height={700}
            width={700}
            className="w-full md:h-[90vh]"
          />
        </div>
        <div className="space-y-6 ">
          <div className="hidden md:flex flex-col max-w-4xl mx-auto text-center space-y-4 px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
              From how our platform works to what features you can explore —
              we`ve answered the most common questions to help you get the best
              out of your food journey.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Everything you need to know about Daily Dish.
            </h2>
            <div className="md:w-[45vw] mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl shadow-sm"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left text-gray-800 font-medium text-lg hover:bg-gray-50 focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <FaChevronDown
                      className={`transform transition-transform duration-300 ${
                        activeIndex === index ? "rotate-180 text-green-600" : ""
                      }`}
                    />
                  </button>
                  {activeIndex === index && (
                    <div className="px-5 pb-4 text-gray-600">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
