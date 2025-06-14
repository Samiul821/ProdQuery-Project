import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useRecommendationsForMeApi from "../Api/useRecommendationsForMeApi";
import Loading from "../components/Loading";
import { motion } from "framer-motion";

const RecommendatForMe = () => {
  const { user } = useAuth();
  const recommendationsForMePromise = useRecommendationsForMeApi();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email && user.accessToken) {
      recommendationsForMePromise(user.email, user.accessToken)
        .then((data) => {
          setRecommendations(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to load recommendations:", error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      className="min-h-screen px-[4%] lg:px-[10%] py-8 bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 font-poppins">
        Recommendations For Your Queries
      </h2>
      {recommendations.length === 0 ? (
        <p className="text-center text-gray-500">No recommendations found.</p>
      ) : (
        <div className="overflow-x-auto w-full shadow-md rounded-lg">
          <table className="w-full min-w-[600px] border-collapse rounded-lg overflow-hidden">
            <thead className="bg-purple-200 text-gray-800">
              <tr>
                {[
                  "#",
                  "Recommendation Title",
                  "Query Title",
                  "Recommended Product",
                  "Recommended By",
                  "Date",
                ].map((title) => (
                  <th
                    key={title}
                    className="px-4 py-3 text-left font-semibold select-none"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.07 },
                },
              }}
            >
              {recommendations.map((item, index) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className={`border-b border-gray-300 cursor-pointer transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-purple-50"
                  } hover:bg-purple-100`}
                >
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 max-w-xs break-words text-gray-700 font-semibold">
                    {item.queryTitle}
                  </td>
                  <td className="px-4 py-3 max-w-xs break-words text-gray-700 font-semibold">
                    {item.recommendationTitle}
                  </td>
                  <td className="px-4 py-3 max-w-xs break-words text-gray-700 font-semibold">
                    {item.recommendedProductName}
                  </td>
                  <td className="px-4 py-3 max-w-xs break-words text-gray-700 font-semibold">
                    {item.recommenderName}
                  </td>
                  <td className="px-4 py-3 max-w-xs break-words text-gray-700 font-semibold">
                    {new Date(item.timestamp).toLocaleDateString("en-GB")}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default RecommendatForMe;
