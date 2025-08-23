"use client";

import {
  TCheckoutPlan,
  Tcheckoutprops,
  TCookingDay,
  TMealTime,
} from "@/types/mealType";
import { checkPlanMatch } from "@/utills/calculatePercentage";
import PercentageComponent from "./PercentageComponent";
import OrderInfoComponent from "./OrderInfoComponent";
import SearchAndSelectArea from "../searchAndSelect/SearchAndSelectArea";
import { dhakaAreas } from "../modules/dashboard/mealProvider/kitchenProfile/kitchen.const";
import { GrPowerReset } from "react-icons/gr";
import SelectDayTime from "./SelectDayTime";
import { TDeliveryMode, TOrderType, TPercentage } from "@/types/orderTypes";
import PaymentMethodSelection from "./PaymentMethodSelection";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import SuccessComponent from "./SuccessComponent";

const CHeckoutMeal = ({ checkoutInfo }: { checkoutInfo: Tcheckoutprops }) => {
  const { isMealExists: meal, personalInfo, result: plans } = checkoutInfo;

  const [quantity, setQuantity] = useState<number>(0);
  const [orderType, setOrderType] = useState<TOrderType | string>("");
  const [deliveryMode, setDeliveryMode] = useState<TDeliveryMode | "">("");
  const [selectedDays, setSelectedDays] = useState<TCookingDay[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<TMealTime[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<TCheckoutPlan | null>(null);
  const [matchResult, setMatchResult] = useState<TPercentage | null>(null);
  const [area, setArea] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [payment, setPayment] = useState<
    "online" | "cash on delivery" | string
  >("");
  const [open, setopen] = useState(false);

  const handleSelectPlan = (planId: string) => {
    const plan: TCheckoutPlan | null =
      plans.find((p) => p._id === planId) || null;
    setSelectedPlan(plan);
    if (plan === null) {
      setSelectedPlan(null);
      return;
    }
    const result = checkPlanMatch(plan, meal);
    setMatchResult(result);
    if (result.isValid) {
      setSelectedDays(plan?.preferredMealDay);
      setSelectedTimes(plan?.preferredMealTime);
    }
  };

  return (
    <>
      {open ? (
        <SuccessComponent
          mealName={meal?.title}
          KitchenName={meal?.kitchen?.kitchenName}
        />
      ) : (
        <section className="bg-gradient-to-br from-green-50 to-yellow-50 shadow-lg rounded-2xl dark:bg-gray-600 overflow-hidden mx-auto px-1 md:px-4 py-4 space-y-4 md:space-y-10 flex flex-col-reverse md:flex-row md:justify-between items-start gap-10 md:gap-30">
          <div className="w-full rounded-xl py-2 md:py-4 px-2 md:px-10 md:border border-primary space-y-2 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex flex-col items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  🛒 Checkout Form
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Please review your details and complete your order.
                </p>
              </div>
              <div>
                <button
                  className="bg-secondary border border-primary text-primary px-2 py-1 rounded-xl font-semibold flex items-center gap-1 cursor-pointer hover:bg-primary hover:text-white duration-500"
                  onClick={() => {
                    setPayment("");
                    setNotes("");
                    setGrandTotal(0);
                    setLocation("");
                    setArea("");
                    setSelectedDays([]);
                    setSelectedTimes([]);
                    setSelectedPlan(null);
                    setMatchResult(null);
                    setQuantity(0);
                    setOrderType("");
                    setDeliveryMode("");
                  }}
                >
                  <GrPowerReset /> Reset Checkout Form
                </button>
              </div>
            </div>

            <div className="space-y-4 flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="space-y-4 w-full md:w-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Order Type
                  </label>
                  <select
                    value={orderType}
                    onChange={(e) => {
                      type TValue = "once" | "regular";
                      const item = e.target.value as TValue;
                      setOrderType(item);
                    }}
                    className="w-full rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="">Select a Order Type</option>
                    {["once", "regular"].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Delivery Mode
                  </label>
                  <select
                    value={deliveryMode}
                    onChange={(e) => {
                      const item = e.target.value as TDeliveryMode;
                      setDeliveryMode(item);
                      if (item === "manual") {
                        setSelectedPlan(null);
                        setMatchResult(null);
                      }
                    }}
                    className="w-full rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-secondary"
                  >
                    <option value="">Select a delivery mode</option>
                    {["manual", "mealPlanner"].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                {deliveryMode === "mealPlanner" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      Select your Plan
                    </label>
                    <select
                      className="w-full rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-secondary"
                      onChange={(e) => handleSelectPlan(e.target.value)}
                    >
                      <option value="">Select a Plan</option>
                      {plans.map((plan) => (
                        <option key={plan?._id} value={plan?._id}>
                          {plan.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <SearchAndSelectArea
                  options={dhakaAreas}
                  value={area}
                  setValue={setArea}
                />
                {area && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      placeholder="road no. house no."
                      onChange={(e) => {
                        const value = e.target.value;
                        setLocation(value);
                      }}
                      name="location"
                      id="location"
                      minLength={2}
                      maxLength={70}
                      className="w-full rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      const total = meal?.price * value;
                      setQuantity(value);
                      setGrandTotal(total);
                    }}
                    name="quantity"
                    id="quantity"
                    className="w-full rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any special instructions or notes for delivery..."
                    minLength={10}
                    maxLength={200}
                    className={`w-full rounded-lg border p-2 mt-1 focus:outline-none focus:ring-2
      ${
        notes.length > 0 && notes.length < 10
          ? "border-red-500 focus:ring-red-500"
          : "dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:ring-secondary"
      }`}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 10 characters, maximum 200 characters.
                  </p>

                  {notes.length > 0 && notes.length < 10 && (
                    <p className="text-xs text-red-500 mt-1">
                      ❌ Please enter at least 10 characters.
                    </p>
                  )}
                </div>

                <PaymentMethodSelection
                  payment={payment}
                  setPayment={setPayment}
                />
              </div>

              <div className="space-y-4">
                {matchResult && selectedPlan && (
                  <PercentageComponent
                    matchResult={matchResult}
                    meal={meal}
                    selectedPlan={selectedPlan}
                  />
                )}
                {deliveryMode === "manual" && (
                  <SelectDayTime
                    meal={meal}
                    selectedDays={selectedDays}
                    selectedTimes={selectedTimes}
                    setSelectedDays={setSelectedDays}
                    setSelectedTimes={setSelectedTimes}
                  />
                )}
              </div>
            </div>

            <ConfirmationModal
              orderType={orderType as TOrderType}
              selectedDays={selectedDays}
              selectedTimes={selectedTimes}
              deliveryMode={deliveryMode as TDeliveryMode}
              area={area}
              location={location}
              quantity={quantity}
              payment={payment as "online" | "cash on delivery"}
              notes={notes}
              verify={personalInfo?.verified}
              id={meal?._id}
              setSuccessopen={setopen}
            />
          </div>

          <OrderInfoComponent
            orderType={orderType as TOrderType}
            selectedDays={selectedDays}
            selectedTimes={selectedTimes}
            deliveryMode={deliveryMode as TDeliveryMode}
            meal={meal}
            personalInfo={personalInfo}
            area={area}
            location={location}
            quantity={quantity}
            grandTotal={grandTotal}
            payment={payment as "online" | "cash on delivery"}
          />
        </section>
      )}
    </>
  );
};

export default CHeckoutMeal;
