import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";


const MyQueryCard = ({ query, onDelete }) => {
  const {
    _id,
    productName,
    productBrand,
    productImageUrl,
    queryTitle,
    createdAt,
  } = query;


  // Date formatting
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString()
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={productImageUrl}
          alt={productName}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-medium text-gray-800 font-poppins">{queryTitle}</h2>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Product:</span> {productName} (
          {productBrand})
        </p>

        {/* Created At */}
        <p className="text-xs text-gray-400">Created: {formattedDate}</p>

        {/* Buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to={`/myQueryDetails/${_id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
          >
            <FaEye /> View
          </Link>
          <Link
            to={`/update-query/${_id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-yellow-500 text-white text-sm hover:bg-yellow-600 transition"
          >
            <FaEdit /> Edit
          </Link>
          <button
            onClick={() => onDelete(_id)}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyQueryCard;
