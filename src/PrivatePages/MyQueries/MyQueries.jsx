import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import MyQueryCard from "../../components/MyQueryCard";
import useMyQueryApi from "../../Api/useMyQueryApi";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const MyQueries = () => {
  const { user } = useAuth();
  const myQueryPromise = useMyQueryApi();

  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

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
    }).then((reslut) => {
      if (reslut.isConfirmed) {
        axios.delete(`https://prod-query-backend.vercel.app/query/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            const remaining = queries.filter((query) => query._id !== _id);
            setQueries(remaining);
            Swal.fire("Deleted!", "Your query has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="px-[4%] lg:px-[10%] py-8 min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50">
      
      <Helmet>
        <title>My Query | ProdQuery</title>
      </Helmet>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full rounded-3xl overflow-hidden mb-10 shadow-2xl"
      >
        {/* ✅ Nature-Themed Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Nature Banner"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>

        {/* ✅ Content Overlay */}
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
            <p className="text-gray-600 text-xl font-semibold">
              No queries found.
            </p>
            <Link
              to="/addQuerie"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition"
            >
              Add Your First Query
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {queries.map((query) => (
              <MyQueryCard
                key={query._id}
                query={query}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQueries;
