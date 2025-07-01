import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useMyRecommendationApi from "../Api/useMyRecommendationApi";
import Loading from "../components/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext";
import RecommendationItem from "../components/RecommendationItem ";

const MyRecommendations = () => {
  const { user } = useAuth();
  const myRecommendationsPromise = useMyRecommendationApi();
  const { isDark } = useContext(ThemeContext);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email && user.accessToken) {
      myRecommendationsPromise(user.email, user.accessToken)
        .then((data) => {
          setRecommendations(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id, queryId) => {
    Swal.fire({
      title: "Are you sure you want to delete this recommendation?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://prod-query-backend.vercel.app/my-recommendations/${id}`)
          .then((res) => {
            if (res.data.deletedCount === 1) {
              setRecommendations((prev) =>
                prev.filter((rec) => rec._id !== id)
              );

              axios.patch(`https://prod-query-backend.vercel.app/query/${queryId}`).then(() => {
                console.log("Recommendation count updated!");
              });

              Swal.fire(
                "Deleted!",
                "The recommendation has been successfully deleted.",
                "success"
              );
            }
          });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      className={`min-h-screen px-[4%] lg:px-[10%] py-8 flex flex-col items-center transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 text-gray-900"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Helmet>
        <title>My Recommendations | ProdQuery</title>
      </Helmet>

      <h2
        className={`text-[22px] md:text-3xl font-semibold mb-6 font-poppins ${
          isDark ? "text-gray-200" : "text-gray-800"
        }`}
      >
        My Recommendations
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-center text-gray-500">No recommendations found.</p>
      ) : (
        <div className="overflow-x-auto w-full">
          <table
            className={`table-auto w-full min-w-[600px] border-collapse border ${
              isDark ? "border-gray-700" : "border-gray-200"
            } text-sm md:text-base`}
          >
            <thead
              className={`${
                isDark
                  ? "bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-200"
                  : "bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 text-gray-700"
              }`}
            >
              <tr>
                {[
                  "#",
                  "Query Title",
                  "Recommended Product",
                  "Reason",
                  "Action",
                ].map((title) => (
                  <th
                    key={title}
                    className="border border-gray-300 text-left px-3 py-2 md:px-4 md:py-3 font-medium whitespace-nowrap"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody
              as={motion.tbody}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {recommendations.map((rec, index) => (
                <RecommendationItem
                  key={rec._id}
                  rec={rec}
                  index={index}
                  onDelete={handleDelete}
                  isDark={isDark}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default MyRecommendations;
