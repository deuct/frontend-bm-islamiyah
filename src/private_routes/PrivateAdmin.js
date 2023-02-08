import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../helper/context/Context";

function PrivateAdmin() {
  const { userRole } = useContext(AuthContext);

  if (userRole.length > 0) {
    return userRole === "admin" ? <Outlet /> : <Navigate to="/404" />;
  }
}

export default PrivateAdmin;
