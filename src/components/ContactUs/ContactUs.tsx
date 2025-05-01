"use client";

import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-center text-4xl font-extrabold text-white mb-8">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Get In Touch
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Submit Message
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Our Location
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-lg text-gray-800">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>123 Meal Street, Food City, Country</span>
              </div>
              <div className="flex items-center gap-3 text-lg text-gray-800">
                <FaPhoneAlt className="text-blue-500" />
                <span>(+123) 456-7890</span>
              </div>
              <div className="flex items-center gap-3 text-lg text-gray-800">
                <FaEnvelope className="text-blue-500" />
                <span>contact@mealproject.com</span>
              </div>
            </div>

            <div className="w-full h-60 rounded-lg overflow-hidden">
              <iframe
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8347.21376670314!2d90.40919743640603!3d23.787001160343284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e1!3m2!1sen!2sbd!4v1745560422215!5m2!1sen!2sbd"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
