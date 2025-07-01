import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const QueryDetails = () => {
  const query = useLoaderData();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

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
      .post(
        "http://localhost:5000/recommendations",
        newRecommendation
      )
      .then((res) => {
        if (res.data.insertedId) {
          const addedRecommendation = {
            ...newRecommendation,
            _id: res.data.insertedId,
          };

          setRecommendations((prev) => [addedRecommendation, ...prev]);

          Swal.fire({
            icon: "success",
            title: "Recommendation Submitted!",
            text: "Thanks for your recommendation.",
            showConfirmButton: false,
            timer: 1500,
          });

          setShowForm(false);

          e.target.reset();
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Please try again later.",
          confirmButtonColor: "#d33",
        });
      });
  };

  useEffect(() => {
    if (_id) {
      axios
        .get(
          `http://localhost:5000/recommendations?queryId=${_id}`
        )
        .then((res) => {
          setRecommendations(res.data);
        })
        .catch((error) => {
          console.log("Failed to load recommendations:", error);
        });
    }
  }, [_id]);

  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 px-4 sm:px-6 md:px-10 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>Queries Details | ProdQuery</title>
      </Helmet>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white font-semibold shadow-md hover:brightness-110 transition"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="max-w-6xl mx-auto rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl bg-white/80 backdrop-blur-md border border-purple-200 space-y-10">
        {/* Query Title */}
        <motion.h1
          className="text-xl sm:text-2xl md:text-4xl font-bold font-poppins text-purple-800 text-center leading-snug"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {queryTitle}
        </motion.h1>

        {/* User & Product Info */}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
          {/* User Info */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl shadow">
  <img
    src={profileImage}
    alt="User"
    className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-lg object-cover"
  />
  <div>
    <h3 className="text-sm sm:text-lg font-medium text-gray-800 font-poppins">
      {hr_name}
    </h3>
    <p className="text-xs sm:text-sm text-gray-600 break-words break-all max-w-[200px]">
      {hr_email}
    </p>
    <p className="text-xs text-gray-400">
      Posted: {new Date(createdAt).toLocaleDateString()}
    </p>
  </div>
</div>


          {/* Product Info */}
          <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl shadow items-start">
            <img
              src={
                productImageUrl?.startsWith("http")
                  ? productImageUrl
                  : "https://via.placeholder.com/100x100.png?text=No+Image"
              }
              alt={productName}
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg border"
            />
            <div className="space-y-1 text-sm sm:text-base">
              <p className="font-medium text-gray-800">
                Product: <span className="text-purple-700">{productName}</span>
              </p>
              <p className="text-gray-700">Brand: {productBrand}</p>
            </div>
          </div>
        </div>

        {/* Boycott Reason */}
        <div className="bg-white/90 border-l-4 border-red-500 p-4 sm:p-6 rounded-xl shadow-md">
          <h2 className="text-lg sm:text-xl font-semibold text-red-600 mb-2">
            Why Boycott?
          </h2>
          <p className="text-gray-800 text-justify leading-relaxed text-sm sm:text-base">
            {boycottReason}
          </p>
        </div>

        {/* Show/Hide Recommendation Form Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 sm:px-5 py-2 rounded-full transition-all duration-300 shadow-md w-full sm:w-auto max-w-xs mx-auto"
        >
          {showForm
            ? "❌ Cancel Recommendation"
            : "📢 Recommend an Alternative"}
        </button>

        {/* Add Recommendation Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="bg-gradient-to-bl from-purple-50 via-white to-yellow-100 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-purple-800 mb-6 text-center font-poppins">
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

        {/* Recommendations List */}
        {recommendations.length > 0 ? (
          <div className="mt-10 space-y-4 px-4 md:px-6 lg:px-8">
            <h2 className="text-xl md:text-2xl font-semibold text-purple-700 font-poppins">
              💬 All Recommendations
            </h2>
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="bg-white border-l-4 border-purple-500 shadow-md p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <img
                  src={
                    rec.recommendedProductImage?.startsWith("http")
                      ? rec.recommendedProductImage
                      : "https://via.placeholder.com/60"
                  }
                  alt="recommended"
                  className="w-14 h-14 object-cover rounded-lg border"
                />
                <div className="flex-1 space-y-1 text-sm sm:text-base">
                  <h3 className="font-semibold text-gray-800">
                    {rec.recommendationTitle}
                  </h3>
                  <p className="text-gray-700">
                    <strong>Product:</strong> {rec.recommendedProductName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Why:</strong> {rec.reason}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    By {rec.recommenderName} on{" "}
                    {new Date(rec.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center text-gray-500 px-4">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-5335924-4452134.png"
              alt="No recommendations"
              className="w-40 sm:w-52 mx-auto mb-4"
            />
            <p className="text-lg sm:text-xl font-medium">
              No recommendations yet.
            </p>
            <p className="text-sm text-gray-400">
              Be the first to suggest a better alternative!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default QueryDetails;
