"use cilent";

import {
  beASubscriber,
  isKitchenSubscribed,
  removeSubscription,
} from "@/services/kitchenSubscriber";
import { Loader2 } from "lucide-react";
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
    <button
      onClick={
        loading ? undefined : isSubscribed ? handleUnsibscribe : handleSubscribe
      }
      disabled={loading}
      className={`
        flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer
        ${
          isSubscribed
            ? "bg-primary text-white hover:bg-primary/90"
            : "bg-secondary text-primary border border-primary hover:bg-primary hover:text-white"
        }
        ${loading ? "opacity-70 cursor-not-allowed" : ""}
      `}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? "Please wait..." : isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscribedButton;
