import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("auth_token");
      const role = localStorage.getItem("userRole");

      if (token) {
        try {
          // Optional: Validate token with backend
          const response = await axios.get("http://127.0.0.1:8000/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            setIsAuthenticated(true);
            setUserRole(role || "");
          } else {
            logout(); // Logout if token is invalid
          }
        } catch (error) {
          logout(); // Logout on error
        }
      }
    };

    checkAuthStatus();
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("userRole");
    setIsAuthenticated(false);
    setUserRole("");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
