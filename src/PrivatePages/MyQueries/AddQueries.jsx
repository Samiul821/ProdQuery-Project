import React from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const AddQueries = () => {
  const { user } = useAuth();

  const handleAddQuery = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // add extra data
    const newQuery = {
      ...data,
      email: user?.email || "anonymous",
      name: user?.displayName || "Unknown User",
      profileImage: user?.photoURL || "",
      createdAt: new Date().toISOString(),
      recommendationCount: 0,
    };

    // save to the database
    axios
      .post("http://localhost:5000/query", newQuery)
      .then((res) => {
        console.log("Query added successfully", res.data);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Query Added Successfully!",
            text: "This new Query has been saved and published.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        form.reset();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while saving the job!",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div className=" bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-[4%] lg:px-[10%] py-10">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-3xl p-6 sm:p-10 md:p-12 lg:p-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-wide">
          Submit Your Product Query
        </h2>

        <form onSubmit={handleAddQuery} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              placeholder="e.g. Nescafe Classic 200g"
              required
              className="w-full border border-gray-300 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-200 transition"
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
              placeholder="e.g. Nestlé"
              required
              className="w-full border border-gray-300 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-200 transition"
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
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-200 transition"
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
              placeholder="Is there any alternative with same quality?"
              required
              className="w-full border border-gray-300 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-200 transition"
            />
          </div>

          {/* Boycott Reason */}
          <div>
            <label className="block text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
              Boycotting Reason
            </label>
            <textarea
              name="boycottReason"
              rows="5"
              placeholder="Why you want to boycott this product..."
              required
              className="w-full border border-gray-300 rounded-xl px-4 sm:px-5 py-3 sm:py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-200 transition resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-base sm:text-lg py-3 sm:py-4 rounded-xl shadow-md transition transform hover:-translate-y-1 hover:shadow-lg"
          >
            Submit Query
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQueries;
