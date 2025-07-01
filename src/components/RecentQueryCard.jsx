import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Provider/ThemeContext";

const RecentQueryCard = ({ query }) => {
  const {
    productName,
    productBrand,
    productImageUrl,
    queryTitle,
    createdAt,
    recommendationCount,
    _id,
  } = query;

  const { isDark } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        boxShadow: isDark
          ? "0 10px 25px rgba(99, 102, 241, 0.6)"
          : "0 10px 25px rgba(99, 102, 241, 0.3)",
        borderColor: "rgba(99, 102, 241, 0.5)",
      }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl overflow-hidden cursor-pointer shadow-sm border ${
        isDark
          ? "bg-gray-800 border-gray-700 text-gray-300"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <img
        src={productImageUrl}
        alt={productName}
        className="w-full object-cover aspect-[16/9]"
      />
      <div className="p-4 sm:p-5 flex flex-col">
        <h2
          className={`text-lg sm:text-xl font-semibold mb-1 line-clamp-2 font-poppins ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {queryTitle}
        </h2>
        <p
          className={`text-sm mb-1 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <span className="font-medium">Brand:</span> {productBrand}
        </p>
        <p
          className={`text-sm mb-3 ${
            isDark ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {productName}
        </p>

        <div
          className={`flex justify-between items-center text-xs mb-4 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span>{new Date(createdAt).toLocaleDateString()}</span>
          <span className="text-indigo-500 font-semibold">
            👍 {recommendationCount || 0}
          </span>
        </div>

        <Link
          to={`/query/${_id}`}
          className="self-start bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-md text-white font-semibold text-sm sm:px-5 sm:py-2.5"
        >
          View Query
        </Link>
      </div>
    </motion.div>
  );
};

export default RecentQueryCard;
