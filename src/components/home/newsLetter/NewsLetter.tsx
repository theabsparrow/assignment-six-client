"use client";

import { useState } from "react";
import { toast } from "sonner";

const NewsLetter = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("subscribed successfully", { duration: 3000 });
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
          className="flex flex-col sm:flex-row items-center justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-80 px-4 py-2 rounded-l-xl border border-primary bg-gray outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={email === ""}
            className="w-full sm:w-auto px-6 py-2 rounded-r-xl bg-green-600 dark:bg-secondary dark:text-primary hover:bg-green-700 text-white font-semibold shadow cursor-pointer border border-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-3">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsLetter;
