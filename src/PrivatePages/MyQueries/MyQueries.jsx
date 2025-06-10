import React from 'react';
import { Link } from 'react-router-dom';

const MyQueries = () => {
  return (
    <div className="px-[4%] lg:px-[10%] pt-8">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-purple-700 to-blue-600 text-white rounded-lg p-6 mb-8 gap-4">
        <h1 className="text-3xl font-bold">My Queries</h1>
        <Link
          to="/addQuerie"
          className="btn btn-primary btn-wide sm:btn-md"
        >
          Add Queries
        </Link>
      </div>

      {/* Placeholder for user queries */}
      <div>
        {/* User queries will be listed here */}
      </div>
    </div>
  );
};

export default MyQueries;
