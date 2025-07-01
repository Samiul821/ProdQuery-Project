import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Provider/ThemeContext";

const AllQueryCard = ({ allQuery }) => {
  const { _id, queryTitle, recommendationCount, productImageUrl, productName } =
    allQuery;

  const { isDark } = useContext(ThemeContext);

  return (
    <div
      className={`rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-3 sm:p-5 flex flex-col border ${
        isDark
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-gray-700 text-gray-100"
          : "bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-indigo-200 text-gray-900"
      } min-h-[440px]`} // ✅ Fixed height
    >
      {/* Product Image */}
      <div className="relative w-full h-36 sm:h-44 md:h-48 mb-4 rounded-xl overflow-hidden shadow-sm border border-gray-300">
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
      <h3
        className={`text-base sm:text-lg md:text-xl font-semibold mb-2 leading-snug line-clamp-2 font-poppins ${
          isDark ? "text-white" : "text-indigo-900"
        }`}
      >
        {queryTitle}
      </h3>

      {/* Product Name */}
      <p
        className={`text-xs sm:text-sm italic mb-3 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        🛍 Product:{" "}
        <span
          className={`font-medium ${
            isDark ? "text-indigo-300" : "text-indigo-800"
          }`}
        >
          {productName}
        </span>
      </p>

      {/* Bottom Section Fixed at Bottom */}
      <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span
          className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full select-none text-center shadow-inner w-max ${
            isDark
              ? "bg-gray-700 text-indigo-300"
              : "bg-indigo-100 text-indigo-700"
          }`}
        >
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
