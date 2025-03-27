import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../../Utils/auth";


const PrivateRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/student/login" replace />;
    }

    const userRole = getUserRole();

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default PrivateRoute;
