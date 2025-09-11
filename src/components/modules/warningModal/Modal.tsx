"use client";

import Link from "next/link";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

type TModal = {
  label: string;
};

const Modal = ({ label }: TModal) => {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <div>
        <button
          className="bg-secondary px-2 py-1 rounded-xl text-primary hover:bg-primary hover:text-white border border-primary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-primary dark:hover:text-white duration-500 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {label}
        </button>
      </div>
      {open && (
        <div>
          <div>
            <button
              className="fixed inset-0 bg-black/70 bg-opacity-50 z-40"
              onClick={() => {
                setOpen(false);
              }}
            ></button>
          </div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-100 dark:bg-gray-900 w-[90%] md:w-[30vw] p-6 rounded-xl shadow-lg relative transition-all duration-300">
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 cursor-pointer"
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-semibold text-red-700 mb-2">
                Your account is not verified
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                To proceed your actions you need to verify your email. if you
                don`t verify your email you will not be allowed to do your
                special task
              </p>
              <div className=" mt-6">
                <Link
                  href="/settings"
                  className="bg-secondary px-2 py-1 rounded-xl text-primary hover:bg-primary hover:text-white border border-primary dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-primary dark:hover:text-white duration-500"
                >
                  Verify Email
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Modal;
