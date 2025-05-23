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
    <>
      {open ? (
        <div>
          <div>
            <button
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => {
                setOpen(false);
              }}
            ></button>
          </div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-100 dark:bg-gray-900 w-[90%] md:w-[35vw] p-6 rounded-xl shadow-lg relative transition-all duration-300">
              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 cursor-pointer"
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
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
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                >
                  Verify Email
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {label && (
            <div>
              <button
                className="bg-purple-500 px-2 py-1 rounded-xl text-white hover:bg-indigo-800 dark:bg-gray-500 duration-500 cursor-pointer"
                onClick={() => setOpen(true)}
              >
                {label}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Modal;
