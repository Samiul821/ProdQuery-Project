import React, { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../Provider/ThemeContext";

const AddQueries = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const handleAddQuery = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newQuery = {
      ...data,
      hr_email: user?.email || "anonymous",
      hr_name: user?.displayName || "Unknown User",
      profileImage: user?.photoURL || "",
      createdAt: new Date().toISOString(),
      recommendationCount: 0,
    };

    axios
      .post("http://localhost:5000/query", newQuery)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Query Added Successfully!",
            text: "This new Query has been saved and published.",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while saving the query!",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div
      className={`flex items-center justify-center px-[4%] lg:px-[10%] py-10 min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-green-50 via-white to-blue-50 text-gray-900"
      }`}
    >
      <Helmet>
        <title>Add Query | ProdQuery</title>
      </Helmet>

      <div className="w-full max-w-3xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-md transition ${
            isDark
              ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:brightness-110"
              : "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white hover:brightness-110"
          }`}
        >
          <FaArrowLeft /> Back
        </button>

        {/* Form Box */}
        <div
          className={`w-full p-6 sm:p-10 md:p-12 lg:p-16 rounded-3xl shadow-2xl border transition-colors duration-300 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
          }`}
        >
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 tracking-wide font-poppins ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Submit Your Product Query
          </h2>

          <form onSubmit={handleAddQuery} className="space-y-6">
            {/* Product Name */}
            <div>
              <label
                className={`block mb-2 text-sm sm:text-base md:text-lg font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                placeholder="e.g. Nescafe Classic 200g"
                required
                className={`w-full rounded-xl px-4 sm:px-5 py-3 sm:py-4 border transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-400 focus:border-green-400"
                }`}
              />
            </div>

            {/* Brand */}
            <div>
              <label
                className={`block mb-2 text-sm sm:text-base md:text-lg font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Brand
              </label>
              <input
                type="text"
                name="productBrand"
                placeholder="e.g. Nestlé"
                required
                className={`w-full rounded-xl px-4 sm:px-5 py-3 sm:py-4 border transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-400 focus:border-green-400"
                }`}
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                className={`block mb-2 text-sm sm:text-base md:text-lg font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Product Image URL
              </label>
              <input
                type="url"
                name="productImageUrl"
                placeholder="https://example.com/image.jpg"
                className={`w-full rounded-xl px-4 sm:px-5 py-3 sm:py-4 border transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-400 focus:border-green-400"
                }`}
              />
            </div>

            {/* Query Title */}
            <div>
              <label
                className={`block mb-2 text-sm sm:text-base md:text-lg font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Query Title
              </label>
              <input
                type="text"
                name="queryTitle"
                placeholder="Is there any alternative with same quality?"
                required
                className={`w-full rounded-xl px-4 sm:px-5 py-3 sm:py-4 border transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-400 focus:border-green-400"
                }`}
              />
            </div>

            {/* Boycott Reason */}
            <div>
              <label
                className={`block mb-2 text-sm sm:text-base md:text-lg font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Boycotting Reason
              </label>
              <textarea
                name="boycottReason"
                rows="5"
                placeholder="Why you want to boycott this product..."
                required
                className={`w-full rounded-xl px-4 sm:px-5 py-3 sm:py-4 resize-none border transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-green-400 focus:border-green-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-400 focus:border-green-400"
                }`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`w-full font-semibold text-base sm:text-lg py-3 sm:py-4 rounded-xl shadow-md transition transform hover:-translate-y-1 hover:shadow-lg ${
                isDark
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              Submit Query
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQueries;
