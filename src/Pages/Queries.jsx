import React, { useState, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import AllQueryCard from "../components/AllQueryCard";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext";

const Queries = () => {
  const allQuerys = useLoaderData();
  const { isDark } = useContext(ThemeContext);

  const [searchText, setSearchText] = useState("");
  const [columns, setColumns] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredQuerys = allQuerys.filter((query) =>
    query.productName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuerys.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQueries = filteredQuerys.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const gridColsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <div
      className={`min-h-screen px-[4%] lg:px-[10%] py-8 font-sans flex flex-col items-center transition duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-slate-100 to-sky-100 text-slate-900"
      }`}
    >
      <Helmet>
        <title>All Queries | ProdQuery</title>
      </Helmet>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-4xl font-extrabold mb-6 text-center font-poppins bg-clip-text ${
          isDark
            ? "text-transparent bg-gradient-to-r from-indigo-400 to-blue-300"
            : "text-transparent bg-gradient-to-r from-indigo-600 to-blue-400"
        }`}
      >
        All The Queries ({filteredQuerys.length})
      </motion.h1>

      {/* Search Box */}
      <div className="mb-6 w-full max-w-md px-2">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          className={`w-full px-4 py-2 rounded-full border shadow-md focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-gray-800 text-gray-200 border-gray-600 focus:ring-indigo-400 placeholder-gray-400"
              : "bg-white text-gray-800 border-indigo-300 focus:ring-indigo-400"
          }`}
        />
      </div>

      {/* Column Selector */}
      <div className="mb-8 w-full max-w-xs px-2 hidden md:block">
        <label
          htmlFor="columns-select"
          className={`block mb-2 font-semibold ${
            isDark ? "text-gray-300" : "text-indigo-700"
          }`}
        >
          Select Layout Columns:
        </label>
        <select
          id="columns-select"
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          className={`w-full px-4 py-2 rounded-md border shadow-md focus:outline-none focus:ring-2 ${
            isDark
              ? "bg-gray-800 text-gray-200 border-gray-600 focus:ring-indigo-400"
              : "bg-white text-gray-800 border-indigo-300 focus:ring-indigo-400"
          }`}
        >
          <option value={1}>1 Column</option>
          <option value={2}>2 Columns</option>
          <option value={3}>3 Columns</option>
          <option value={4}>4 Columns</option>
        </select>
      </div>

      {/* Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
          hidden: { opacity: 0 },
        }}
        className={`grid gap-8 w-full ${gridColsClass}`}
      >
        {paginatedQueries.length > 0 ? (
          paginatedQueries.map((allQuery) => (
            <motion.div
              key={allQuery._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: isDark
                  ? "0 15px 30px rgba(99, 102, 241, 0.4)"
                  : "0 15px 30px rgba(99, 102, 241, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`rounded-xl p-6 shadow-lg cursor-pointer flex flex-col transition h-full ${
                isDark
                  ? "bg-gray-800 border border-gray-700 text-gray-100"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              <AllQueryCard allQuery={allQuery} />
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400 text-lg mt-10">
            No queries found for "{searchText}"
          </p>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-full font-medium transition ${
              isDark
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            } disabled:opacity-50`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-full font-semibold transition border ${
                currentPage === index + 1
                  ? "bg-indigo-600 text-white"
                  : isDark
                  ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-indigo-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-full font-medium transition ${
              isDark
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            } disabled:opacity-50`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Queries;
