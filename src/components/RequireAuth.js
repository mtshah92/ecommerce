import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

export const RequireAuth = ({ children }) => {
  const { userlogin } = useContext(AuthContext);
  const location = useLocation();
  const login = localStorage.getItem("token");
  console.log(login);

  return login !== "false" ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
