import React, { useState } from 'react';
import logo from './logo.png';  // Replace with an agriculture-themed logo

import { FaUserAlt, FaLock, FaLockOpen } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ setIsAuthenticated, setUserRole }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                username: username,
                password: userPassword,
                remember: rememberMe  // Include remember field
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            setLoading(false);
            const userRole = response.data.user.role;
            const token = response.data.token;

            if (rememberMe) {
                localStorage.setItem('auth_token', token);
                localStorage.setItem('userRole', userRole);
                localStorage.setItem('rememberMe', 'true');
            } else {
                sessionStorage.setItem('auth_token', token);
                sessionStorage.setItem('userRole', userRole);
                localStorage.removeItem('rememberMe');
            }

            setIsAuthenticated(true);
            setUserRole(userRole);

            if (userRole === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Invalid username or password. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="text-center mb-6">
                    {/* <img src={logo} alt="Agriculture Logo" className="mx-auto mb-4" /> */}
                    <h1 className="text-2xl font-bold text-green-700">Welcome to AgriPortal</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

                    <div className="flex items-center border-b-2 border-gray-300 p-2 rounded-lg">
                        <FaUserAlt className="text-gray-500" />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Email or Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-2 text-gray-700 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center border-b-2 border-gray-300 p-2 rounded-lg">
                        <FaLock className="text-gray-500" />
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            className="w-full pl-2 text-gray-700 focus:outline-none"
                        />
                        {passwordVisible ? (
                            <FaLockOpen
                                onClick={togglePasswordVisibility}
                                className="text-gray-500 cursor-pointer"
                            />
                        ) : (
                            <FaLock
                                onClick={togglePasswordVisibility}
                                className="text-gray-500 cursor-pointer"
                            />
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4"
                        />
                        <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember Me</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm">
                            <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">Forgot Your Password?</Link>
                        </p>
                        <p className="text-sm mt-2">New user? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
