import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import MyQueryCard from "../../components/MyQueryCard";
import useMyQueryApi from "../../Api/useMyQueryApi";

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

  return (
    <div className="px-[4%] lg:px-[10%] py-8 min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white rounded-xl p-8 mb-10 shadow-lg gap-6">
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          My Queries
        </h1>
        <Link
          to="/addQuerie"
          className="btn btn-primary btn-wide sm:btn-md shadow-lg hover:scale-105 transform transition"
        >
          Add Queries
        </Link>
      </div>

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
              <MyQueryCard key={query._id} query={query} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQueries;
