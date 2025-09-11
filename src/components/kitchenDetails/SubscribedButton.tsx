"use cilent";

import {
  beASubscriber,
  removeSubscription,
} from "@/services/kitchenSubscriber";
import { useState } from "react";
import { toast } from "sonner";

const SubscribedButton = ({
  kitchenId,
  subscribed,
}: {
  kitchenId: string;
  subscribed: boolean;
}) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribed);
  const content = subscribed ? "Unsubscribing" : "Subscribing";
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<"Unsubscribing" | "Subscribing">(content);

  const handleSubscribe = async () => {
    const id = kitchenId;
    setLoading(true);
    try {
      const result = await beASubscriber(id);
      if (result?.success) {
        setIsSubscribed(result?.success);
        setLoading(false);
        setValue("Unsubscribing");
      } else {
        toast.error(result?.message, { duration: 3000 });
        setIsSubscribed(result?.success);
        setLoading(false);
        setValue(content);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUnsibscribe = async () => {
    const id = kitchenId;
    setLoading(true);
    try {
      const result = await removeSubscription(id);
      if (result?.success) {
        setIsSubscribed(false);
        setLoading(false);
        setValue("Subscribing");
      } else {
        toast.error(result?.message, { duration: 3000 });
        setIsSubscribed(true);
        setLoading(false);
        setValue(content);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={isSubscribed ? handleUnsibscribe : handleSubscribe}
      disabled={loading}
      className={`
        flex items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm font-medium transition-all cursor-pointer
        ${
          isSubscribed
            ? "bg-secondary text-primary border border-primary hover:bg-primary hover:text-white duration-500"
            : "bg-secondary text-primary border border-primary hover:bg-primary hover:text-white duration-500"
        }
      `}
    >
      {loading ? value : isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscribedButton;
