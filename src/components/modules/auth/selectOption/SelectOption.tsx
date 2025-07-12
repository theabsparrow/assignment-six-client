"use client";
import { useEffect, useState } from "react";
import RegisterCustomer from "../register/RegisterCustomer";
import RegisterMealProvider from "../register/RegisterMealProvider";
import SelectOptionComponent from "./SelectOptionComponent";
import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Autoplay, EffectFade } from "swiper/modules";

const SelectOption = () => {
  const [registeredRole, setRegisteredRole] = useState<string | null>(null);
  const [customerActiveBg, setCustomerActiveBg] = useState(
    "/customer-banner-1.PNG"
  );
  const [providerActiveBg, setProviderActiveBg] = useState(
    "/mealProvider-banner-1.PNG"
  );

  const customerImages = [
    "/customer-banner-1.PNG",
    "/customer-banner-2.PNG",
    "/customer-banner-3.PNG",
  ];

  const mealProviderImages = [
    "/mealProvider-banner-1.PNG",
    "/mealProvider-banner-2.PNG",
    "/mealProvider-banner-3.PNG",
  ];

  useEffect(() => {
    const customer = localStorage.getItem("customerForm");
    const mealProvider = localStorage.getItem("mealProviderForm");
    if (customer) {
      setRegisteredRole("customer");
    } else if (mealProvider) {
      setRegisteredRole("mealProvider");
    } else {
      setRegisteredRole("");
    }
  }, []);

  const images =
    registeredRole === "customer" ? customerImages : mealProviderImages;

  if (registeredRole === null) return null;

  return (
    <section className="relative h-screen overflow-hidden">
      <>
        {(registeredRole === "customer" ||
          registeredRole === "mealProvider") && (
          <>
            <Swiper
              spaceBetween={0}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              effect="fade"
              onSlideChange={(swiper) => {
                setCustomerActiveBg(images[swiper.realIndex]);
                setProviderActiveBg(images[swiper.realIndex]);
              }}
              modules={[Autoplay, EffectFade]}
              className="absolute inset-0 z-0"
            >
              {images.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className="w-full h-screen bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute inset-0 bg-black/60  z-10 " />
            {registeredRole === "customer" && (
              <div className="space-y-4 ">
                <div className="flex justify-between items-center font-inter">
                  <Link
                    onClick={() => {
                      localStorage.removeItem("customerForm");
                      localStorage.removeItem("mealProviderForm");
                      localStorage.removeItem("otpExpiry");
                      localStorage.removeItem("verifyOtpForm");
                      setRegisteredRole("");
                    }}
                    href="/"
                    className="cursor-pointer flex items-center gap-1 text-secondary font-Inter md:text-lg font-medium hover:underline duration-500"
                  >
                    <IoHomeOutline className="text-xl" /> Back to home
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("customerForm");
                      localStorage.removeItem("mealProviderForm");
                      localStorage.removeItem("otpExpiry");
                      localStorage.removeItem("verifyOtpForm");
                      setRegisteredRole("");
                    }}
                    className="cursor-pointer"
                  >
                    <FaArrowAltCircleLeft className="text-secondary text-xl" />
                  </button>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary font-playfair">
                  Be a Customer
                </h2>
                <RegisterCustomer setRegisteredRole={setRegisteredRole} />
                <div
                  style={{ backgroundImage: `url(${customerActiveBg})` }}
                  className={`absolute z-20 w-[95%] md:w-[80%] h-[90%] bg-white dark:bg-gray-800 top-[5%] md:top-[5%] left-[2.5%] md:left-[10%] bg-cover bg-center bg-no-repeat p-3 md:px-10 md:py-4 flex justify-center md:justify-start overflow-hidden`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-24 md:gap-0 md:justify-between">
                      <Link
                        onClick={() => {
                          localStorage.removeItem("customerForm");
                          localStorage.removeItem("mealProviderForm");
                          localStorage.removeItem("otpExpiry");
                          localStorage.removeItem("verifyOtpForm");
                          setRegisteredRole("");
                        }}
                        href="/"
                        className="cursor-pointer flex items-center gap-1 text-primary font-Inter md:text-lg font-medium hover:underline duration-500 dark:text-green-600"
                      >
                        <IoHomeOutline className="text-xl" /> Back to home
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("customerForm");
                          localStorage.removeItem("mealProviderForm");
                          localStorage.removeItem("otpExpiry");
                          localStorage.removeItem("verifyOtpForm");
                          setRegisteredRole("");
                        }}
                        className="cursor-pointer "
                      >
                        <FaArrowLeft className="text-primary dark:text-green-600 text-xl" />
                      </button>
                    </div>
                    <h2 className="text-2xl md:text-3xl md:text-center font-bold text-primary dark:text-green-600 font-playfair">
                      Be a Customer
                    </h2>
                    <div className="overflow-y-auto max-h-[75vh] md:max-h-[70vh] pr-2">
                      <RegisterCustomer setRegisteredRole={setRegisteredRole} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {registeredRole === "mealProvider" && (
              <div className="space-y-4 ">
                <div className="flex justify-between items-center font-inter">
                  <Link
                    onClick={() => {
                      localStorage.removeItem("customerForm");
                      localStorage.removeItem("mealProviderForm");
                      localStorage.removeItem("otpExpiry");
                      localStorage.removeItem("verifyOtpForm");
                      setRegisteredRole("");
                    }}
                    href="/"
                    className="cursor-pointer flex items-center gap-1 text-secondary font-Inter md:text-lg font-medium hover:underline duration-500"
                  >
                    <IoHomeOutline className="text-xl" /> Back to home
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("customerForm");
                      localStorage.removeItem("mealProviderForm");
                      localStorage.removeItem("otpExpiry");
                      localStorage.removeItem("verifyOtpForm");
                      setRegisteredRole("");
                    }}
                    className="cursor-pointer"
                  >
                    <FaArrowAltCircleLeft className="text-secondary text-xl" />
                  </button>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary font-playfair">
                  Be a Meal Provider
                </h2>
                <RegisterMealProvider setRegisteredRole={setRegisteredRole} />
                <div
                  style={{ backgroundImage: `url(${providerActiveBg})` }}
                  className={`absolute z-20 w-[95%] md:w-[80%] h-[90%] bg-white dark:bg-gray-800 top-[5%] md:top-[5%] right-[2.5%] md:left-[10%] bg-cover bg-center bg-no-repeat px-3 py-3 md:px-10 md:py-4 flex justify-end md:justify-end overflow-hidden`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-16 md:gap-0 md:justify-between justify-end px-2 md:px-0">
                      <Link
                        onClick={() => {
                          localStorage.removeItem("customerForm");
                          localStorage.removeItem("mealProviderForm");
                          localStorage.removeItem("otpExpiry");
                          localStorage.removeItem("verifyOtpForm");
                          setRegisteredRole("");
                        }}
                        href="/"
                        className="cursor-pointer flex items-center gap-1 text-primary font-Inter md:text-lg font-medium hover:underline duration-500 dark:text-green-600"
                      >
                        <IoHomeOutline className="text-xl" /> Back to home
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("customerForm");
                          localStorage.removeItem("mealProviderForm");
                          localStorage.removeItem("otpExpiry");
                          localStorage.removeItem("verifyOtpForm");
                          setRegisteredRole("");
                        }}
                        className="cursor-pointer"
                      >
                        <FaArrowLeft className="text-primary dark:text-green-600 text-xl" />
                      </button>
                    </div>
                    <h2 className="text-2xl md:text-3xl text-end md:text-center font-bold text-primary dark:text-green-600 font-playfair px-2 md:px-0">
                      Be a Meal Provider
                    </h2>
                    <div className="overflow-y-auto max-h-[75vh] pr-2">
                      <RegisterMealProvider
                        setRegisteredRole={setRegisteredRole}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {!registeredRole && (
          <div
            style={{ backgroundImage: `url('/selection-banner.PNG')` }}
            className="relative h-screen  bg-center bg-cover bg-no-repeat  px-5 md:px-20 py-5 md:py-10 overflow-hidden flex"
          >
            <div className="absolute inset-0 bg-black/60  z-10 " />
            <div className="space-y-4 md:space-y-10">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="cursor-pointer flex items-center gap-1 text-secondary font-Inter md:text-lg font-medium hover:underline duration-500"
                >
                  <IoHomeOutline className="text-xl" /> Back to home
                </Link>
                <Link
                  href="/login"
                  className="cursor-pointer flex items-center gap-1 text-secondary font-Inter md:text-lg font-medium hover:underline duration-500"
                >
                  <IoIosLogIn className="text-xl" /> Back to Login
                </Link>
              </div>
              <h2 className="text-2xl md:text-5xl font-bold text-primary font-playfair">
                Register As
              </h2>
              <SelectOptionComponent setRegisteredRole={setRegisteredRole} />

              <div className="absolute z-20 w-[95%] md:w-[80%] h-[90%] bg-white dark:bg-gray-800 top-[4%] md:top-[5%] left-[3%] md:left-[10%] bg-[url('/selection-banner.PNG')] bg-cover bg-center bg-no-repeat p-6 md:p-10 flex justify-end">
                <div className="space-y-2 md:space-y-10">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="cursor-pointer flex items-center gap-1 text-primary font-Inter md:text-lg font-medium hover:underline duration-500 dark:text-green-600"
                    >
                      <IoHomeOutline className="text-2xl md:text-xl" />{" "}
                      <span className="hidden md:flex ">Back to home</span>{" "}
                      <span className="md:hidden flex">home</span>
                    </Link>
                    <Link
                      href="/login"
                      className="cursor-pointer flex items-center gap-1 text-primary font-Inter md:text-lg font-medium hover:underline duration-500 dark:text-green-600"
                    >
                      <IoIosLogIn className="text-2xl md:text-xl" />{" "}
                      <span className="hidden md:flex "> Back to login</span>{" "}
                      <span className="md:hidden flex"> login</span>
                    </Link>
                  </div>
                  <h2 className="text-2xl md:text-5xl text-end font-bold text-primary font-playfair dark:text-green-600">
                    Register As
                  </h2>
                  <SelectOptionComponent
                    setRegisteredRole={setRegisteredRole}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </section>
  );
};

export default SelectOption;
