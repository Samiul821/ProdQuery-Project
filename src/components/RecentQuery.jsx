import React, { use } from "react";
import RecentQueryCard from "./RecentQueryCard";

const RecentQuery = ({ recentQueryPromise }) => {
  const recentQuerys = use(recentQueryPromise);

  return (
    <section className="px-[4%] lg:px-[10%] py-8 bg-gradient-to-br from-[#f0fdf4] to-white">
      <div className="text-center mb-14 px-2">
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
          Recent Queries ({recentQuerys.length})
        </h1>
        <p className="text-gray-500 text-base md:text-lg mt-3 max-w-3xl mx-auto">
          Discover alternative products shared by our conscious community
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {recentQuerys.map((recentQuery) => (
          <RecentQueryCard key={recentQuery._id} query={recentQuery} />
        ))}
      </div>
    </section>
  );
};

export default RecentQuery;
