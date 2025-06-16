import React from "react";
import { Link } from "react-router-dom";

const AllQueryCard = ({ allQuery }) => {
  const { _id, queryTitle, recommendationCount, productImageUrl, productName } =
    allQuery;

  return (
    <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-3 sm:p-5 flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-36 sm:h-44 md:h-48 mb-4 rounded-xl overflow-hidden shadow-sm border border-indigo-200">
        <img
          src={productImageUrl}
          alt={productName || "Product Image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x180?text=No+Image";
          }}
        />
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg md:text-xl font-semibold text-indigo-900 mb-2 leading-snug line-clamp-2 font-poppins">
        {queryTitle}
      </h3>

      {/* Product Name */}
      <p className="text-xs sm:text-sm text-gray-600 italic mb-3">
        🛍 Product:{" "}
        <span className="font-medium text-indigo-800">{productName}</span>
      </p>

      {/* Recommendations and Button */}
      <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full select-none text-center shadow-inner w-max">
          🔥 Recommendations: {recommendationCount || 0}
        </span>

        <Link
          to={`/query/${_id}`}
          className="bg-indigo-600 text-white px-4 py-2 text-sm rounded-full shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300 text-center"
        >
          Recommend
        </Link>
      </div>
    </div>
  );
};

export default AllQueryCard;
