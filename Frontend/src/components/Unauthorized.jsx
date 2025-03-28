import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
      <h1 className="text-5xl font-bold text-red-600 mb-4">401</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Unauthorized Access
      </h2>
      <p className="text-gray-600 mb-4">
        You do not have permission to view this page.
      </p>
      <Link to="/" className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized; // ✅ Ensure this line exists
