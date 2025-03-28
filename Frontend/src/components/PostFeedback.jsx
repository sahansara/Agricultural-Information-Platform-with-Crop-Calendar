import React, { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Home,
  User,
  Mail,
  Phone,
  MessageSquare,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import OldUserFeedBacks from "./OldUserFeedBacks";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.feedback.trim()) newErrors.feedback = "Feedback is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit feedback");

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", feedback: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "name",
      icon: User,
      type: "text",
    },
    {
      name: "email",
      icon: Mail,
      type: "email",
    },
    {
      name: "phone",
      icon: Phone,
      type: "tel",
    },
    {
      name: "feedback",
      icon: MessageSquare,
      type: "textarea",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="absolute top-4 left-4 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          title="Go back"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          title="Go to home"
        >
          <Home className="h-6 w-6" />
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-6 relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Your Voice Matters!{" "}
            <span className="text-green-600">Share Your Feedback</span>
          </h2>
          <p className="text-gray-600">
            We value your input and are committed to improving based on your
            feedback
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-8 border border-gray-200">
          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              <span>
                Thank you for your valuable feedback! We'll review it carefully
                and get back to you if needed.
              </span>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 animate-fade-in">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>
                We couldn't submit your feedback. Please try again or contact
                support if the issue persists.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map(({ name, icon: Icon, type }) => (
              <div key={name} className="space-y-2">
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Icon className="h-4 w-4 text-green-600" />
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </label>
                <div className="relative">
                  {type === "textarea" ? (
                    <textarea
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors[name] ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500 transition-colors`}
                      placeholder={`Enter your ${name}`}
                    />
                  ) : (
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors[name] ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500 transition-colors`}
                      placeholder={`Enter your ${name}`}
                    />
                  )}
                  {errors[name] && (
                    <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>

                {errors[name] && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>
      <OldUserFeedBacks />
    </section>
  );
};

export default FeedbackForm;
