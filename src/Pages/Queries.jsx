import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import AllQueryCard from "../components/AllQueryCard";

const Queries = () => {
  const allQuerys = useLoaderData();
  const [searchText, setSearchText] = useState("");
  const [columns, setColumns] = useState(3); // ডিফল্ট ৩ কলাম

  // ফিল্টার করা কোয়েরি লিস্ট
  const filteredQuerys = allQuerys.filter((query) =>
    query.productName?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Tailwind grid-cols ক্লাস ডাইনামিক সেটিং
  // ৪ পর্যন্ত অপশন রাখা হয়েছে
  const gridColsClass = {
    1: "grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <div className="min-h-screen px-[4%] lg:px-[10%] py-8 bg-gradient-to-br from-slate-100 to-sky-100 font-sans text-slate-900 flex flex-col items-center">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-4 text-center bg-gradient-to-r from-indigo-600 to-blue-400 bg-clip-text text-transparent"
      >
        All The Queries ({filteredQuerys.length})
      </motion.h1>

      {/* Search Box */}
      <div className="mb-6 w-full max-w-md">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
        />
      </div>

      {/* Dropdown for layout selection */}
      <div className="mb-8 w-full max-w-xs">
        <label
          htmlFor="columns-select"
          className="block mb-2 text-indigo-700 font-semibold"
        >
          Select Layout Columns:
        </label>
        <select
          id="columns-select"
          value={columns}
          onChange={(e) => setColumns(Number(e.target.value))}
          className="w-full px-4 py-2 rounded-md border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md"
        >
          <option value={1}>1 Column</option>
          <option value={2}>2 Columns</option>
          <option value={3}>3 Columns</option>
          <option value={4}>4 Columns</option>
        </select>
      </div>

      {/* Grid of Cards */}
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
        {filteredQuerys.length > 0 ? (
          filteredQuerys.map((allQuery) => (
            <motion.div
              key={allQuery._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(99, 102, 241, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="rounded-xl bg-white p-6 shadow-lg cursor-pointer flex flex-col"
            >
              <AllQueryCard allQuery={allQuery} />
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg mt-10">
            No queries found for "{searchText}"
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Queries;
