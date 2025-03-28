
// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, userRole, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (userRole !== 'admin') {
        return <Navigate to="/unauthorized" replace />; // Redirect to an unauthorized page if the role is not admin
    }

    return children;
};

export default ProtectedRoute