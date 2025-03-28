import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminFeedBack() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/feedbacks")
      .then((response) => {
        setFeedbacks(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching feedbacks");
        setLoading(false);
      });
  }, []);

  const deleteFeedback = (id) => {
    axios
      .delete(`http://localhost:8000/api/feedback/${id}`)
      .then((response) => {
        setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
        setSuccessMessage(response.data.message);
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch((error) => {
        console.error("Error deleting feedback!", error);
      });
  };

  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return <div className="text-center text-lg">Loading feedbacks...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">User Feedbacks</h2>

      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search feedback..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="text-green-600 text-center mb-4">{successMessage}</div>
      )}

      {/* Feedback List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col"
            >
              <h3 className="text-lg font-semibold">{feedback.name}</h3>
              <p className="text-gray-700 mt-2">{feedback.feedback}</p>
              <p className="text-gray-500 text-sm mt-1">
                {new Date(feedback.created_at).toLocaleDateString()}
              </p>
              <button
                onClick={() => deleteFeedback(feedback.id)}
                className="mt-auto w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No feedbacks found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminFeedBack;
