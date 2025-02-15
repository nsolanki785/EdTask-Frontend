import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = localStorage.getItem("token"); // Assume auth is stored in local storage. Replace with actual logic.
  return !auth ? <Navigate to="/login" replace /> : children;
};
export default ProtectedRoute;
