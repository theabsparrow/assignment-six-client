"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { TOrderStatus } from "@/types/orderTypes";
import { steps } from "../customer/myOrders/myOrder.const";

const OrderTracking = ({ status }: { status: TOrderStatus }) => {
  const [open, setOpen] = useState(false);
  const currentIndex = steps.findIndex((s) => s.key === status);
  const safeIndex = Math.max(0, currentIndex);
  const totalSegments = steps.length - 1;
  const percent = Math.round((safeIndex / totalSegments) * 100);

  return (
    <>
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={`px-2 py-1 rounded-xl font-semibold transition-colors duration-300 cursor-pointer 
      ${
        open
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-gray-300 text-gray-800 hover:bg-gray-400"
      }`}
        >
          {open ? "Hide Order Tracking" : "Show Order Tracking"}
        </button>
      </div>

      {open && (
        <div className="w-full flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Order Tracking</h2>
          <div>
            <p className="font-semibold mb-2">
              Delivery Percentage: {percent.toFixed(0)}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>
          <div className="relative w-full max-w-4xl flex items-center">
            <div className="absolute top-1/2 left-0 h-1 w-full bg-primary/40 rounded-full -translate-y-1/2" />
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-primary rounded-full -translate-y-1/2"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.5 }}
            />
            <div className="w-full flex justify-between relative z-10">
              {steps.map((step, idx) => {
                const isActive = idx <= safeIndex;
                const isCurrent = idx === safeIndex;

                return (
                  <div
                    key={step.key}
                    className="flex flex-col items-center w-max"
                  >
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: isCurrent ? 1.1 : isActive ? 1 : 0.95 }}
                      transition={{ duration: 0.25 }}
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                        isActive
                          ? "bg-primary text-white border-secondary shadow-lg"
                          : "bg-white text-primary border-primary"
                      }`}
                    >
                      <step.icon className="w-6 h-6" />
                    </motion.div>
                    <p
                      className={`mt-2 text-sm font-medium ${
                        isActive ? "text-primary" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    {isCurrent && (
                      <span className="mt-1 inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderTracking;
