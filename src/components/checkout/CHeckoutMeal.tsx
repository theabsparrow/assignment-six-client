"use client";

import { createOrder } from "@/services/orderService";
import { TMealFormData } from "@/types/mealType";
import { TOrder } from "@/types/orderTypes";
import { useState } from "react";
import { toast } from "sonner";

const paymentMethod = ["online", "cash on delivery"];
export const orderType = ["once", "regular"];

const CHeckoutMeal = ({ checkoutInfo }: { checkoutInfo: TMealFormData }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedOrderType, setSelectedOrderType] = useState(orderType[0]);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethod[1]);
  const [note, setNote] = useState("");
  const [startDate, setStartDate] = useState("");
  const [address, setAddress] = useState("");

  const toggleSelection = (
    item: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleOrderSubmit = async () => {
    const totalPrice = Number(quantity) * Number(checkoutInfo?.price);
    if (!selectedDays.length) {
      toast.error("please select days", { duration: 3000 });
      return;
    }
    if (!selectedTimes.length) {
      toast.error("please select meal time", { duration: 3000 });
      return;
    }
    if (selectedPayment === paymentMethod[0]) {
      toast.error("please select cash on delivery", { duration: 3000 });
      return;
    }
    if (!address) {
      toast.error("please give your full delivery address", {
        duration: 3000,
      });
      return;
    }

    const orderData = {
      quantity,
      price: totalPrice,
      deliveryTime: selectedTimes,
      deliveryDays: selectedDays,
      orderType: selectedOrderType,
      startDate,
      note,
      deliveryAddress: address,
      payment: selectedPayment,
    };
    const id = checkoutInfo?._id;
    try {
      const result = await createOrder(orderData as TOrder, id as string);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
      } else {
        toast.error(result?.message, { duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-2xl rounded-3xl p-10 mt-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-indigo-700">
        Complete Your Order
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Quantity */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={isNaN(quantity) ? "" : quantity}
            onChange={(e) => {
              const value = e.target.value;
              setQuantity(value === "" ? 0 : parseInt(value));
            }}
            className="w-full border border-indigo-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            placeholder="Enter quantity"
          />
        </div>

        {/* Delivery Days */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Select Delivery Days
          </label>
          <div className="flex flex-wrap gap-3">
            {(checkoutInfo?.availableDays || []).map((day: string) => (
              <button
                key={day}
                type="button"
                onClick={() =>
                  toggleSelection(day, selectedDays, setSelectedDays)
                }
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedDays.includes(day)
                    ? "bg-yellow-400 text-white border-yellow-500 shadow-md"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Time */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Select Delivery Times
          </label>
          <div className="flex flex-wrap gap-3">
            {(checkoutInfo?.availableTime || []).map((time: string) => (
              <button
                key={time}
                type="button"
                onClick={() =>
                  toggleSelection(time, selectedTimes, setSelectedTimes)
                }
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedTimes.includes(time)
                    ? "bg-pink-500 text-white border-pink-600 shadow-md"
                    : "bg-pink-100 text-pink-800 hover:bg-pink-200"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Order Type */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Order Type
          </label>
          <select
            value={selectedOrderType}
            onChange={(e) => setSelectedOrderType(e.target.value)}
            className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            {orderType.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-green-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        {/* Delivery Address */}
        <div className="md:col-span-2">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Delivery Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            placeholder="Enter your full delivery address"
            className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Note */}
        <div className="md:col-span-2">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Any additional instructions?"
            className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
        </div>

        {/* Payment Method */}
        <div className="md:col-span-2">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Payment Method
          </label>
          <div className="flex flex-wrap gap-6">
            {paymentMethod.map((method) => (
              <label
                key={method}
                className="flex items-center gap-3 text-gray-700"
              >
                <input
                  type="radio"
                  value={method}
                  checked={selectedPayment === method}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="accent-green-500"
                />
                <span className="text-md">{method}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-10 text-center">
        <button
          onClick={handleOrderSubmit}
          className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CHeckoutMeal;
