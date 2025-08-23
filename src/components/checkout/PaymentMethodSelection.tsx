"use client";

import { orderMethod } from "@/constant/order.const";
import { Dispatch, SetStateAction } from "react";

const PaymentMethodSelection = ({
  payment,
  setPayment,
}: {
  payment: string;
  setPayment: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
        Select Payment Method
      </h3>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {orderMethod.map((method) => (
          <button
            key={method.key}
            type="button"
            onClick={() => setPayment(method.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors cursor-pointer 
                  ${
                    payment === method.key
                      ? "bg-primary text-white border-primary"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white duration-500"
                  }`}
          >
            <method.icon className="w-5 h-5" />
            {method.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelection;
