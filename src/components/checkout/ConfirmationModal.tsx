"use client";

import { TCookingDay, TMealTime } from "@/types/mealType";
import { TConfirmModal, TDeliveryMode } from "@/types/orderTypes";
import { useState } from "react";
import { toast } from "sonner";
import { confirmModal } from "./checkout.const";
import { createOrder } from "@/services/orderService";

type TConfirmModalProps = {
  quantity: number;
  orderType: "once" | "regular";
  deliveryMode: TDeliveryMode;
  selectedDays: TCookingDay[];
  selectedTimes: TMealTime[];
  area: string;
  location: string;
  payment: "online" | "cash on delivery";
  notes?: string;
  verify: boolean;
  id: string;
};

const ConfirmationModal = ({
  orderType,
  selectedDays,
  selectedTimes,
  deliveryMode,
  area,
  location,
  quantity,
  payment,
  notes,
  verify,
  id,
}: TConfirmModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderdata] = useState<TConfirmModal>(confirmModal);

  const handleOpenModal = () => {
    if (!verify) {
      toast.error("You need to verify your email at first", { duration: 3000 });
      return;
    }
    const deliveryAddress: string = `${area}, ${location}`;
    if (
      quantity < 1 ||
      !orderType ||
      !deliveryMode ||
      selectedDays.length < 1 ||
      selectedTimes.length < 1 ||
      !deliveryAddress ||
      !payment
    ) {
      toast.error("please provide all the information to confirm the order", {
        duration: 3000,
      });
      return;
    } else {
      if (!notes) {
        setOrderdata({
          quantity: quantity,
          deliveryTime: selectedTimes,
          deliveryDays: selectedDays,
          deliveryMode: deliveryMode,
          orderType: orderType,
          deliveryAddress: deliveryAddress,
          payment: payment,
        });
      } else {
        setOrderdata({
          quantity: quantity,
          deliveryTime: selectedTimes,
          deliveryDays: selectedDays,
          deliveryMode: deliveryMode,
          orderType: orderType,
          deliveryAddress: deliveryAddress,
          payment: payment,
          note: notes,
        });
      }
      setOpen(true);
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    if (!verify) {
      toast.error("You need to verify your email at first", { duration: 3000 });
      return;
    }
    if (!orderData) {
      toast.error("falid to confirm the order", { duration: 3000 });
      setLoading(false);
      return;
    }
    try {
      const result = await createOrder(orderData, id);
      if (result?.success) {
        toast.success(result?.message, { duration: 3000 });
        setOpen(false);
        setLoading(false);
      } else {
        toast.error(result?.message, { duration: 3000 });
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={handleOpenModal}
          className="bg-secondary font-bold border border-primary text-primary px-2 py-1 rounded-lg cursor-pointer hover:bg-primary hover:text-secondary duration-500"
        >
          Order Now
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-primary p-6 sm:p-8">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
              Confirm Your Order
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
              Please review your order details before confirming.
            </p>

            {/* Order Details */}
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Order Type:
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {orderType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Delivery Mode:
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {deliveryMode}
                </span>
              </div>
              <div className="flex justify-between">
                <h1 className="font-medium text-gray-700 dark:text-gray-300">
                  Selected Day:
                </h1>
                <p className="flex items-center gap-2">
                  {selectedDays.map((day, index) => (
                    <span
                      key={index}
                      className="text-gray-900 dark:text-gray-100"
                    >
                      {day}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-medium text-gray-700 dark:text-gray-300">
                  Selected Time:
                </h1>
                <p className="flex items-center gap-2">
                  {selectedTimes.map((time, index) => (
                    <span
                      key={index}
                      className="text-gray-900 dark:text-gray-100"
                    >
                      {time}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex justify-between">
                <h1 className="font-medium text-gray-700 dark:text-gray-300">
                  Address:
                </h1>
                <p className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span> {location}</span> <span> {area}</span>
                </p>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Quantity:
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {quantity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Payment:
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {payment}
                </span>
              </div>
              {notes && (
                <div className="flex justify-between">
                  <h1 className="font-medium text-gray-700 dark:text-gray-300">
                    Note:
                  </h1>
                  <p className="text-gray-900 dark:text-gray-100 w-[22vw] text-right">
                    <span className="flex justify-center"> {notes}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="px-5 py-2 rounded-lg border text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={loading}
              >
                {loading ? "Confirming..." : "Yes, Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
