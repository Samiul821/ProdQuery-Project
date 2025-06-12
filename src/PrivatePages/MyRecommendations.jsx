import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import useMyRecommendationApi from "../Api/useMyRecommendationApi";
import RecommendationItem from "../components/RecommendationItem ";
import Loading from "../components/Loading";

const MyRecommendations = () => {
  const { user } = useAuth();
  const myRecommendationsPromise = useMyRecommendationApi();

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
          console.error("Error fetching recommendations:", err);
          setLoading(false);
        });
    }
  }, [user, myRecommendationsPromise]);

  const handleDelete = (id) => {
    // You can add actual delete API call here later
    setRecommendations((prev) => prev.filter((rec) => rec._id !== id));
  };

  if (loading) {
    return < Loading />;
  }

  return (
    <motion.div
      className="px-[4%] lg:px-[10%] py-8 bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        My Recommendations
      </h2>

      {recommendations.length === 0 ? (
        <p className="text-center text-gray-500">No recommendations found.</p>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full min-w-[600px] border-collapse border border-gray-200 text-sm md:text-base">
            <thead className="bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100">
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
                    className="border border-gray-300 text-left px-3 py-2 md:px-4 md:py-3 text-gray-700 font-medium whitespace-nowrap"
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
                    staggerChildren: 0.1, // প্রতিটি child কে একটু একটু সময় দিয়ে animate করবে
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
