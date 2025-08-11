"use cilent";

import {
  beASubscriber,
  isKitchenSubscribed,
  removeSubscription,
} from "@/services/kitchenSubscriber";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SubscribedButton = ({ kitchenId }: { kitchenId: string }) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const result = async () => {
      setLoading(true);
      try {
        const res = await isKitchenSubscribed(kitchenId);
        setIsSubscribed(res?.success);
      } catch {
        setIsSubscribed(false);
      } finally {
        setLoading(false);
      }
    };
    result();
  }, [kitchenId]);

  const handleSubscribe = async () => {
    const id = kitchenId;
    setLoading(true);
    try {
      const result = await beASubscriber(id);
      if (result?.success) {
        setIsSubscribed(result?.success);
        setLoading(false);
      } else {
        toast.error(result?.message, { duration: 3000 });
        setIsSubscribed(result?.success);
        setLoading(false);
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
      } else {
        toast.error(result?.message, { duration: 3000 });
        setIsSubscribed(true);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
        <button className="bg-secondary text-primary border border-primary py-1 px-2 rounded-lg hover:bg-primary hover:text-white duration-500 font-medium cursor-pointer">
          loading...
        </button>
      ) : isSubscribed ? (
        <button
          onClick={handleUnsibscribe}
          className="bg-primary text-white border border-secondary py-1 px-2 rounded-lg font-medium cursor-pointer"
        >
          Unsubscribe
        </button>
      ) : (
        <button
          onClick={handleSubscribe}
          className="bg-secondary text-primary border border-primary py-1 px-2 rounded-lg hover:bg-primary hover:text-white duration-500 font-medium cursor-pointer"
        >
          Subscribe
        </button>
      )}
    </div>
  );
};

export default SubscribedButton;
