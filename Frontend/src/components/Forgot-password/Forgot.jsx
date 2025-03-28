import React, { useState, useRef } from 'react';
import { FaUserAlt } from "react-icons/fa";
import logo from '../loginComponent/logo.png';

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const emailRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!email) {
            setMessage("Please enter your email.");
            emailRef.current.focus();
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                setMessage("Password reset link sent to your email and check it!");
            } else {
                setMessage(data.message || "Failed to send reset link.");
                emailRef.current.focus();
            }
        } catch (error) {
            setLoading(false);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="text-center mb-6">
                     <img src={logo} alt="Logo" className="w-40 mx-auto" />
                    <h1 className="text-2xl font-bold text-green-700">Forgot Password</h1>
                    <p className="text-sm text-gray-600">Enter your email to reset your password.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && <p className="text-red-500 text-center">{message}</p>}

                    <div className="flex items-center border-b-2 border-gray-300 p-2 rounded-lg">
                        <FaUserAlt className="text-gray-500" />
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            ref={emailRef}
                            className="w-full pl-2 text-gray-700 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Forgot;
