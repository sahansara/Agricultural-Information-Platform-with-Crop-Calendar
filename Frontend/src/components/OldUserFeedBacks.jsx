import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  User,
  Calendar,
  Loader2,
  AlertCircle,
  Share2,
} from "lucide-react";

function UserFeedBacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/feedback")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFeedbacks(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching feedbacks");
        setLoading(false);
      });
  }, []);

  const handleShare = (feedback) => {
    if (navigator.share) {
      navigator
        .share({
          title: `Feedback from ${feedback.name}`,
          text: feedback.feedback,
          url: window.location.href,
        })
        .catch(console.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-600">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span className="text-lg">Loading feedbacks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center flex items-center justify-center space-x-2">
        <AlertCircle className="h-6 w-6" />
        <span>{error}</span>
      </div>
    );
  }

  const limitedFeedbacks = feedbacks.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Recent Community Feedback
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See what others are saying about their experience. Your feedback could
          be featured here too!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
        {limitedFeedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
              expandedId === feedback.id ? "row-span-2 md:col-span-2" : ""
            }`}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feedback.name}
                </h3>
              </div>

              <div className="flex-grow">
                <p className="text-gray-600">
                  {expandedId === feedback.id
                    ? feedback.feedback
                    : feedback.feedback.length > 150
                    ? `${feedback.feedback.slice(0, 150)}...`
                    : feedback.feedback}
                </p>
                {feedback.feedback.length > 150 && (
                  <button
                    onClick={() =>
                      setExpandedId(
                        expandedId === feedback.id ? null : feedback.id
                      )
                    }
                    className="text-green-600 hover:text-green-700 text-sm font-medium mt-2 block"
                  >
                    {expandedId === feedback.id ? "Show less" : "Read more"}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(feedback.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <button
                  onClick={() => handleShare(feedback)}
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {feedbacks.length > 4 && (
        <div className="text-center mt-8">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center mx-auto">
            <MessageSquare className="h-4 w-4 mr-2" />
            View All Feedbacks
          </button>
        </div>
      )}
    </div>
  );
}

export default UserFeedBacks;
