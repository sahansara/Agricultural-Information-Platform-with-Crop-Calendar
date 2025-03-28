import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock, FaLockOpen } from "react-icons/fa";
import logo from '../loginComponent/logo.png';

function PassReset() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const email = queryParams.get("email");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            confirmPasswordRef.current.focus();
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:8000/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"  // Add this to ensure JSON response
                },
                credentials: 'include',
                body: JSON.stringify({
                    token,
                    email,
                    password,
                    password_confirmation: confirmPassword,
                }),
                
            });

            // Check if response status is in the success range (200-299) or a redirect (3xx)
            if (response.ok || (response.status >= 300 && response.status < 400)) {
                setIsSuccess(true);
                setMessage("Password reset successful! Redirecting to login page...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                try {
                    const data = await response.json();
                    setMessage(data.message || "Failed to reset password.");
                } catch (jsonError) {
                    setMessage("Failed to reset password. Please try again.");
                }
            }
        } catch (error) {
            console.error("Reset password error:", error);
            // If we get here, the password might have changed but there was a CORS error with the redirect
            // We can assume success if it's a CORS error after submission
            if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
                setIsSuccess(true);
                setMessage("Password may have been reset successfully, but there was a communication error. Redirecting to login page...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setMessage("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-100 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md">
                <div className="flex justify-center mb-4">
                    <img src={logo} alt="Logo" className="w-40 mx-auto" />
                </div>
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-green-700">Reset Password</h1>
                    <p className="text-sm text-gray-600">Please enter your new password.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-3">
                    {message && <p className={`text-center text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

                    <div className="flex items-center border-b-2 border-gray-300 p-2 rounded-lg">
                        <div className="cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                            {passwordVisible ? <FaLockOpen className="text-gray-500" /> : <FaLock className="text-gray-500" />}
                        </div>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            ref={passwordRef}
                            className="w-full pl-2 text-gray-700 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex items-center border-b-2 border-gray-300 p-2 rounded-lg">
                        <div className="cursor-pointer" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            {confirmPasswordVisible ? <FaLockOpen className="text-gray-500" /> : <FaLock className="text-gray-500" />}
                        </div>
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            ref={confirmPasswordRef}
                            className="w-full pl-2 text-gray-700 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                        disabled={loading || isSuccess}
                    >
                        {loading ? "Processing..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PassReset;