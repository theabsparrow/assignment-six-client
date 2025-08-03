"use client";

import { subscribe } from "@/services/newsLetterService";
import { useState } from "react";
import { toast } from "sonner";

const NewsLetter = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("please provide a valid email");
      return;
    }
    const data = {
      email,
    };
    const toastId = toast.loading("subscribing with your email...");
    try {
      const result = await subscribe(data);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        (e.target as HTMLFormElement).reset();
        setEmail("");
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="w-full md:px-24 px-5 py-10  space-y-10 bg-secondary dark:bg-gray-900">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold  mb-2">
          Subscribe to Our Newsletter
        </h2>
        <p className=" mb-6">
          Get the latest recipes, trending meals, and exclusive offers delivered
          right to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-xl border border-primary bg-gray outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={email === ""}
              className=" px-1 md:px-3 py-2 rounded-r-xl bg-green-600 dark:bg-secondary dark:text-primary hover:bg-green-700 text-white font-semibold shadow cursor-pointer border border-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Subscribe
            </button>
          </div>
        </form>

        <p className="text-xs  mt-3">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsLetter;
