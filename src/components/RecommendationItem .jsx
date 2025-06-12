import React from "react";
import { motion } from "framer-motion";

const RecommendationItem = ({ rec, index, onDelete }) => {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 hover:bg-gradient-to-l hover:from-pink-100 hover:via-purple-100 hover:to-yellow-100 transition-colors duration-300"
    >
      <td className="px-3 py-2 md:px-4 md:py-3 text-gray-700 whitespace-nowrap">
        {index + 1}
      </td>
      <td className="px-3 py-2 md:px-4 md:py-3 text-gray-700 font-medium whitespace-normal max-w-xs md:max-w-none">
        {rec.queryTitle}
      </td>
      <td className="px-3 py-2 md:px-4 md:py-3 whitespace-normal max-w-xs md:max-w-none">
        <div className="flex items-center gap-3">
          <img
            src={rec.recommendedProductImage}
            alt={rec.recommendedProductName}
            className="w-14 h-14 object-cover rounded-lg shadow-sm flex-shrink-0"
          />
          <span className="text-gray-800 font-semibold whitespace-normal">
            {rec.recommendedProductName}
          </span>
        </div>
      </td>
      <td className="px-3 py-2 md:px-4 md:py-3 text-gray-600 whitespace-normal max-w-xs md:max-w-none">
        {rec.reason}
      </td>
      <td className="px-3 py-2 md:px-4 md:py-3 whitespace-nowrap">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#ef4444" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(rec._id,rec.queryId)}
          className="btn btn-sm bg-red-500 text-white rounded px-3 py-1 shadow hover:bg-red-600 focus:outline-none"
          aria-label={`Delete recommendation ${rec.queryTitle}`}
        >
          Delete
        </motion.button>
      </td>
    </motion.tr>
  );
};

export default RecommendationItem;
