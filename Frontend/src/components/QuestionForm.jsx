import React, { useState, useEffect } from "react";
import {
  Sprout,
  MessageCircle,
  Send,
  PlusCircle,
  User,
  HelpCircle,
  Leaf,
  X,
  ChevronDown,
  ChevronUp,
  Loader,
} from "lucide-react";

const AgriQASystem = () => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    body: "",
  });
  const [replyData, setReplyData] = useState({
    username: "",
    body: "",
  });

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const fetchReplies = async (questionId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/questions/${questionId}`
      );
      const data = await response.json();
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId ? { ...q, replies: data.replies } : q
        )
      );
    } catch (error) {
      showAlert("Error fetching replies", "error");
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/questions");
      const data = await response.json();
      setQuestions(data);
      for (const question of data) {
        await fetchReplies(question.id);
      }
    } catch (error) {
      showAlert("Error fetching questions", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowModal(false);
        setFormData({ username: "", title: "", body: "" });
        showAlert("Question posted successfully!");
        fetchQuestions();
      }
    } catch (error) {
      showAlert("Error posting question", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!selectedQuestion) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/questions/${selectedQuestion}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: replyData.username,
            body: replyData.body,
          }),
        }
      );

      if (response.ok) {
        setShowReplyModal(false);
        setReplyData({ username: "", body: "" });
        showAlert("Reply posted successfully!");
        await fetchReplies(selectedQuestion);
      }
    } catch (error) {
      showAlert("Error posting reply", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-green-50 min-h-screen pt-24">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-green-200 shadow-sm z-50">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="text-green-600" size={32} />
            <h1 className="text-2xl font-bold text-green-80 mt-4">
              Agricultural Knowledge Forum
            </h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusCircle size={20} />
            Ask Question
          </button>
        </div>
      </div>

      {/* Alert */}
      {alert && (
        <div
          className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg transition-all transform duration-300 ${
            alert.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white z-50 flex items-center gap-2`}
        >
          {alert.type === "error" ? <X size={20} /> : <Sprout size={20} />}
          {alert.message}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-2">
            <Loader className="animate-spin text-green-600" size={40} />
            <p className="text-green-800">Loading questions...</p>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {!loading &&
          questions.map((question) => (
            <div
              key={question.id}
              className="bg-white border border-green-200 rounded-lg shadow-sm overflow-hidden"
            >
              {/* Question Header - Always Visible */}
              <button
                onClick={() => toggleQuestion(question.id)}
                className="w-full p-6 flex items-start gap-3 hover:bg-green-50 transition-colors"
              >
                <Leaf className="text-green-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-lg text-green-800">
                    {question.title}
                  </div>
                  <div className="text-gray-600 flex items-center gap-1">
                    <User size={14} />
                    <span>{question.username}</span>
                  </div>
                </div>
                {expandedQuestions[question.id] ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-green-600" />
                )}
              </button>

              {/* Question Content & Replies - Expandable */}
              {expandedQuestions[question.id] && (
                <div className="px-6 pb-6">
                  <div className="mb-4 text-gray-700 pl-9">{question.body}</div>

                  <div className="pl-9">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedQuestion(question.id);
                        setShowReplyModal(true);
                      }}
                      className="flex items-center gap-1 text-green-600 hover:text-green-700 mb-4"
                    >
                      <MessageCircle size={16} />
                      Reply
                    </button>

                    {/* Replies */}
                    {question.replies && question.replies.length > 0 && (
                      <div className="pl-4 border-l-2 border-green-200">
                        <h3 className="font-bold mb-2 text-green-800 flex items-center gap-2">
                          <MessageCircle size={16} className="text-green-600" />
                          Responses:
                        </h3>
                        {question.replies.map((reply, index) => (
                          <div
                            key={index}
                            className="mb-3 bg-green-50 p-3 rounded-lg"
                          >
                            <div className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                              <User size={14} />
                              <span>{reply.username} replied:</span>
                            </div>
                            <div className="text-gray-700">{reply.body}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Question Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-800 flex items-center gap-2">
                <HelpCircle className="text-green-600" />
                Ask Your Question
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitQuestion}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Question Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <textarea
                  placeholder="Describe your agricultural question in detail..."
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader className="animate-spin" size={16} />
                    ) : (
                      <Send size={16} />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-800 flex items-center gap-2">
                <MessageCircle className="text-green-600" />
                Share Your Knowledge
              </h2>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitReply}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={replyData.username}
                    onChange={(e) =>
                      setReplyData({ ...replyData, username: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <textarea
                  placeholder="Share your agricultural expertise..."
                  value={replyData.body}
                  onChange={(e) =>
                    setReplyData({ ...replyData, body: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader className="animate-spin" size={16} />
                    ) : (
                      <Send size={16} />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit Reply"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgriQASystem;
