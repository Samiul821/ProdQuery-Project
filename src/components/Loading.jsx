import React from "react";

const UniqueSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="relative w-20 h-20">
        {/* Outer rotating ring */}
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Middle rotating ring (reverse spin, smaller) */}
        <div className="absolute top-2.5 left-2.5 w-15 h-15 border-4 border-pink-500 border-b-transparent rounded-full animate-spin-reverse"></div>

        {/* Inner rotating ring (normal spin, even smaller) */}
        <div className="absolute top-5 left-5 w-10 h-10 border-4 border-yellow-400 border-l-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default UniqueSpinner;
