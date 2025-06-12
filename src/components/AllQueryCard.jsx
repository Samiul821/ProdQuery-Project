import React from "react";
import { Link } from "react-router-dom";

const AllQueryCard = ({ allQuery }) => {
  const { _id, queryTitle, recommendationCount, productImageUrl, productName } =
    allQuery;

  return (
    <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-48 mb-5 rounded-xl overflow-hidden shadow-md border border-indigo-200">
        <img
          src={productImageUrl}
          alt={productName || "Product Image"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x180?text=No+Image";
          }}
        />
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold text-indigo-900 mb-4 leading-tight line-clamp-2">
        {queryTitle}
      </h3>

      {/* Recommendations and Button */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm font-semibold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full select-none shadow-inner">
          🔥 Recommendations: {recommendationCount || 0}
        </span>

        <Link
          to={`/query/${_id}`}
          className="bg-indigo-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-300 font-semibold"
        >
          Recommend
        </Link>
      </div>
    </div>
  );
};

export default AllQueryCard;
