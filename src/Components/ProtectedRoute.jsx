import { Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";

function ProtectedRoute() {
  const token = window.localStorage.getItem("token"); // make sure the key matches what you stored

  useEffect(() => {}, [token]);

  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
