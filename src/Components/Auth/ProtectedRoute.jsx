/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoader) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
