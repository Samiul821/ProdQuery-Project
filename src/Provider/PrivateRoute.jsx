import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();

  if (loading) {
    return null;
  }
  if (user && user.email) {
    return children;
  }

  return <Navigate to="/auth/signIn" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
