import {
  TcheckoutMeal,
  TCheckoutPersonInfo,
  TMealDay,
  TMealTime,
} from "@/types/mealType";
import { TDeliveryMode } from "@/types/orderTypes";
import { TbCurrencyTaka } from "react-icons/tb";

type TorderInfoProps = {
  orderType: "once" | "regular";
  selectedDays: TMealDay[];
  selectedTimes: TMealTime[];
  deliveryMode: TDeliveryMode;
  meal: TcheckoutMeal;
  personalInfo: TCheckoutPersonInfo;
  area: string;
  location: string;
  quantity: number;
  grandTotal: number;
  payment: "online" | "cash on delivery";
};

const OrderInfoComponent = ({
  orderType,
  selectedDays,
  selectedTimes,
  deliveryMode,
  meal,
  personalInfo,
  area,
  location,
  quantity,
  grandTotal,
  payment,
}: TorderInfoProps) => {
  return (
    <section className="space-y-4 md:border border-primary p-2 md:p-4 rounded-lg w-full md:w-[30vw]">
      <div className="border-dashed border-b pb-4">
        <p className="text-sm uppercase tracking-wide font-medium text-gray-500 dark:text-gray-400">
          Customer Info
        </p>
        <h1 className=" font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
          Name: <span className="font-normal">{personalInfo?.name}</span>
        </h1>
        <h1 className=" font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
          Email: <span className="font-normal">{personalInfo?.email}</span>
        </h1>
        <h1 className=" font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
          Phone: <span className="font-normal">{personalInfo?.phone}</span>
        </h1>
      </div>

      <div className="border-dashed border-b pb-4">
        <p className="text-sm uppercase tracking-wide font-medium text-gray-500 dark:text-gray-400">
          Kitchen Info
        </p>
        <h1 className="font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
          Name:{" "}
          <span className="font-normal">{meal?.kitchen?.kitchenName}</span>
        </h1>
      </div>

      <div className="border-dashed border-b pb-4">
        <p className="text-sm uppercase tracking-wide font-medium text-gray-500 dark:text-gray-400">
          Meal Info
        </p>
        <h1 className="font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
          Name: <span className="font-normal">{meal?.title}</span>
        </h1>
        <h1 className="font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
          Preference:{" "}
          <span className="font-normal">{meal?.foodPreference}</span>
        </h1>
        <h1 className="font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
          Price:{" "}
          <span className="font-normal flex items-center gap-1">
            <TbCurrencyTaka /> {meal?.price}
          </span>
        </h1>
      </div>

      <div className="border-dashed border-b pb-4 space-y-4">
        <p className=" uppercase tracking-wide font-medium text-gray-500 dark:text-gray-400">
          Delivery Info
        </p>

        {orderType && (
          <h1 className=" font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
            Order Type: <span className="font-normal">{orderType}</span>
          </h1>
        )}
        {deliveryMode && (
          <h1 className=" font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
            Delivery Mode: <span className="font-normal">{deliveryMode}</span>
          </h1>
        )}
        {selectedDays.length > 0 && (
          <div className=" font-semibold text-gray-800 dark:text-gray-100 flex justify-between">
            Days:{" "}
            <p className="flex flex-col items-end">
              {" "}
              {selectedDays.map((day, index) => (
                <span key={index} className="font-normal">
                  {day}
                </span>
              ))}
            </p>
          </div>
        )}
        {selectedTimes.length > 0 && (
          <div className="font-semibold text-gray-800 dark:text-gray-100 flex justify-between">
            Times:{" "}
            <p className="flex flex-col items-end">
              {" "}
              {selectedTimes.map((time, index) => (
                <span key={index} className="font-normal">
                  {time}
                </span>
              ))}
            </p>
          </div>
        )}
        {area && location && (
          <div className=" font-semibold text-gray-800 dark:text-gray-100 flex justify-between ">
            <p> Address</p>
            <h1 className="flex flex-col items-end">
              <span className="font-normal">{location}</span>
              <span className="font-normal">{area}</span>
            </h1>
          </div>
        )}
        {payment && (
          <h1 className=" font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
            Payment Method: <span className="font-normal">{payment}</span>
          </h1>
        )}
        {quantity > 0 && (
          <h1 className=" font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
            Quantity: <span className="font-normal">{quantity}</span>
          </h1>
        )}
        {grandTotal > 0 && (
          <h1 className=" font-semibold text-gray-800 dark:text-gray-100 flex justify-between items-center">
            Total Price: <span className="font-normal">{grandTotal}</span>
          </h1>
        )}
      </div>
    </section>
  );
};

export default OrderInfoComponent;
