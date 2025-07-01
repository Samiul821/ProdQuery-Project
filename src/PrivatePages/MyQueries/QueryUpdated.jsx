import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowLeft } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const QueryUpdated = () => {
  const {
    _id,
    productName,
    productBrand,
    productImageUrl,
    queryTitle,
    boycottReason,
  } = useLoaderData();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const updatedQuery = Object.fromEntries(formData.entries());
    console.log(updatedQuery);

    axios
      .put(`http://localhost:5000/query/${_id}`, updatedQuery)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Query Updated Successfully!",
            text: "This query has been updated and saved.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "info",
            title: "No Changes Made",
            text: "No fields were modified.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        form.reset();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while updating the query!",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-[4%] lg:px-[10%] py-10">
 
      <Helmet>
        <title>Qurey Update | ProdQurey</title>
      </Helmet>
      
      <div className="w-full max-w-5xl">
        {/* Back Button (Outside the Card) */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white font-semibold shadow-md hover:brightness-110 transition"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full p-6 sm:p-10 md:p-12 lg:p-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 tracking-wide font-poppins">
            Update Your Product Query
          </h2>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                defaultValue={productName}
                required
                placeholder="e.g. Nescafe Classic 200g"
                className="w-full border border-gray-300 rounded-xl px-4 sm:px-5 py-3 sm:py-4"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
                Brand
              </label>
              <input
                type="text"
                name="productBrand"
                defaultValue={productBrand}
                required
                placeholder="e.g. Nestlé"
                className="w-full border border-gray-300 rounded-xl px-4 sm:px-5 py-3 sm:py-4"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
                Product Image URL
              </label>
              <input
                type="url"
                name="productImageUrl"
                defaultValue={productImageUrl}
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-300 rounded-xl px-4 sm:px-5 py-3 sm:py-4"
              />
            </div>

            {/* Query Title */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
                Query Title
              </label>
              <input
                type="text"
                name="queryTitle"
                defaultValue={queryTitle}
                required
                placeholder="Is there any alternative with same quality?"
                className="w-full border border-gray-300 rounded-xl px-4 sm:px-5 py-3 sm:py-4"
              />
            </div>

            {/* Boycott Reason */}
            <div>
              <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
                Boycotting Reason
              </label>
              <textarea
                name="boycottReason"
                defaultValue={boycottReason}
                rows="5"
                required
                placeholder="Why you want to boycott this product..."
                className="w-full border border-gray-300 rounded-xl px-4 sm:px-5 py-3 sm:py-4 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-base sm:text-lg py-3 sm:py-4 rounded-xl shadow-md transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              Update Query
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QueryUpdated;
