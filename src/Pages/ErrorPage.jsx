import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-200 via-white to-indigo-100 flex items-center justify-center px-4 overflow-hidden">
      
      <Helmet>
        <title>Error | Prod Query</title>
      </Helmet>

      {/* Background Decoration Circles */}
      <motion.div
        className="absolute w-72 h-72 bg-indigo-300 rounded-full top-[-50px] left-[-50px] opacity-20 blur-2xl"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-purple-400 rounded-full bottom-[-50px] right-[-50px] opacity-20 blur-2xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-xl w-full text-center bg-white/30 backdrop-blur-2xl p-10 rounded-3xl shadow-[0_8px_30px_rgba(99,102,241,0.3)] border border-white/40"
      >
        <motion.img
          src="https://i.ibb.co/HLt3WhVW/Pngtree-error-404-page-not-found-6681621.png"
          alt="Lost in space"
          className="mx-auto mt-8 max-w-xs md:max-w-sm drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        />

        <motion.div
          className="mt-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition duration-300"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
