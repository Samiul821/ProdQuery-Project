import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import MyQueryCard from "../../components/MyQueryCard";
import useMyQueryApi from "../../Api/useMyQueryApi";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../../Provider/ThemeContext";

const MyQueries = () => {
  const { user } = useAuth();
  const myQueryPromise = useMyQueryApi();
  const { isDark } = useContext(ThemeContext);

  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(queries.length / itemsPerPage);

  const paginatedQueries = queries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (user?.email && user.accessToken) {
      myQueryPromise(user.email, user.accessToken)
        .then((data) => {
          setQueries(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching queries:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/query/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            const remaining = queries.filter((q) => q._id !== _id);
            setQueries(remaining);
            Swal.fire("Deleted!", "Your query has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div
      className={`px-[4%] lg:px-[10%] py-8 min-h-screen transition duration-300 ${
        isDark
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 text-gray-900"
      }`}
    >
      <Helmet>
        <title>My Query | ProdQuery</title>
      </Helmet>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full rounded-3xl overflow-hidden mb-10 shadow-2xl"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Nature Banner"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>

        <div className="relative z-10 px-6 py-20 sm:px-12 lg:px-24 flex flex-col sm:flex-row justify-between items-center text-white gap-6">
          <div className="text-center sm:text-left max-w-xl">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-xl font-poppins"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              My Queries
            </motion.h1>
            <motion.p
              className="text-base md:text-lg text-indigo-100 leading-relaxed"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Discover, ask, and share recommendations with the community.
              Powered by nature. Inspired by you.
            </motion.p>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/addQuerie"
              className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-indigo-100 hover:scale-105 transition-transform duration-300"
            >
              + Add Queries
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Query List */}
      <div>
        {loading ? (
          <Loading />
        ) : queries.length === 0 ? (
          <div className="text-center py-12 space-y-6">
            <p className="text-xl font-semibold">No queries found.</p>
            <Link
              to="/addQuerie"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
            >
              Add Your First Query
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedQueries.map((query) => (
                <MyQueryCard
                  key={query._id}
                  query={query}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    isDark
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
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
                        ? "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700"
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
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  } disabled:opacity-50`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyQueries;
