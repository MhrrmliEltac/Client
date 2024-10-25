import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const isLogged = JSON.parse(user);
  useEffect(() => {
    if (!isLogged.isLogged) {
      navigate("/signin");
    }
  }, [isLogged.isLogged, navigate]);

  return isLogged.isLogged ? children : navigate("/signin");
};

export default PrivateRoute;
