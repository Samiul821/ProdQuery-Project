import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";

const QueryDetails = () => {
  const query = useLoaderData();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const {
    _id,
    queryTitle,
    boycottReason,
    productName,
    productBrand,
    productImageUrl,
    profileImage,
    hr_name,
    hr_email,
    createdAt,
  } = query || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const recommendationTitle = form.title.value.trim();
    const recommendedProductName = form.productName.value.trim();
    const recommendedProductImage = form.productImage.value.trim();
    const reason = form.reason.value.trim();

    if (!recommendationTitle || !recommendedProductImage || !reason) {
      Swal.fire({
        icon: "warning",
        title: "Please fill in all required fields",
        confirmButtonColor: "#6b21a8",
      });
      return;
    }

    const newRecommendation = {
      queryId: _id,
      queryTitle,
      productName: productName,
      userEmail: hr_email,
      userName: hr_name,
      recommenderEmail: user?.email,
      recommenderName: user?.displayName,
      recommendationTitle,
      recommendedProductName,
      recommendedProductImage,
      reason,
      timestamp: new Date().toISOString(),
    };

    axios
      .post("http://localhost:5000/recommendations", newRecommendation)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Recommendation Submitted!",
            text: "Thanks for your recommendation.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Please try again later.",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 px-4 py-8 sm:px-6 md:px-10 lg:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl bg-white/80 backdrop-blur-md border border-purple-200 space-y-10">
        {/* 🔷 Query Title */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-800 text-center leading-snug"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {queryTitle}
        </motion.h1>

        {/*  User & Product Info */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* User */}
          <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl shadow">
            <img
              src={profileImage}
              alt="User"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {hr_name}
              </h3>
              <p className="text-sm text-gray-600">{hr_email}</p>
              <p className="text-xs text-gray-400">
                Posted: {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl shadow items-start">
            <img
              src={
                productImageUrl?.startsWith("http")
                  ? productImageUrl
                  : "https://via.placeholder.com/100x100.png?text=No+Image"
              }
              alt={productName}
              className="w-24 h-24 object-contain rounded-lg border"
            />
            <div className="space-y-1">
              <p className="font-medium text-gray-800">
                Product: <span className="text-purple-700">{productName}</span>
              </p>
              <p className="text-sm text-gray-700">Brand: {productBrand}</p>
            </div>
          </div>
        </div>

        {/*  Boycott Reason */}
        <div className="bg-white/90 border-l-4 border-red-500 p-4 sm:p-6 rounded-xl shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold text-red-600 mb-2">
            Why Boycott?
          </h2>
          <p className="text-gray-800 text-justify leading-relaxed text-sm sm:text-base">
            {boycottReason}
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-full transition-all duration-300 shadow-md"
          >
            {showForm
              ? "❌ Cancel Recommendation"
              : "📢 Recommend an Alternative"}
          </button>
        </div>

        {/* Add Recommendation Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="bg-gradient-to-bl from-purple-50 via-white to-yellow-100 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }} // ⬅️ Exit animation
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-purple-800 mb-6 text-center">
                📝 Add a Better Alternative
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recommendation Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="What's a better choice?"
                    className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recommended Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    placeholder="New product name"
                    className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recommended Product Image URL
                  </label>
                  <input
                    type="text"
                    name="productImage"
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-purple-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why this recommendation?
                  </label>
                  <textarea
                    rows={4}
                    name="reason"
                    placeholder="Write a short reason..."
                    className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-purple-300"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all w-full sm:w-auto"
                >
                  ✅ Submit Recommendation
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QueryDetails;
