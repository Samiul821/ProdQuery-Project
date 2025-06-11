import React from "react";
import { useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import AllQueryCard from "../components/AllQueryCard";

const Queries = () => {
  const allQuerys = useLoaderData();

  return (
    <div className="min-h-screen px-[4%] lg:px-[10%] py-8 bg-gradient-to-br from-slate-100 to-sky-100 font-sans text-slate-900 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-600 to-blue-400 bg-clip-text text-transparent"
      >
        All The Querys ({allQuerys.length})
      </motion.h1>

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
        className="grid gap-8 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {allQuerys.map((allQuery) => (
          <motion.div
            key={allQuery._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(99, 102, 241, 0.3)", // Indigo glow shadow
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="rounded-xl bg-white p-6 shadow-lg cursor-pointer flex flex-col"
          >
            <AllQueryCard allQuery={allQuery} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Queries;
