import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
        borderColor: "rgba(99, 102, 241, 0.5)",
      }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer shadow-sm"
    >
      <img
        src={productImageUrl}
        alt={productName}
        className="w-full object-cover h-36 sm:h-44 md:h-56"
      />
      <div className="p-4 sm:p-5 flex flex-col">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 line-clamp-2 font-poppins">
          {queryTitle}
        </h2>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-medium">Brand:</span> {productBrand}
        </p>
        <p className="text-gray-500 text-sm mb-3">{productName}</p>

        <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
          <span>{new Date(createdAt).toLocaleDateString()}</span>
          <span className="text-indigo-600 font-semibold">
            👍 {recommendationCount || 0}
          </span>
        </div>

        <Link
          to={`/query/${_id}`}
          className="self-start bg-indigo-600 hover:bg-indigo-700 transition 
                     px-4 py-2 rounded-md text-white font-semibold text-sm
                     sm:px-5 sm:py-2.5"
        >
          View Query
        </Link>
      </div>
    </motion.div>
  );
};

export default RecentQueryCard;
