import React, { useContext } from "react";
import { ThemeContext } from "../Provider/ThemeContext";

const UniqueSpinner = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 transition-colors duration-300 ${
        isDark ? "bg-black/80" : "bg-white/80"
      }`}
    >
      <div className="relative w-20 h-20">
        {/* Outer rotating ring */}
        <div
          className={`absolute top-0 left-0 w-20 h-20 border-4 rounded-full animate-spin ${
            isDark
              ? "border-indigo-400 border-t-transparent"
              : "border-indigo-500 border-t-transparent"
          }`}
        ></div>

        {/* Middle rotating ring (reverse spin, smaller) */}
        <div
          className={`absolute top-2.5 left-2.5 w-[60px] h-[60px] border-4 rounded-full animate-spin-reverse ${
            isDark
              ? "border-pink-400 border-b-transparent"
              : "border-pink-500 border-b-transparent"
          }`}
        ></div>

        {/* Inner rotating ring (normal spin, even smaller) */}
        <div
          className={`absolute top-5 left-5 w-10 h-10 border-4 rounded-full animate-spin ${
            isDark
              ? "border-yellow-300 border-l-transparent"
              : "border-yellow-400 border-l-transparent"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default UniqueSpinner;
