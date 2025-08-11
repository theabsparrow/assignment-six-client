"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import coverImage from "../../app/assets/about us.png";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      <section className="relative h-[60vh] flex items-center justify-center text-center px-4">
        <Image
          src={coverImage}
          alt="About Us"
          fill
          className="object-cover brightness-50"
        />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-white mt-4 max-w-xl mx-auto">
            We`re passionate about bringing people together through great food
            and exceptional service.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-primary dark:text-secondary"
        >
          Our Mission
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-primary dark:text-secondary text-lg leading-relaxed"
        >
          To revolutionize how people experience food by connecting them with
          diverse, quality kitchens and unforgettable culinary moments — all in
          one place.
        </motion.p>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Quality First",
              desc: "We ensure top-tier standards in every kitchen and every bite.",
              icon: "🥇",
            },
            {
              title: "Diversity & Inclusion",
              desc: "Celebrating culture through culinary variety from all backgrounds.",
              icon: "🌍",
            },
            {
              title: "Customer-Centric",
              desc: "Our users are the heart of everything we do.",
              icon: "💖",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-tr from-purple-100 via-indigo-100 to-pink-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-md"
            >
              <div className="text-4xl mb-3">{value.icon}</div>
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-secondary to-gray-400 text-center">
        <div className="max-w-2xl mx-auto space-y-6 px-4">
          <h2 className="text-3xl md:text-4xl font-bold">Join Our Journey</h2>
          <p className="text-lg">
            Whether you`re a kitchen owner, food lover, or just exploring —
            there`s a place for you in our community.
          </p>
          <Link
            href="/meals"
            className="bg-secondary border border-primary text-primary hover:bg-primary hover:text-white transition font-medium px-3 py-2 rounded-full shadow-lg duration-500"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
