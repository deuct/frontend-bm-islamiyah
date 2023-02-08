import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  return isLoggedIn ? <Outlet /> : <Navigate to="/404" />;
}

export default PrivateRoutes;
