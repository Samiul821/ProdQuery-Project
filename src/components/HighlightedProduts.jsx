import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../Provider/ThemeContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HighlightedProducts = () => {
  const [highlighted, setHighlighted] = useState([]);
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    fetch("https://prod-query-backend.vercel.app/highlighted-products")
      .then((res) => res.json())
      .then((data) => setHighlighted(data))
      .catch((err) => console.error("Error loading highlighted products", err));
  }, []);

  return (
    <section data-aos="fade-up" data-aos-duration="2000" className="space-y-12">
      <div className="text-center">
        <h2
          className={`text-3xl md:text-4xl font-bold ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Highlighted Products
        </h2>
        <p
          className={`text-base mt-2 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Top recommended alternatives from our conscious community
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {highlighted.map((item) => (
          <motion.div
            data-aos="fade-up"
            data-aos-duration="2000"
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.03,
              boxShadow: isDark
                ? "0 10px 25px rgba(99, 102, 241, 0.6)"
                : "0 10px 25px rgba(99, 102, 241, 0.3)",
              borderColor: "rgba(99, 102, 241, 0.5)",
            }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl overflow-hidden cursor-pointer shadow-sm border ${
              isDark
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            {/* Image */}
            <img
              src={
                item.productImageUrl || "https://via.placeholder.com/400x250"
              }
              alt={item.productName || "Product Image"}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5 space-y-3">
              {/* Title */}
              <h3 className="text-xl font-semibold">{item.productName}</h3>
              <p
                className={`mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                Brand: {item.productBrand}
              </p>

              {/* Short Description (queryTitle or boycottReason truncated) */}
              <p
                className={`mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {item.queryTitle ||
                  item.boycottReason ||
                  "No description available."}
              </p>

              {/* See More Button */}
              <Link
                to={`/query/${item._id}`}
                className="inline-block mt-3 px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                See More
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HighlightedProducts;
