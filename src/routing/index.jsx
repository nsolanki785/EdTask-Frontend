import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../pages/login";
import DashBoard from "../pages/dashboard";
import ProtectedRoute from "./protectedRoute";
import AdminRegistration from "../pages/adminregistration";
import CustomerRegistration from "../pages/customerregistration";

const Routing = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/signup" element={<AdminRegistration />} />
          <Route path="/customer/signup" element={<CustomerRegistration />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default Routing;
