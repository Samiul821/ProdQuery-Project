import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaUserTie,
  FaEnvelope,
  FaCheckCircle,
  FaCalendarAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../Provider/ThemeContext";

const MyQueryDetails = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const {
    productName,
    productBrand,
    productImageUrl,
    queryTitle,
    boycottReason,
    profileImage,
    recommendationCount,
    createdAt,
    hr_email,
    hr_name,
  } = useLoaderData();

  return (
    <div
      className={`min-h-screen py-12 px-[4%] lg:px-[10%] transition duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 text-gray-800"
      }`}
    >
      <Helmet>
        <title>My Query Details | ProdQuery</title>
      </Helmet>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-md transition ${
          isDark
            ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:brightness-110"
            : "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white hover:brightness-110"
        }`}
      >
        <FaArrowLeft /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`max-w-5xl mx-auto p-8 rounded-3xl shadow-lg border transition-all duration-300 ${
          isDark
            ? "bg-gray-800 border-gray-700"
            : "bg-gradient-to-tr from-purple-50 via-pink-50 to-yellow-50 border-gray-200"
        }`}
      >
        {/* Title */}
        <h2
          className={`text-3xl font-bold text-center mb-10 tracking-wide font-poppins ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          🔍 Product Query Details
        </h2>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-6 mb-10"
        >
          <img
            src={productImageUrl}
            alt={productName}
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl shadow-md border border-gray-300"
          />
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold font-poppins">
              {productName}
            </h3>
            <p className="mt-1 text-lg text-gray-400">Brand: {productBrand}</p>
          </div>
        </motion.div>

        {/* Query Title */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-1">Query Title</h4>
          <p className="text-lg">{queryTitle}</p>
        </div>

        {/* Boycott Reason */}
        <div className="mb-8">
          <h4 className="flex items-center gap-2 text-xl font-semibold text-red-500 mb-1">
            <FaExclamationCircle /> Boycott Reason
          </h4>
          <p className="font-medium text-lg text-red-400">{boycottReason}</p>
        </div>

        {/* HR Info */}
        <div
          className={`mb-8 p-6 rounded-2xl border ${
            isDark
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <FaUserTie /> HR Contact
          </h4>
          <p className="flex items-center gap-2 mb-1">
            <FaUserTie /> {hr_name}
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> {hr_email}
          </p>
        </div>

        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mt-6">
          <img
            src={profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full border border-gray-300 shadow"
          />
          <div className="text-center sm:text-left">
            <p className="flex items-center gap-2 text-green-500 font-semibold text-lg">
              <FaCheckCircle /> Recommended by others: {recommendationCount}
            </p>
            <p className="flex items-center gap-2 mt-1 text-sm sm:text-base text-gray-400">
              <FaCalendarAlt /> Posted on:{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyQueryDetails;
