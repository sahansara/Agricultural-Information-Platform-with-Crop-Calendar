import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Key,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Logo import (adjust path as needed)
import logo from "../../logo.png";

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    adminCode: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const navigate = useNavigate();

  // Validation functions
  const validateForm = () => {
    const newErrors = {};

    // Full Name Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full Name must be at least 3 characters";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone Number Validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number (10 digits)";
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else {
      // Additional password strength checks
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasNumbers = /[0-9]/.test(formData.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

      if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
        newErrors.password =
          "Password must include uppercase, lowercase, number, and special character";
      }
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Admin Code Validation
    if (!formData.adminCode) {
      newErrors.adminCode = "Admin Code is required";
    } else if (formData.adminCode !== "ASWANNA2024") {
      // Replace with your secure admin registration code
      newErrors.adminCode = "Invalid Admin Code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (validateForm()) {
      setLoading(true);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/admin/register",
          {
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            adminCode: formData.adminCode,
          }
        );

        // Handle successful registration
        if (response.data.token) {
          localStorage.setItem("adminToken", response.data.token);
          localStorage.setItem("adminUser", JSON.stringify(response.data.user));

          // Optional: Show success toast/notification
          navigate("/admin-login");
        }
      } catch (error) {
        // Handle registration errors
        setServerError(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-green-100">
        {/* Header Section */}
        <div className="bg-green-600 py-6 flex flex-col items-center justify-center text-white">
          <img
            src={logo}
            alt="Aswanna Logo"
            className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-4 border-white"
          />
          <h1 className="text-2xl font-bold">Admin Registration</h1>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {/* Full Name Input */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border 
                ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-green-300 focus:ring-green-500"
                } 
                focus:outline-none focus:ring-2`}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Rest of the form remains the same as in the previous TypeScript version */}
          {/* ... (keep the rest of the JSX as it was) */}
        </form>
      </div>
    </div>
  );
};

export default AdminRegistration;
